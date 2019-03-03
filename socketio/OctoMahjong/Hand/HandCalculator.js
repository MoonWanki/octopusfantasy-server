const Tile = require('../Tile')
const Func = require('./Functions')

module.exports.isTenpai = function(tiles) {
    let arrays = new Array()
    var WinningTile = new Array()

    //sorting and Convert to array (length = 34)
    tiles = Func.Convert(Func.Sorting(tiles))

    //하나씩 넣어보기
    for(let i = 0; i < tiles.length; i++) {
        let t = tiles.slice()

        if(t[i] == 0 && ((i+1 < t.length && t[i+1] == 0) && (i > 0 && t[i-1] == 0)))
            continue
        // element insert to check Tenpai
        t[i] += 1

        // header candidate extract
        const Header = Func.FindPairs(t)

        Header.forEach(pair => {
            let LocalTiles = t.slice()
            /* remove open-tile in here */
            LocalTiles[pair] -= 2
            arrays = []
            // valid combination check
            const man = Func.ValidCheck(LocalTiles.slice(0, 9), 0)
            const pin = Func.ValidCheck(LocalTiles.slice(9, 18), 9)
            const sou = Func.ValidCheck(LocalTiles.slice(18, 27), 18)
            arrays = arrays.concat(man).concat(pin).concat(sou)

            let honour = []
            for(let k = 27; k < 34; k++) {
                if(arrays[k] == 3)
                    honour.push(k,k,k)
            }
            arrays = arrays.concat(honour)

            if(arrays.length > 3) {
                if(Func.UniqueCheck(LocalTiles, arrays)) {
                    // 오름패 확정
                    const tile = Func.Revert(i)
                    if(!WinningTile.some(tile => {
                        return (JSON.stringify(tile) === JSON.stringify(new Tile(tile[0], tile[1])))
                    }))
                        WinningTile.push(new Tile(tile[0], tile[1]))
                }
            }
        })
    }
    return WinningTile
}