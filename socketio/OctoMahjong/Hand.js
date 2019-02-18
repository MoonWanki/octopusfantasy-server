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
        let allClosedTiles = this.closed
        if(this.tsumoTile) {
            allClosedTiles = allClosedTiles.concat(this.tsumoTile)
            this.tsumoTile = null
        }
        const idx = allClosedTiles.findIndex(t => t==tile)
        if(idx != -1) allClosedTiles.splice(idx, 1)
        this.closed = allClosedTiles
    }
    
    isClosed() {
        return this.opened.length == 0
    }

    isTenpai(tiles) {
        const tiles = tiles || this.closed

        // TODO: find winnable tiles if tenpai.
        // 텐파이는 그냥 단순히 머리1개, 몸통 4개 만들 수 있는지
        // 화료는 역이 있는지
        return null // winnable tiles or empty array
    }
}

module.exports = Hand