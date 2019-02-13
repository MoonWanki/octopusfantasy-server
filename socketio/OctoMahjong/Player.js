class Player {

    constructor(socket, info) {

        this.socket = socket

        this.info = info // { id, nickname, rate, wins }
        
        this.queueIn = null // queue where player is joined
        this.roomIn = null // room where player is joined

        // in room
        this.isReady = false

        // in game
        this.score = 0

        // in rotation
        this.hand = null
        this.isDealer = false
        this.didRiichi = false
    }
}

module.exports = Player