const socketIO = require('socket.io')
const OctoMahjong = require('./OctoMahjong')

const socketIOWrapper = (server, session) => {

    const io = socketIO(server)

    io.use((socket, next) => {
        session(socket.request, socket.request.res, next)
    })

    OctoMahjong(io.of('/mahjong')) // use namespace '/mahjong' for mahjong server
}
    
module.exports = socketIOWrapper
