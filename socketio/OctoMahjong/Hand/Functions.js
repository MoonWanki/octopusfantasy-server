const perm = require('math-permutation')
const Tile = require('../Tile')

exports.Convert = input => {
    let tiles = new Array()
    for(let i = 0; i < 34; i++) { tiles.push(0) }
    input.forEach(tile => {
        if(tile.type < 4)
            tiles[(tile.type - 1)*9 + (tile.number - 1)] += 1
        else if(tile.type == 4)
            tiles[26 + tile.number] += 1
        else if(tile.type == 5)
            tiles[30 + tile.number] += 1
    })
    return tiles
}

exports.Revert = input => {
    let type = 0, number = 0
    if(input < 27) {
        type = 1 + parseInt(input / 9)
        number = 1 + (input % 9)
        return [type, number]
    }
    else {
        if(input < 31) {
            type = 4
            number = input - 26
            return [type, number]
        } else {
            type = 5
            number = input - 30
            return [type, number]
        }
    }
}

exports.Sorting = input => {
    const sorted = input.sort(function(a, b) {
        if(a.type == b.type) {
            if(a.number >= b.number)
                return 1
            else
                return -1
        }
        return a.type > b.type
    })
    return sorted
}

exports.FindPairs = input => {
    let pairs = new Array()
    for(let i = 0; i < input.length; i++) {
        if(i > 26 && input[i] != 2)
            continue
        
        if(input[i] >= 2) {
            pairs.push(i)
        }
    }
    return pairs
}

exports.Guksa = (GuksaHeader, Header, tiles) => {
    ex = [
        new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9), new Tile(3, 1),
        new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4),
        new Tile(5, 1), new Tile(5, 2), new Tile(5, 3)
    ]
    if(GuksaHeader.length === 0) { // 13 tile return
        return ex
    }
    if(Header.length > 0) { // 1 tile return
        let tmp = exports.Convert(exports.Sorting(ex))
        for(let i = 0; i < tmp.length; i++) {
            if(tmp[i] != 0 && tiles[i] === 0) {
                const tile = exports.Revert(i)
                return [new Tile(tile[0], tile[1])]
            }
        }
        return []
    }
}