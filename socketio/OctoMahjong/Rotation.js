const Hand = require('./Hand')

class Rotation {

    constructor(game, capacity, wind, round, counter) {
        this.game = game
        this.players = game.players
        this.tiles = null

        this.capacity = capacity
        this.wind = wind
        this.round = round
        this.counter = counter

        this.winner = null
        this.turn = 0
        this.tileCount = 0
    }

    initRotation() {
        this.initTiles()
        this.players.forEach((p, idx) => {
            p.isDealer = idx == this.round-1 // true if dealer
            p.isClosed = false
            p.isTenpai = false
            p.didRiichi = false
            p.hand = new Hand(p, this.tiles.slice(idx*13, (idx+1)*13))
            this.tileCount += 13
        })
        this.turn = this.round-1 // dealer goes first
    }

    // tsumo, calculate, give choices
    requestTurn() {
        // tsumo
        const player = this.players[this.turn]
        const tsumoTile = this.tiles[this.tileCount++]
        player.hand.tsumo(tsumoTile)
        player.emit('tsumo_tile', tsumoTile)
        this.players.forEach(p => p.emit('did_tsumo', this.turn))

        // find possible choices
        player.on('giri', giriTile => this.onPlayerGiri(player, giriTile))
        const winnableTiles = player.hand.isTenpai()
        if(winnableTiles.length) { // if tenpai
            if(player.hand.isClosed && !player.didRiichi) {
                const giriTilesToRiichi = player.hand.canRiichi()
                if(giriTilesToRiichi.length) {
                    player.emit('can_riichi', giriTilesToRiichi)
                    player.on('riichi', () => this.onPlayerRiichi(player, giriTile))
                }
            }
        }
    }

    onPlayerGiri(player, giriTile) {
        player.removeAllListeners('giri')
        this.players.forEach(p => p.emit('did_giri', this.turn, giriTile))

        // TODO: handle if anybody can chi or pong or ron

        if(this.tileCount < (this.capacity==4 ? 120 : 116)) { // if tiles are left
            this.turn = (turn+1)%this.capacity
            this.requestTurn()
        }
        else {
            // TODO: handle exhausted
        }
    }

    onPlayerRiichi(player, giriTile) {

    }

    initTiles() {
        // create tiles
        let subTiles = new Array()
        const t1_t9=[1,2,3,4,5,6,7,8,9], t1_t4=[1,2,3,4], t1_t3=[1,2,3]
        t1_t9.forEach(n => subTiles.push(new Tile(1, n, false, false)))
        t1_t9.forEach(n => subTiles.push(new Tile(2, n, false, false)))
        t1_t9.forEach(n => subTiles.push(new Tile(3, n, false, false)))
        t1_t4.forEach(n => subTiles.push(new Tile(4, n, true, false)))
        t1_t3.forEach(n => subTiles.push(new Tile(5, n, true, false)))
        if(this.mode.capacity == 3) subTiles.splice(1, 7) // cut 2~8 MAN if 3p game
        let tiles = subTiles.concat(subTiles).concat(subTiles)
        if(this.mode.capacity == 3) {
            subTiles[6] = new Tile(2, 5, false, true)
            subTiles[15] = new Tile(3, 5, false, true)
        }
        else {
            subTiles[4] = new Tile(1, 5, false, true)
            subTiles[13] = new Tile(2, 5, false, true)
            subTiles[22] = new Tile(3, 5, false, true)
        }
        tiles = tiles.concat(subTiles)

        // shuffle
        let temp, j
        tiles.forEach((_, i) => {
            j = Math.floor(Math.random()*tiles.length) // random index
            temp = tiles[i]
            tiles[i] = tiles[j]
            tiles[j] = temp
        })

        this.tiles = tiles
        this.tileCount = 0
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