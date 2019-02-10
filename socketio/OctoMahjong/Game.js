const Tile = require('./Tile')

class Game {

    constructor(room, players, mode) {
        this.room = room
        this.players = players
        this.mode = mode

        this.initGame()
    }

    initGame() {
        // distribute initial scores for players
        if     (this.mode.wind==1) this.players.forEach(player => player.score = 20000)
        else if(this.mode.wind==2) this.players.forEach(player => player.score = 25000)

        // create tiles to use
        let subTiles = new Array()

        const t1_t9=[1,2,3,4,5,6,7,8,9], t1_t4=[1,2,3,4], t1_t3=[1,2,3]

        t1_t9.forEach(n => subTiles.push(new Tile(1, n, false, false)))
        t1_t9.forEach(n => subTiles.push(new Tile(2, n, false, false)))
        t1_t9.forEach(n => subTiles.push(new Tile(3, n, false, false)))
        t1_t4.forEach(n => subTiles.push(new Tile(4, n, true, false)))
        t1_t3.forEach(n => subTiles.push(new Tile(5, n, true, false)))
        if(this.mode.capacity == 3) subTiles.splice(1, 7) // cut 2~8 WAN if 3p mahjong
        this.tiles = subTiles.concat(subTiles).concat(subTiles)
        if(this.mode.capacity == 3) {
            subTiles[6] = new Tile(2, 5, false, true)
            subTiles[15] = new Tile(3, 5, false, true)
        }
        else {
            subTiles[4] = new Tile(1, 5, false, true)
            subTiles[13] = new Tile(2, 5, false, true)
            subTiles[22] = new Tile(3, 5, false, true)
        }
        this.tiles = this.tiles.concat(subTiles)
        this.initRotation()
    }

    initRotation() {
        // distribute hands and show dora
    }
}

module.exports = Game