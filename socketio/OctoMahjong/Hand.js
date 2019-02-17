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
    } //여기 수정하세요
    
    isClosed() {
        return this.opened.length == 0
    }

    isTenpai(tiles) {
        const tiles = tiles || this.closed

        // TODO: find winnable tiles if tenpai.

        return null // winnable tiles or empty array
    }
}

module.exports = Hand