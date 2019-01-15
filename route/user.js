const router = require('express').Router();
const User = require('../models/user');

/*
user CRUD

GET /user
GET /user/:id
POST /user
PUT /user
/DELETE /user/:id
*/

router.get('/', (req, res) => {
    User.find({})
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    console.log(req.params);
    User.findOne({id: req.params.id})
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

module.exports = router;