const Queue = require('./Queue')

class Mahjong {

    constructor(nsp) {
        this.nsp = nsp
        this.players = new Array()
        this.roomIdCounter = 1

        this.queue_4p_tonpuusen = new Queue(this, { capacity: 4, wind: 1 })
        this.queue_4p_hanchan   = new Queue(this, { capacity: 4, wind: 2 })
        this.queue_3p_tonpuusen = new Queue(this, { capacity: 3, wind: 1 })
        this.queue_3p_hanchan   = new Queue(this, { capacity: 3, wind: 2 })
    }

    joinPlayer(player) {
        console.log(player.nickname, " joined mahjong.")
        player.socket.on('disconnect', reason => this.onPlayerDisconnect(player, reason))
        player.socket.on('enter_queue', mode => this.onPlayerEnterQueue(player, mode))
        player.socket.emit('my_info', {
            nickname: player.nickname,
            rate: player.rate,
            wins: player.wins,
        })
        this.players.push(player) // join
    }

    onPlayerEnterQueue(player, mode) { // when player start finding match
        player.socket.removeAllListeners('enter_queue')
        player.socket.on('leave_queue', () => this.onPlayerLeaveQueue(player))
        
        // insert to corresponding queue
        const { capacity, wind } = mode
        if     (capacity == 4 && wind == 1) this.queue_4p_tonpuusen.insert(player)
        else if(capacity == 4 && wind == 2) this.queue_4p_hanchan.insert(player)
        else if(capacity == 3 && wind == 1) this.queue_3p_tonpuusen.insert(player)
        else if(capacity == 3 && wind == 2) this.queue_3p_hanchan.insert(player)
    }

    onPlayerLeaveQueue(player) { // when player cancel finding match
        player.socket.removeAllListeners('leave_queue')
        player.queueIn.remove(player)
        player.queueIn = null
        player.socket.on('enter_queue', mode => this.onPlayerEnterQueue(player, mode))
    }

    onPlayerDisconnect(player, reason) {
        console.log(player.nickname, " left mahjong.")
        if(player.roomIn) player.roomIn.remove(player)
        if(player.queueIn) player.queueIn.remove(player)

        // remove player from mahjong
        const idx = this.players.findIndex(p => p == player)
        if(idx != -1) this.players.splice(idx, 1)
    }

}

module.exports = Mahjong