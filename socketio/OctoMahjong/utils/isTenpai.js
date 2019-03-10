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
        return new Tile(type, number)
    }
    else {
        if(input < 31) {
            type = 4
            number = input - 26
            return new Tile(type, number)
        } else {
            type = 5
            number = input - 30
            return new Tile(type, number)
        }
    }
}

const sorting = input => {
    const sorted = input.sort(function(a, b) {
        if(a.type == b.type) {
            if(a.number > b.number)
                return 1
            else
                return -1
        }
        else if(a.type > b.type)
            return 1
        else
            return -1
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

const guksa = (GuksaHeader, Header, tiles, t) => {
    let ex = [
        new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9), new Tile(3, 1),
        new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4),
        new Tile(5, 1), new Tile(5, 2), new Tile(5, 3)
    ]
    let winning = new Array()
    if(GuksaHeader.length === 0) { // 13 tile return
        let winning = new Array()
        for(const tile of ex) {
            let tmp = ex.slice()
            tmp.push(tile)
            winning.push({
                melds: sorting(tmp),
                wait: "",
                tile: tile
            })
        }
        return winning
    }
    if(Header.length > 0) { // 1 tile return
        let tmp = convertTile(sorting(ex))
        for(let i = 0; i < tmp.length; i++) {
            if(tmp[i] != 0 && t[i] === 0) {
                let arr = new Array()
                for(let j = 0; j < tiles.length;) {
                    if(tiles[j] != 0) {
                        //insert
                        arr.push(revertTile(j))
                        tiles[j]--
                    }
                    else
                        j++
                }
                arr.push(revertTile(i))
                winning.push({
                    melds: [sorting(arr)],
                    wait: "",
                    tile: revertTile(i)
                })
            }
        }
        return winning
    }
}

module.exports = function(tiles) {
    var winningTile = new Array()
    var meldNum = 0

    if(tiles.length == 1) {
        winningTile.push({
            melds: [tiles],
            tile: tiles
        })
        return winningTile
    }
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
        if(Guksa && meldNum == 4) {
            return guksa(GuksaHeader, Header, tiles, t)
        }

        // Chitoitsu check
        if(Header.length > 6) {
            meld = new Array()
            Header.forEach(head => {
                meld.push([revertTile(head), revertTile(head)])
            })
            winningTile.push({
                melds: meld,
                wait: "tanki",
                tile: revertTile(i)
            })
            break
        }
        Header.forEach(pair => {
            let LocalTiles = t.slice()
            let meld = []
            let wait = "tanki"
            LocalTiles[pair] -= 2
            // body elimination
            for(let j = 0; j < LocalTiles.length;) {
                let flag = false
                //pon elimination
                if(LocalTiles[j] > 2) {
                    meld.push([revertTile(j),revertTile(j),revertTile(j)])
                    if(i == j) {
                        wait = "shanpon"
                    }
                    LocalTiles[j] -= 3
                }
                if(parseInt(j/9) != parseInt((j+1)/9) || parseInt(j/9) != parseInt((j+2)/9)) {
                    j++
                    continue
                }
                if(j < 25 && (LocalTiles[j] > 0) && (LocalTiles[j+1] >= LocalTiles[j]) && (LocalTiles[j+2] >= LocalTiles[j])) {
                    // chi elimination
                    meld.push([revertTile(j), revertTile(j+1), revertTile(j+2)])
                    if(i == j+1) {
                        // 간짱
                        wait = "kan"
                    }
                    else if(i == j || i == j+2) {
                        // 양면대기
                        wait = "ryan"
                        if((i == j+2 && (j == 0 || j == 9 || j == 18)) || (i == j && (j+2 == 8 || j+2 == 17 || j+2 == 26)))
                        wait = "pen"
                    }
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
                meld.push([revertTile(pair), revertTile(pair)])
                winningTile.push({
                    melds: meld,
                    wait: wait,
                    tile: revertTile(i)
                })
            }
        })
    }
    for(var result of winningTile) {
        const {melds, wait, tile} = result
        console.log("wait : ", wait)
    }
    return winningTile
}