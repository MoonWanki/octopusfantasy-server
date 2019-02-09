const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

module.exports = session => {
    
    const app = express()

    app.use(session)

    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // DB connection
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(e => console.error(e))

    // security
    app.use(helmet.hidePoweredBy({setTo : 'YouCantSeeMe'}))
    app.use(cors({
        origin: true,
        credentials: true,
    }))
    
    // routes for rest api
    app.use('/post', require('./route/post'))
    app.use('/mahjong', require('./route/mahjong'))
    app.use('/oauth', require('./route/oauth'))
    app.use('/user', require('./route/user'))

    return app
}
