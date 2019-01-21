const router = require('express').Router();
const User = require('../models/user');

const userapi = require('../api/userapi')

/*
user CRUD

GET /user
GET /user/:id
POST /user
PUT /user
/DELETE /user/:id
*/

router.get('/', userapi.usergetAll);

router.get('/:id', userapi.usergetbyid);

router.post('/', userapi.userinsert)
//만들어는 두겠지만 user update가 필요한지는 의문
router.put('/:id', userapi.userupdatebyid);

router.delete('/:id', userapi.userdelete);

module.exports = router;