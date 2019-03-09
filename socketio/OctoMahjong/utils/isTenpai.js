const Tile = require('../Tile')

const convertTile = input => {
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
const revertTile = input => {
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

const sorting = input => {
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

const findPairs = input => {
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

const guksa = (GuksaHeader, Header, tiles) => {
    ex = [
        new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9), new Tile(3, 1),
        new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4),
        new Tile(5, 1), new Tile(5, 2), new Tile(5, 3)
    ]
    if(GuksaHeader.length === 0) { // 13 tile return
        return ex
    }
    if(Header.length > 0) { // 1 tile return
        let tmp = convertTile(sorting(ex))
        for(let i = 0; i < tmp.length; i++) {
            if(tmp[i] != 0 && tiles[i] === 0) {
                const tile = revertTile(i)
                return [new Tile(tile[0], tile[1])]
            }
        }
        return []
    }
}

module.exports = function(tiles) {
    var winningTile = new Array()
    var meldNum = 0

    if(tiles.length == 1)
        return tiles
    else {
        meldNum = (tiles.length - 1)/3
    }

    //Thirteen orphan check
    let Guksa = false
    if(!tiles.some(tile => {
        if(!tile.isHonour)
            return true
    })) {
        Guksa = true
    }
    
    //sorting and Convert to array (length = 34)
    tiles = convertTile(sorting(tiles))

    // Header find for Thirteen orphan
    var GuksaHeader = findPairs(tiles)

    //하나씩 넣어보기
    for(let i = 0; i < tiles.length; i++) {
        let t = tiles.slice()

        if(t[i] > 3 || t[i] == 0 && ((i+1 < t.length && t[i+1] == 0) && (i > 0 && t[i-1] == 0)))
            continue
        // element insert to check Tenpai
        t[i] += 1

        // header candidate extract
        const Header = findPairs(t)
        //Thirteen orphan process
        if(Guksa) {
            winningTile = guksa(GuksaHeader, Header, t)
            return winningTile
        }

        // Chitoitsu check
        if(Header.length > 6) {
            const tile = revertTile(i)
            winningTile.push(new Tile(tile[0], tile[1]))
            break
        }
        Header.forEach(pair => {
            let LocalTiles = t.slice()
            let meld = []
            /* remove open-tile in here */
            LocalTiles[pair] -= 2

            // body elimination
            for(let j = 0; j < LocalTiles.length;) {
                let flag = false
                //pon elimination
                if(LocalTiles[j] > 2) {
                    meld.push([j,j,j])
                    LocalTiles[j] -= 3
                }
                if(parseInt(j/9) != parseInt((j+1)/9) || parseInt(j/9) != parseInt((j+2)/9)) {
                    j++
                    continue
                }
                if(j < 25 && (LocalTiles[j] > 0) && (LocalTiles[j+1] >= LocalTiles[j]) && (LocalTiles[j+2] >= LocalTiles[j])) {
                    // chi elimination
                    meld.push([j, j+1, j+2])
                    LocalTiles[j] -= 1
                    LocalTiles[j+1] -= 1
                    LocalTiles[j+2] -= 1
                    flag = true
                }
                if(LocalTiles[j] > 1 || !flag) {
                    j++
                }
            }
            if(meld.length === meldNum) {
                let flag = true
                const tile = revertTile(i)
                for(let i = 0; i < winningTile.length; i++) {
                    if(JSON.stringify(winningTile[i]) == JSON.stringify(new Tile(tile[0], tile[1]))) {
                        flag = false
                        break
                    }
                }
                if(flag) {
                    winningTile.push(new Tile(tile[0], tile[1]))
                }
            }
        })
    }
    return winningTile
}