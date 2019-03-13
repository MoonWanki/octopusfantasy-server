// 김대리

module.exports = (rotation, player) => {
    const { wind, round, turn } = rotation
    const { didRiichi, didDoubleRiichi, wind: playerWind } = player
    const { closed, opened, tsumoTile, agariTiles } = player.hand

    let candidate = new Array()

    for(var agari of agariTiles) {
        const {tile} = agari
        if(JSON.stringify(tile) == JSON.stringify(tsumoTile)) {
            candidate.push(getYakus(agari, closed, opened))
        }
    }


    return yakus
}

const getYakus = (agari, closed, opend) => {
    let yakus = new Array()
    const {melds, head, tile} = agari
    
    if(didRiichi) yakus.push('riichi')
    if(didDoubleRiichi) yakus.push('double riichi')

    return yakus
}