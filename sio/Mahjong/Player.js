class Player {

    constructor(id, nickname, rate, wins, socket) {
        this.id = id
        this.nickname = nickname
        this.rate = rate
        this.wins = wins
        this.socket = socket
        
        this.isPlaying = true
    }
}