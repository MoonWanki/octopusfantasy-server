const Hand = require('./Hand')
const Tile = require('./Tile')
const isTenpai = require('./utils/isTenpai')
const getYakus = require('./utils/getYakus')

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
            let playerWind = (idx + 1) - (this.round - 1)
            p.wind = playerWind > 0 ? playerWind : playerWind + 4
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
        const hand = player.hand
        const tsumoTile = this.tiles[this.tileCount++]
        hand.tsumoTile = tsumoTile

        let canTsumoAgari, canRiichi, canAnkan, canShouminkan

        // find possible choices

        // 1) Giri - default

        // 2) Tsumo agari - if tenpai && tsumo tile is winnable tile
        if(hand.isTenpai && hand.isInAgariTiles(tsumoTile)) {
            canTsumoAgari = true
        }
        // 3) Riichi - if tenpai can be made by tsumo tile
        else if(player.hand.isClosed && !player.didRiichi && !player.didDoubleRiichi) {
            const allTilesInHand = player.hand.closed.concat(this.tsumoTile)
            let giriTilesToRiichi = new Array()
            allTilesInHand.forEach((_, i) => {
                const sliced = allTilesInHand.slice(i, i+1)
                const agariTiles = isTenpai(sliced)
                if(agariTiles.length) giriTilesToRiichi = giriTilesToRiichi.concat(agariTiles)
            })
            if(giriTilesToRiichi.length) {
                canRiichi = true
            }
        }

        // TODO: 4) Ankan - if ankou exists
        // TODO: 5) Shouminkan - if minkou exists

        player.socket.on('giri', giriTile => this.onPlayerGiri(player, giriTile))                  // 1) Giri
        if(canTsumoAgari) player.socket.on('tsumo_agari', () => this.onPlayerTsumoAgari(player))   // 2) Tsumo agari
        if(canRiichi) player.socket.on('riichi', () => this.onPlayerRiichi(player))                // 3) Riichi
        if(canAnkan) player.socket.on('ankan', () => this.onPlayerAnkan(player))                   // 4) Ankan
        if(canShouminkan) player.socket.on('shouminkan', () => this.onPlayerShouminkan(player))    // 5) Shouminkan

        // send events to client
        player.socket.emit('tsumo_tile', tsumoTile, { canTsumoAgari, canRiichi, canAnkan, canShouminkan })
        player.socket.broadcast.to(this.game.room.id).emit('did_tsumo', this.turn)
    }

    removePlayerChoice(player) {
        player.socket.removeAllListeners('giri')
        player.socket.removeAllListeners('tsumo_agari')
        player.socket.removeAllListeners('riichi')
        player.socket.removeAllListeners('ankan')
        player.socket.removeAllListeners('shouminkan')
    }

    // player's choice callback 1: Giri
    onPlayerGiri(player, giriTile) {
        this.removePlayerChoice(player)
        player.giriTiles.push(giriTile)
        player.socket.broadcast.to(this.game.room.id).emit('did_giri', this.turn, giriTile)

        // TODO: handle if anybody can chi or pong or ron

        if(this.tileCount < (this.capacity==4 ? 120 : 116)) { // if tiles are left
            this.turn = (turn+1)%this.capacity
            this.requestTurn()
        }
        else {
            // TODO: handle exhausted
        }
    }
    
    // player's choice callback 2: Tsumo agari
    onPlayerTsumoAgari(player, agariTile) {
        this.removePlayerChoice(player)

        const yakus = getYakus(this, player)
        // TODO: handle tsumo agari
    }

    // player's choice callback 3: Riichi
    onPlayerRiichi(player, giriTile) {
        this.removePlayerChoice(player)
        // TODO: handle riichi
    }

    // player's choice callback 4: Ankan
    onPlayerAnkan(player) {
        // TODO: handle ankan
    }

    // player's choice callback 5: Shouminkan
    onPlayerShouminkan(player) {
        // TODO: handle shouminkan
    }

    // other's choice callback 1: Ron agari
    onOtherPlayerRonAgari(player) {
        // TODO: handle ron agari
    }

    // other's choice callback 2: Pong
    onOtherPlayerPong(player) {
        // TODO: handle pong
    }

    // other's choice callback 3: Chii
    onOtherPlayerChii(player) {
        // TODO: handle chii
    }

    // other's choice callback 4: Daiminkan
    onOtherPlayerDaiminkan(player) {
        // TODO: handle daiminkan
    }

    initTiles() {
        // create tiles
        let subTiles = new Array()
        const t1_t9=[1,2,3,4,5,6,7,8,9], t1_t4=[1,2,3,4], t1_t3=[1,2,3]
        t1_t9.forEach(n => subTiles.push(new Tile(1, n)))
        t1_t9.forEach(n => subTiles.push(new Tile(2, n)))
        t1_t9.forEach(n => subTiles.push(new Tile(3, n)))
        t1_t4.forEach(n => subTiles.push(new Tile(4, n)))
        t1_t3.forEach(n => subTiles.push(new Tile(5, n)))
        if(this.capacity == 3) subTiles.splice(1, 7) // cut 2~8 MAN if 3p game
        let tiles = subTiles.concat(subTiles).concat(subTiles)
        if(this.capacity == 3) {
            subTiles[6] = new Tile(2, 5, true)
            subTiles[15] = new Tile(3, 5, true)
        }
        else {
            subTiles[4] = new Tile(1, 5, true)
            subTiles[13] = new Tile(2, 5, true)
            subTiles[22] = new Tile(3, 5, true)
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