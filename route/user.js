const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User.getAllUser()
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    User.getUserById(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
    User.deleteUser(req.params.id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

module.exports = router;