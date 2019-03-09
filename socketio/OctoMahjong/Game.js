const Rotation = require('./Rotation')

class Game {

    constructor(room, players, mode) {
        this.room = room
        this.players = players
        this.mode = mode

        this.rotation = null
        this.round = 1
        this.counter = 0

        this.deposit = 0
        this.scoreToReturn = 0
    }

    initGame() {
        // distribute initial scores for players
        if     (this.mode.capacity==3)  { this.players.forEach(p => p.score = 30000); this.scoreToReturn = 35000 }
        else if(this.mode.wind==1)      { this.players.forEach(p => p.score = 20000); this.scoreToReturn = 25000 }
        else if(this.mode.wind==2)      { this.players.forEach(p => p.score = 25000); this.scoreToReturn = 30000 }
    }

    startRotation() {
        const wind = Math.floor((this.round-1) / this.mode.capacity) + 1
        const round = (this.round-1) % this.mode.capacity + 1
        this.rotation = new Rotation(this, this.mode.capacity, wind, round, this.counter)
        this.rotation.initRotation()
        this.rotation.requestTurn()
    }

    onRotationFinished(shouldGoRenchan) {
        if(shouldGoRenchan) { // if should go renchan
            this.counter++
            this.startRotation()
        }
        else if(this.round < this.mode.capacity * this.mode.wind) { // ordinary case
            this.round++
            this.startRotation()
        }
        else if(this.players.every(p => p.score <= this.scoreToReturn)) { // if nobody can return score
            this.round++
            this.startRotation()
        }
        else {
            this.finishGame()
        }
    }

    finishGame() {
        // TODO: update records into player database
        this.room.onGameFinished()
    }
}

module.exports = Game