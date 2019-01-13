const router = require('express').Router();
const Game = require('../models/game');

router.post('/', (req, res) => {
    
});

router.get('/', (req, res) => {
    Game.find({})
    .sort({'start_time': -1})
    .then(games => res.send(games))
    .catch(err => res.status(500).send(err));
});

module.exports = router;