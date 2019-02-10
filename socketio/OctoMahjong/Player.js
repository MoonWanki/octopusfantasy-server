class Player {

    constructor(socket, id, nickname, rate, wins) {

        this.socket = socket

        this.id = id
        this.nickname = nickname
        this.rate = rate
        this.wins = wins
        
        this.queueIn = null // queue where player is joined
        this.roomIn = null // room where player is joined

        this.isReady = false

        this.didRiichi = false
        this.isClosed = true
    }
}

module.exports = Player