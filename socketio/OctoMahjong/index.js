const MahjongPlayer = require('../../models/MahjongPlayer')
const Mahjong = require('./Mahjong')
const Player = require('./Player')

const OctoMahjong = nsp => {

    const mahjong = new Mahjong(nsp)

    nsp.on('connection', socket => {

        if(typeof socket.request.session.user == 'undefined') { // user should be signed in
            socket.send('unauthorized')
            socket.disconnect(true)
        }
        else {
            MahjongPlayer.getPlayerById(socket.request.session.user.id) // query to get player info
            .then(player => {
                if(player) {
                    console.log(`[registered player] ID:${player.id} nickname:${player.nickname}`)
                    // check if player is already in mahjang
                    const idx = mahjong.players.findIndex(p => p.id == player.id)
    
                    if(/* idx == -1 */true) { // clear (enable multiple connection only while development)
                        // create player instance
                        const { id, nickname, rate, wins } = player
                        const newPlayer = new Player(socket, id, nickname, rate, wins)
    
                        // welcome to mahjong
                        mahjong.joinPlayer(newPlayer)
                    }
                    else { // found in mahjong
                        console.log('already connected')
                        socket.send('already connected')
                        socket.disconnect(true)
                    }
                }
                else {
                    console.error('unregistered user')
                    socket.send('unregistered user')
                    socket.disconnect(true)
                }
            }).catch(err => {
                console.error(err)
                socket.send(err)
                socket.disconnect(true)
            })
        }
        
    })
}

module.exports = OctoMahjong
