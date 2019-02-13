class Hand {

    constructor(player, tiles) {
        this.player = player

        this.closed = tiles
        this.opened = []

        this.isTenpai = false
        this.isClosed = false

        this.tsumoTile = null
    }
}

module.exports = Hand