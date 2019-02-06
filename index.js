require('dotenv').config()

// module definition
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoStore = require('connect-mongo')(session)
const cors = require('cors')
const helmet = require('helmet')

// module
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const port = process.env.PORT || 4500

//static add
app.use(express.static('public'))

//bodyparser add
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//global promise
mongoose.Promise = global.Promise

//Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(e => console.error(e))

//session
app.use(session({
    name: 'OctopusFantasy',
    secret: 'encryptionPrivateKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: process.env.MONGO_URI,
    }),
}))

//security
    //helmet
app.use(helmet.hidePoweredBy({setTo : 'YouCantSeeMe'}))
    //cors
app.use(cors({
    origin: true,
    credentials: true,
}))

app.use('/post', require('./route/post'))
app.use('/mahjong', require('./route/mahjong'))
app.use('/oauth', require('./route/oauth'))
app.use('/user', require('./route/user'))

require('./socket')(io)

server.listen(port, () => console.log(`Server listening on port ${port}`))