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
            console.log(`${player.nickname} joined room ${this.id}. now in room${this.id}: ${this.players.map(p => p.nickname)}`)

            this.mahjong.nsp.to(this.id).emit('room_status', this.players.map(player => player.nickname))
            player.socket.on('ready', () => this.onPlayerReady(player))
            player.socket.on('leave', () => onPlayerLeave(player))
        }
    }

    remove(player) {
        const idx = this.players.findIndex(p => p == player)
        if(idx != -1) this.players.splice(idx, 1)
        this.mahjong.nsp.to(this.id).emit('room_status', this.players.map(p => p.nickname))
        console.log(`${player.nickname} left room ${this.id}. now in room${this.id}: ${this.players.map(p => p.nickname)}`)
    }

    onPlayerLeave(player) {
        player.socket.leave(this.id, err => {
            if(!err) {
                player.socket.removeAllListeners(['ready', 'cancel_ready', 'leave'])
                this.remove(player)
                if(player.queueIn) {
                    if(player.isReady) {
                        player.socket.emit('match_declined')
                        player.queueIn.insert(player)
                    }
                    else {
                        player.socket.emit('match_declined')
                        player.queueIn.onPlayerDeclineMatch(player)
                    }
                }
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
        player.socket.on('cancel_ready', () => this.onPlayerCancelReady(player))
        this.mahjong.nsp.to(this.id).emit('room_status', this.players.map(p => p.nickname))
        
        if(this.readyCount == this.mode.capacity) {
            this.startGame()
        }
    }

    onPlayerCancelReady(player) {
        this.readyCount--
        player.isReady = false
        player.socket.on('ready', () => this.onPlayerReady(player))
        this.mahjong.nsp.to(this.id).emit('room_status', this.players.map(p => p.nickname))
    }

    startGame() {
        if(this.selfDestroyTimer) {
            clearTimeout(this.selfDestroyTimer)
            this.selfDestroyTimer = null
        }
        if(!this.game) {
            console.log(`Game started in room ${this.id}!`)
            const game = new Game(this, this.players, this.mode)
            this.game = game

            this.players.forEach(player => {
                player.queueIn = null
                player.socket.emit('game_started')
            })
        }
    }

    selfDestroy() {
        console.log(`room ${this.id} destroyed.`)
        this.players.forEach(player => {
            this.onPlayerLeave(player)
        })
    }
    
}

module.exports = Room