module.exports = (rotation, player) => {
    const { wind, round, turn } = rotation
    const { didRiichi, didDoubleRiichi, wind: playerWind } = player
    const { closed, opened } = player.hand

    const yakus = new Array()

    if(didRiichi) yakus.push('riichi')
    if(didDoubleRiichi) yakus.push('double riichi')

    // TODO: push all satisfied yakus

    return yakus
}