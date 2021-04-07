const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

module.exports = session => {
    
    const app = express()

    app.use(session)

    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // DB connection
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(e => console.error(e))

    // security
    app.use(helmet.hidePoweredBy({setTo : 'YouCantSeeMe'}))
    app.use(cors({
        origin: [/localhost/, /octopusfantasy\.com$/],
        credentials: true,
    }))
    
    // routes for rest api
    app.use('/post', require('./route/post'))
    app.use('/mahjong', require('./route/mahjong'))
    app.use('/oauth', require('./route/oauth'))
    app.use('/user', require('./route/user'))

    return app
}
