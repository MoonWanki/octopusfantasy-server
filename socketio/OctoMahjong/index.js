const MahjongPlayer = require('../../models/MahjongPlayer')
const Mahjong = require('./Mahjong')
const Player = require('./Player')

const OctoMahjong = nsp => {

    const mahjong = new Mahjong(nsp)

    nsp.on('connection', socket => {

        if(typeof socket.request.session.user == 'undefined') { // user should be signed in
            socket.emit('unauthorized')
            socket.disconnect(true)
        }
        else {
            MahjongPlayer.getPlayerById(socket.request.session.user.id) // query to get player info
            .then(info => {
                if(info) {
                    console.log(`[registered player] ID:${info.id} nickname:${info.nickname}`)
                    // check if player is already in mahjang
                    const idx = mahjong.players.findIndex(p => p.id == info.id)
    
                    if(/* idx == -1 */true) { // if available to join (enable multiple connection only while development)
                        // create player instance
                        const playerInstance = new Player(socket, info)
    
                        // welcome to mahjong
                        socket.emit('welcome', info)
                        mahjong.joinPlayer(playerInstance)
                    }
                    else { // already in mahjong
                        console.log('already connected')
                        socket.emit('already_connected')
                        socket.disconnect(true)
                    }
                }
                else {
                    console.error('unregistered user')
                    socket.emit('unregistered')
                    socket.disconnect(true)
                }
            }).catch(err => {
                console.error(err)
                socket.emit('db_error', err)
                socket.disconnect(true)
            })
        }
    })
}

module.exports = OctoMahjong
