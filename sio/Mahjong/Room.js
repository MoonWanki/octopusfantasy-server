const Tile = require('./Tile')

class Room {

    // mahjong : Mahjong            mahjong instance
    // id : String                  room name in this namespace
    // mode : Number                0(동풍전) | 1(반장전)
    // withRedDora : Boolean        whether this game has red dora
    // players : Array<Player>      instances of players in this room    

    constructor(mahjong, id, mode, withRedDora, players) {
        this.mahjong = mahjong
        this.id = id
        this.mode = mode
        this.withRedDora = withRedDora
        this.players = players
        initGame()
    }

    initGame() {
        // distribute initial scores for players
        if(mode==0) players.forEach(player => player.score = 20000)
        else if(mode==1) players.forEach(player => player.score = 25000)

        // create tiles to use
        let subTiles = new Array()
        [1,2,3,4,5,6,7,8,9].forEach(number => subTiles.push(new Tile(1, number, false, false)))
        [1,2,3,4,5,6,7,8,9].forEach(number => subTiles.push(new Tile(2, number, false, false)))
        [1,2,3,4,5,6,7,8,9].forEach(number => subTiles.push(new Tile(3, number, false, false)))
        [1,2,3,4]          .forEach(number => subTiles.push(new Tile(4, number, true, false)))
        [1,2,3]            .forEach(number => subTiles.push(new Tile(5, number, true, false)))
        this.tiles = subTiles.concat(subTiles).concat(subTiles)
        if(withRedDora) { // replace with red dora
            subTiles[4] = new Tile(1, 5, false, true)
            subTiles[14] = new Tile(2, 5, false, true)
            subTiles[24] = new Tile(3, 5, false, true)
        }
        this.tiles = this.tiles.concat(subTiles)

        initRotation()
    }

    initRotation() {
        // run the dice
        // distribute hands and show the dora
    }

    applyRotationResultToPlayers() {
        // save each result to each player DB
    }

    selfDestroy() {
        players.forEach(player => player.socket.leave(id)) // let players leave this room
        this.mahjong.removeRoom(this) // remove this instance
    }
    
}

module.exports = Room