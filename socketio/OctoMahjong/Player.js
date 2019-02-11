class Player {

    constructor(socket, info) {

        this.socket = socket

        this.info = info
        
        this.queueIn = null // queue where player is joined
        this.roomIn = null // room where player is joined

        this.isReady = false

        this.didRiichi = false
        this.isClosed = true
    }
}

module.exports = Player