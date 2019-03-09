const isTenpai = require('./utils/isTenpai')

class Hand {

    constructor(player, tiles) {
        this.player = player

        this.closed = tiles
        this.opened = new Array()

        this.tsumoTile = null
        this.giriTiles = new Array()
        this.agariTiles = null // set only by HandCalculator.isTenpai()

        this.isTenpai = false

        this.checkTenpai()
    }

    // check if this player is now tenpai with his closed hand.
    // if yes, save his agariTiles so that no calculation is need again.
    checkTenpai() {
        const tenpaiInfo = isTenpai(this.closed)
        if(tenpaiInfo.length) {
            this.isTenpai = true
            this.agariTiles = tenpaiInfo
        }
        else {
            this.isTenpai = false
            this.agariTiles = null
        }
    }

    isInGiriTiles(tile) {
        this.giriTiles.forEach(giriTile => { if(tile.isSameWith(giriTile)) return true })
        return false
    }

    isInAgariTiles(tile) {
        this.agariTiles.forEach(agariTiles => { if(tile.isSameWith(agariTiles)) return true })
        return false
    }

    giri(tile) {
        let allClosedTiles = this.closed
        if(this.tsumoTile) {
            allClosedTiles = allClosedTiles.concat(this.tsumoTile)
            this.tsumoTile = null
        }
        const idx = allClosedTiles.findIndex(t => t==tile)
        if(idx != -1) allClosedTiles.splice(idx, 1)
        this.closed = allClosedTiles
        this.checkTenpai()
    }
    
    isClosed() {
        return this.opened.length == 0
    }
}

module.exports = Hand