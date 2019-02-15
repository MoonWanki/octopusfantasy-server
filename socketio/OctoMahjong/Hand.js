class Hand {

    constructor(player, tiles) {
        this.player = player

        this.closed = tiles
        this.opened = []

        this.tsumoTile = null
    }

    tsumo(tile) {
        if(!this.tsumoTile) this.tsumoTile = tile
    }

    giri(tile) {
        if(this.tsumoTile) {
            const idx = this.closed.findIndex(t => t==tile)
            if(idx != -1) this.closed[idx] = this.tsumoTile
            this.tsumoTile = null
        }
    }
    
    isClosed() {
        return this.opened.length == 0
    }

    isTenpai(tiles) {
        const tiles = tiles || this.closed

        // TODO: find winnable tiles if tenpai.

        return null // winnable tiles or empty array
    }

    // return whether riichi is available with all tiles on hand(14p)
    canRiichi() {
        if(this.isClosed && !this.player.didRiichi) {
            let giriTilesToRiichi = new Array()
            const tiles = this.closed.concat(this.tsumoTile)
            // check for every case
            for(let i=0 ; i<tiles.length ; i++) {
                const spliced = tiles.splice(i, 1)
                const winnableTiles = this.isTenpai(spliced)
                if(winnableTiles.length) {
                    giriTilesToRiichi.push(tiles[i])
                }
            }
            return giriTilesToRiichi
        } else return null
    }
}

module.exports = Hand