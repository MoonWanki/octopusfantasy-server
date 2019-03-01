const Tile = require('../Tile')
const Func = require('./Functions')

module.exports.isTenpai = function(tiles) {
    //sorting and Convert to array (length = 34)
    tiles = Func.Convert(Func.Sorting(tiles))
    //하나씩 넣어보기
    for(let i = 0; i < tiles.length; i++) {
        let t = tiles.splice()
        if(t[i] == 0 && ((i+1 < t.length && t[i+1] == 0) || (i > 0 && t[i-1] == 0)))
            continue
        // element insert to check Tenpai
        t[i] += 1
        // header candidate extract
        const Header = Func.FindPairs(t)
        Header.forEach(pair => {
            let LocalTiles = t
            /* remove open-tile in here */
            LocalTiles[pair] -= 2
            
            // valid combination check
            const man = Func.ValidCheck(LocalTiles, 0, 8)
            const pin = Func.ValidCheck(LocalTiles, 9, 17)
            const sou = Func.ValidCheck(LocalTiles, 18, 26)

            let honour = []
            for(let i = 27; i < 34; i++) {
                if(hand[i] == 3)
                    honour.push(i,i,i)
            }
        })
    }

}