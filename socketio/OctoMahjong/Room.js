const Game = require('./Game')

class Room {

    constructor(mahjong, id, mode) {
        this.mahjong = mahjong
        this.id = id
        this.players = new Array()
        this.mode = mode

        this.game = null
        this.readyCount = 0
        this.selfDestroyTimer = null
    }

    insert(player) {
        if(this.players.length < this.mode.capacity) {
            player.roomIn = this
            this.players.push(player)
            this.notifyRoomStatus()
            console.log(`${player.info.nickname} joined room ${this.id}. now in room${this.id}: ${this.players.map(p => p.info.nickname)}`)

            player.socket.on('ready', () => this.onPlayerReady(player))
            player.socket.on('leave', () => onPlayerLeave(player))
        }
    }

    remove(player) {
        const idx = this.players.findIndex(p => p == player)
        if(idx != -1) this.players.splice(idx, 1)
    }

    onPlayerLeave(player) {
        player.socket.leave(this.id, err => { // when successfully left
            if(!err) {
                player.roomIn = null
                player.isReady = false
                player.socket.removeAllListeners('ready')
                player.socket.removeAllListeners('cancel_ready')
                player.socket.removeAllListeners('leave')
                this.remove(player)
                this.notifyRoomStatus()
                this.mahjong.notifyConnectedPlayers()
                console.log(`${player.info.nickname} left room ${this.id}. now in room${this.id}: ${this.players.map(p => p.info.nickname)}`)
            }
            else {
                console.error(err)
                player.socket.send(err)
            }
        })
    }

    onPlayerReady(player) {
        this.readyCount++
        player.isReady = true
        this.notifyRoomStatus()
        player.socket.on('cancel_ready', () => this.onPlayerCancelReady(player))
        
        if(this.readyCount == this.mode.capacity) {
            this.startGame()
        }
    }

    onPlayerCancelReady(player) {
        this.readyCount--
        player.isReady = false
        this.notifyRoomStatus()
        player.socket.on('ready', () => this.onPlayerReady(player))
    }

    notifyRoomStatus() {
        this.mahjong.nsp.to(this.id).emit('room_status', this.players.map(p => ({ info: p.info, isReady: p.isReady })))
    }

    startGame() {
        if(!this.game) {
            if(this.selfDestroyTimer) {
                clearTimeout(this.selfDestroyTimer)
                this.selfDestroyTimer = null
            }
            this.players.forEach(player => {
                if(player.queueIn) {
                    player.queueIn = null
                    player.socket.removeAllListeners('leave_queue')
                    player.socket.emit('match_success')
                }
                player.socket.emit('game_started')
            })
            const game = new Game(this, this.players, this.mode)
            this.game = game
            this.mahjong.notifyConnectedPlayers()
            console.log(`Game started in room ${this.id}!`)
        }
    }

    // if this room is created by queue but somebody has not accepted
    selfDestroyByMatchingFailed() {
        console.log(`room ${this.id} destroyed due to match failure`)
        this.players.forEach(player => {
            player.socket.emit('match_failed')
            this.onPlayerLeave(player)

            if(player.isReady) this.mahjong.onPlayerEnterQueue(player, this.mode) // insert to queue again automatically
            else {
                player.queueIn.onPlayerDeclineMatch(player)
                this.mahjong.onPlayerLeaveQueue(player, this.mode)
            }
        })
    }
    
}

module.exports = Room