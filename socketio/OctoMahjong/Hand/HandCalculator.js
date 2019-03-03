const Tile = require('../Tile')
const func = require('./functions')

module.exports.isTenpai = function(tiles) {
    var winningTile = new Array()
    var result = new Array()
    var meldNum = 0

    // tiles length check to modify meldNum value
    if(tiles.length == 1)
        return tiles
    else {
        meldNum = (tiles.length - 1)/3
    }

    //Thirteen orphan check
    let guksa = false
    if(!tiles.some(tile => {
        if(!tile.isHonour)
            return true
    })) {
        guksa = true
    }
    
    //sorting and Convert to array (length = 34)
    tiles = func.convertTile(func.sorting(tiles))

    // Header find for Thirteen orphan
    var GuksaHeader = func.findPairs(tiles)

    //Input each tile at a time
    for(let i = 0; i < tiles.length; i++) {
        let t = tiles.slice()

        // except condition to prevent unnecessary input
        if(t[i] > 3 || t[i] == 0 && ((i+1 < t.length && t[i+1] == 0) && (i > 0 && t[i-1] == 0)))
            continue
        
        // element insert to check Tenpai
        t[i] += 1

        // header candidate extract
        const Header = func.findPairs(t)

        //Thirteen orphan process
        if(guksa && meldNum == 4) {
            winningTile = func.guksa(GuksaHeader, Header, t)
            return winningTile
        }

        // Chitoitsu check
        if(Header.length > 6) {
            const tile = func.revertTile(i)
            winningTile.push(new Tile(tile[0], tile[1]))
            break
        }

        // pop each header at a time
        Header.forEach(pair => {
            let LocalTiles = t.slice()
            let meld = []
            LocalTiles[pair] -= 2

            // body elimination
            for(let j = 0; j < LocalTiles.length;) {
                let flag = false
                //pon elimination
                if(LocalTiles[j] > 2) {
                    meld.push([j,j,j])
                    LocalTiles[j] -= 3
                }
                // condition for preventing loop from crossing the border
                if(parseInt(j/9) != parseInt((j+1)/9) || parseInt(j/9) != parseInt((j+2)/9)) {
                    j++
                    continue
                }
                // chi elimination
                if(j < 25 && (LocalTiles[j] > 0) && (LocalTiles[j+1] >= LocalTiles[j]) && (LocalTiles[j+2] >= LocalTiles[j])) {
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
            // meld length check and uniquely insert
            if(meld.length === meldNum) {
                let flag = true
                const tile = func.revertTile(i)
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