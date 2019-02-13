const Hand = require('./Hand')

class Rotation {

    constructor(game, wind, round, counter) {
        this.game = game
        this.players = game.players

        this.wind = wind
        this.round = round
        this.counter = counter

        this.winner = null
        this.turn = 0

        this.initRotation()
        this.notifyGameStatus()
    }

    initRotation() {
        this.shuffleTiles()
        this.players.forEach((p, idx) => {
            p.isDealer = idx == this.round-1 // true if dealer
            p.isClosed = false
            p.isTenpai = false
            p.didRiichi = false
            p.hand = new Hand(p, this.game.tiles.slice(idx*13, (idx+1)*13))
        })
        this.turn = this.round-1
    }

    shuffleTiles() {
        const len = this.game.tiles.length
        let temp, j
        this.game.tiles.forEach((_, i) => {
            j = Math.floor(Math.random()*len) // random index
            temp = this.game.tiles[i]
            this.game.tiles[i] = this.game.tiles[j]
            this.game.tiles[j] = temp
        })
    }

    notifyGameStatus() {
        const gameStatus = {
            players: this.players.map(p => ({
                score: p.score,
                isDealer: p.isDealer,
                isClosed: p.isDealer,
                didRiichi: p.didRiichi,
            })),
            wind: this.wind,
            round: this.round,
            counter: this.counter,
        }
        this.players.forEach(p => p.socket.emit('game_status', gameStatus))
    }

    finishRotation() {
        this.game.onRotationFinished(this.winner.isDealer)
    }
}

module.exports = Rotation