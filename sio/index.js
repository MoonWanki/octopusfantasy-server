const Mahjong = require('./Mahjong/index')
const Player = require('./Mahjong/Player')
const MahjongPlayer = require('../models/MahjongPlayer')

const sio = io => {

    const mahjong = new Mahjong(io)

    io.on('connection', socket => {

        if(typeof socket.request.session.user == 'undefined') { // user should be signed in
            socket.send('unauthorized')
            socket.disconnect(true)
        } else {
            MahjongPlayer.getPlayerById(socket.request.session.user.id)
            .then(player => {
                socket.on('disconnect', onDisconnect)
                
                // create player instance
                const { id, nickname, rate, wins } = player
                const newPlayer = new Player(id, nickname, rate, wins, socket)
                
                // enter to mahjong
                mahjong.addPlayer(newPlayer)

            }).catch(err => {
                socket.send(err)
                socket.disconnect(true)
            })
        }
        
    })
}

const onDisconnect = socket => {
    // handle player disconnected
}

module.exports = sio