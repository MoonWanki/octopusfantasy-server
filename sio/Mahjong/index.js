const Room = require('./Room')

class Mahjong {

    // io : Object                  namespace instance
    // players : Array<Player>      all players now connected
    // queue : Array<Players>       queue with players now finding matching
    // rooms : Array<Room>          game rooms now running
    // roomIdCounter: Number        room id generator with +1 increasement

    constructor(io) {
        this.io = io
        this.players = new Array()
        this.queue = []
        this.rooms = new Array()
        this.roomIdCounter = 0
    }

    addPlayer(player) {
        // events lobby
        player.socket.on('enter-queue', this.onPlayerEnterQueue)
        player.socket.on('leave-queue', this.onPlayerLeaveQueue)
        // send player's info
        player.socket.emit('player_info', player)
        this.players.push(player)
    }

    findPlayerBySocket(socket) { // find player instance by socket
        return players.find(player => player.socket.id == socket.id)
    }

    onPlayerEnterQueue(socket) { // when player start finding a match
        const player = this.findPlayerBySocket(socket) // get player instance
        if(typeof player != 'undefined' && player.isPlaying == false) {
            this.queue.push(player) // push in the queue

            // if match found
            if(this.queue.length >= 4) {
                const fourPlayers = this.queue.splice(0, 4) // dequeue four players
                const roomId = (roomIdCounter++) % 1024 // generate room id
                fourPlayers.forEach(player => player.socket.join(roomId)) // join sockets into room
                const newRoom = new Room(this, roomId, 0, false, fourPlayers)
                this.rooms.push(newRoom)
            }
        }
    }

    onPlayerLeaveQueue(socket) { // when player cancel finding a match
        const player = this.queue.find(player => player.socket.id == socket.id)
        if(player.isPlaying == false) {
            const idx = this.queue.findIndex(obj => obj == player)
            if(idx != -1) this.queue.splice(idx, 1)
        }
    }

    removeRoom(room) {
        const idx = rooms.findIndex(obj => obj == room)
        if(idx != -1) this.rooms.splice(idx, 1)
    }

    getRooms() {
        return this.rooms
    }
}

module.exports = Mahjong