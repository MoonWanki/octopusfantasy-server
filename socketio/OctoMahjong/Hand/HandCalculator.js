const Tile = require('../Tile')
const Func = require('./Functions')

module.exports.isTenpai = function(tiles) {
    let arrays = new Array()
    var WinningTile = new Array()
    var result = new Array()
    //Thirteen orphan check
    let Guksa = false
    if(!tiles.some(tile => {
        if(!tile.isHonour)
            return true
    })) {
        Guksa = true
    }
    
    //sorting and Convert to array (length = 34)
    tiles = Func.Convert(Func.Sorting(tiles))

    // Header find for Thirteen orphan
    var GuksaHeader = Func.FindPairs(tiles)

    //하나씩 넣어보기
    for(let i = 0; i < tiles.length; i++) {
        let t = tiles.slice()

        if(t[i] > 3 || t[i] == 0 && ((i+1 < t.length && t[i+1] == 0) && (i > 0 && t[i-1] == 0)))
            continue
        // element insert to check Tenpai
        t[i] += 1

        // header candidate extract
        const Header = Func.FindPairs(t)
        //Thirteen orphan process
        if(Guksa) {
            WinningTile = Func.Guksa(GuksaHeader, Header, t)
            return WinningTile
        }

        // Chitoitsu check
        if(Header.length > 6) {
            const tile = Func.Revert(i)
            WinningTile.push(new Tile(tile[0], tile[1]))
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
            if(meld.length === 4) {
                let flag = true
                const tile = Func.Revert(i)
                for(let i = 0; i < WinningTile.length; i++) {
                    if(JSON.stringify(WinningTile[i]) == JSON.stringify(new Tile(tile[0], tile[1]))) {
                        flag = false
                        break
                    }
                }
                if(flag) {
                    WinningTile.push(new Tile(tile[0], tile[1]))
                }
            }
        })
    }
    return WinningTile
}