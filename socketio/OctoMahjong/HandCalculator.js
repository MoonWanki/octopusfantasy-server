const Tile = require('./Tile')

module.exports.isTenpai = function(tiles) {
    WinningTile = []
    // if tiles.length is just 1, it shows that there is only toitsu in hand.
    if(tiles.length < 2) {
        return tiles
    } else {
        for(let i = 0; i < tiles.length - 1; i++) {
            console.log("tile num : ", i)
            WinningTile.concat(isAnker(tiles[i], tiles[i+1]))
            if(tiles[i].type <= 3) { // number tiles
                WinningTile.concat(isRyanTatsu(tiles[i], tiles[i+1]))
                WinningTile.concat(isKanTatsu(tiles[i], tiles[i+1]))
                WinningTile.concat(isPenTatsu(tiles[i], tiles[i+1]))
            }
        }
    }
    return []
}

sorting = tiles => {
    const sorted = tiles.sort(function(a, b) {
        if(a.type != b.type) {
            if(a.number > b.number)
                return 1
            else if(a.number = b.number)
                return 0
            else
                return -1
        }
        return a.type > b.type
    })
    return sorted
}

isRyanTatsu = (a, b) => {
    if(a.isHonour || b.isHonour)
        return []
    if(a.type == b.type && a.number + 1 == b.number) {
        tmp = [new Tile(a.type, a.number-1), new Tile(a.type, b.number+1)]
        return tmp
    }
    return []
}

isKanTatsu = (a, b) => {
    if(a.type == b.type && a.number + 2 == b.number) {
        tmp = [ new Tile(a.type, a.number+1) ]
        return tmp
    }
    return []
}

isPenTatsu = (a, b) => {
    if(a.type == b.type && a.number + 1 == b.number) {
        // Neither is true
        if(a.isHonour){
            tmp = [ new Tile(b.type, b.number+1) ]
            return tmp
        }
        if(b.isHonour) {
            tmp = [ new Tile(a.type, a.number-1) ]
            return tmp
        }
    }
    return []
}

isAnker = (a, b) => {
    if(a.type == b.type && a.number == b.number) {
        tmp = [ new Tile(a.type, a.number) ]
        return tmp
    }
    return []
}