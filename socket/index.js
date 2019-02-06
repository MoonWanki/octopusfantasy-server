const socket = io => {

    io.on('connection', socket => {

        console.log('New connection!')

    })

}
module.exports = socket