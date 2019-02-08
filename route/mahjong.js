const router = require('express').Router()
const MahjongPlayer = require('../models/MahjongPlayer')
const MahjongRecord = require('../models/MahjongRecord')

/* ----------------- PLAYER ----------------- */

router.post('/player', (req, res) => {
    if(req.session.user) {
        const { id } = req.session.user
        const { nickname } = req.body
        MahjongPlayer.createPlayer(id, nickname)
        .then(player => res.send(player))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.get('/player/:id', (req, res) => {
    const { id } = req.params
    MahjongPlayer.getPlayerById(id)
    .then(player => res.send(player))
    .catch(err => res.status(500).send(err))
})

router.put('/player/nickname', (req, res) => {
    if(req.session.user) {
        const { id } = req.session.user
        const { nickname } = req.body
        MahjongPlayer.editNickname(id, nickname)
        .then(player => res.send(player))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.get('/player/:id/record', (req, res) => {
    const { id } = req.params
    MahjongRecord.getRecordsByPlayerId(id)
    .then(records => res.send(records))
    .catch(err => res.status(500).send(err))
})

/* ------------------ RECORD ----------------- */

router.get('/record', (req, res) => {
    MahjongRecord.getAllRecords()
    .then(records => res.send(records))
    .catch(err => res.status(500).send(err))
})

router.get('/record/:id', (req, res) => {
    const { id } = req.params
    MahjongRecord.getRecordById(id)
    .then(record => res.send(record))
    .catch(err => res.status(500).send(err))
})

// For development
router.post('/record', (req, res) => {
    const record = JSON.parse(req.body.record)
    MahjongRecord.addRecord(record)
    .then(record => res.send(record))
    .catch(err => res.status(500).send(err))
})

module.exports = router