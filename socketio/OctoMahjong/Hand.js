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
    } //여기 수정하세요 쯔모한거 버릴수도 있어요
    
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