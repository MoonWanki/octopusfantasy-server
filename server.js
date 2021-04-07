require('dotenv').config()

const http = require('http')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const port = process.env.PORT || 4000

// session for both express and socketIO
const session = expressSession({
    name: 'OctopusFantasy',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
})

// get express app
const app = require('./app')(session)

// create server with express app
const server = http.createServer(app)

// bind with socketIO
const socketIOWrapper = require('./socketio')
socketIOWrapper(server, session)

// run server
server.listen(port, () => console.log(`Server listening on port ${port}`))
