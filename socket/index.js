const MahjongPlayer = require('../models/MahjongPlayer')

let queue = []
let a = 0
let rooms = []

const socket = io => {
    
    io.on('connection', socket => {
        socket.on('enqueue', () => {
            if(!socket.request.session.user) return
            let profile
            MahjongPlayer.getPlayerById(id)
            .then(player => {
                profile = player
            }).catch(err => console.error(err))
            const queueObject = {
                socket: socket,
                player: profile,
            }
            queue.push(queueObject)
            if(queue.length >= 4) {
                const objects = queue.splice(0, 4)
                const players = objects.map(object => object.player)
                objects.forEach(one => {
                    const { socket } = one
                    socket.join(a)
                    socket.emit("find", players)
                })
                const player = {
                    isDealer: false,
                    closed: [],
                    opened: [],
                    riichi: false,
                }
                const room = {
                    no: a,
                    game: {
                        startTime: null,
                        endTime: null,
                        mode: 0,
                        players: players,
                        rotation: {
                            round: 0,
                            counter: 0,
                            riichi: 0,
                            dora: [],
                            uraDora: [],
                            aborted: false,
                            players: [hand, hand, hand, hand],
                        }
                    } 
                }
                rooms.push(room)
                a = (a+1)%1000
            }
        })
    })
}

module.exports = socket