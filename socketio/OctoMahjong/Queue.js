const Room = require('./Room')

const MATCH_ACCEPTANCE_TIMEOUT = 10000

class Queue {

    constructor(mahjong, mode) {
        this.mahjong = mahjong
        this.mode = mode

        this.queue = new Array()
    }

    insert(player) {
        player.queueIn = this
        this.queue.push(player)
        console.log(`${player.nickname} inserted in queue. now in queue: ${this.queue.map(p => p.nickname)}`)

        if(this.queue.length >= this.mode.capacity) {
            const matchedPlayers = this.queue.splice(0, this.mode.capacity) // dequeue matched players
            this.onMatchFound(matchedPlayers)
        }
    }

    remove(player) {
        const idx = this.queue.findIndex(p => p == player)
        if(idx != -1) {
            this.queue.splice(idx, 1)
            console.log(`${player.nickname} removed from queue. now in queue: ${this.queue.map(p => p.nickname)}`)
        }
    }

    onMatchFound(matchedPlayers) {
        console.log("match found", matchedPlayers.map(p => p.nickname))
        const roomId = this.mahjong.roomIdCounter++ // generate room id
        const matchedRoom = new Room(this.mahjong, roomId, this.mode)

        matchedPlayers.forEach(player => {
            player.socket.join(roomId, err => {
                if(!err) {
                    player.socket.emit('match_found', matchedPlayers.map(player => player.nickname)) // notify to players
                    player.socket.on('accept_match', () => this.onPlayerAcceptMatch(player))
                    player.socket.on('decline_match', () => this.onPlayerDeclineMatch(player))
                    matchedRoom.insert(player)
                }
                else {
                    console.error(err)
                    player.socket.send(err)
                }
            })
        })

        matchedRoom.selfDestroyTimer = setTimeout(() => matchedRoom.selfDestroy(), MATCH_ACCEPTANCE_TIMEOUT)
        console.warn('Match will be declined unless all players accept this match in 10 SECONDS!')
    }

    onPlayerAcceptMatch(player) {
        console.log(`${player.nickname} accepted match! waiting for others...`)
        player.socket.removeAllListeners('accept_match')
        player.socket.removeAllListeners('decline_match')
        player.roomIn.onPlayerReady(player) // force player to be ready
    }

    onPlayerDeclineMatch(player) {
        console.log(`${player.nickname} declined match. waiting for room shut down...`)
        player.socket.removeAllListeners('accept_match')
        player.socket.removeAllListeners('decline_match')
        player.roomIn.onPlayerLeave(player) // force player to leave room
        this.mahjong.onPlayerLeaveQueue(player) // leave queue
    }

}

module.exports = Queue