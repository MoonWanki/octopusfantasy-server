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
        player.socket.leave(this.id, err => { // when successfully left
            if(!err) {
                player.roomIn = null
                player.isReady = false
                player.socket.removeAllListeners('ready')
                player.socket.removeAllListeners('cancel_ready')
                player.socket.removeAllListeners('leave')
                this.remove(player)
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
            console.log(`Game started in room ${this.id}!`)
        }
    }

    // if this room is created by queue but somebody has not accepted
    selfDestroyOnMatchingFailed() {
        console.log(`room ${this.id} destroyed due to match failure`)
        this.players.forEach(player => {
            player.socket.emit('match_failed')
            this.onPlayerLeave(player)

            if(player.isReady) this.mahjong.onPlayerEnterQueue(player, this.mode)
            else this.mahjong.onPlayerLeaveQueue(player, this.mode)
        })
    }
    
}

module.exports = Room