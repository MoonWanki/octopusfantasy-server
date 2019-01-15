const router = require('express').Router();
const Post = require('../models/post');

/**
 * Route            Method      Discription
 * 
 * /music           GET         music 조회
 * /:id             GET         특정 포스트 조회
 * /:id/comments    GET         id 포스트 덧글 
 */

// GET: skip번째 최근 MUSIC 또는 모든 MUSIC
router.get('/', (req, res) => {
    console.log("post - get");
    Post.find({})
    .then(posts => res.send(posts))
    .catch(err => res.status(500).send(err));
})

router.get('/music', (req, res) => {
    if(req.query.skip) {
        Post.find({type: "music"})
        .sort({'posted-on': Number(req.query.sort)})
        .skip(Number(req.query.skip))
        .limit(1)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    } else {
        Post.find({type: "music"})
        .sort({'posted-on': Number(req.query.sort)})
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
});

// GET: skip번째 최근 ENTERTAINMENT 또는 모든 ENTERTAINMENT
router.get('/entertainment', (req, res) => {
    if(req.query.skip) {
        Post.find({type: "entertainment"})
        .sort({'posted-on': Number(req.query.sort)})
        .skip(Number(req.query.skip))
        .limit(1)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    } else {
        Post.find({type: "entertainment"})
        .sort({'posted-on': Number(req.query.sort)})
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
});

// GET: skip번째 최근 DAIGASSO 또는 모든 DAIGASSO
router.get('/daigasso', (req, res) => {
    if(req.query.skip) {
        Post.find({type: "daigasso"})
        .sort({'posted-on': Number(req.query.sort)})
        .skip(Number(req.query.skip))
        .limit(1)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    } else {
        Post.find({type: "daigasso"})
        .sort({'posted-on': Number(req.query.sort)})        
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
});

// GET: skip번째 최근 GAME VIDEO 또는 모든 GAME VIDEO
router.get('/gamevideo', (req, res) => {
    if(req.query.skip) {
        Post.find({type: "gamevideo"})
        .sort({'posted-on': Number(req.query.sort)})
        .skip(Number(req.query.skip))
        .limit(1)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    } else {
        Post.find({type: "gamevideo"})
        .sort({'posted-on': Number(req.query.sort)})        
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
});

// GET: skip번째 최근 MR. BLOG 또는 모든 MR. BLOG
router.get('/mrblog', (req, res) => {
    if(req.query.skip) {
        Post.find({type: "mrblog"})
        .sort({'posted-on': Number(req.query.sort)})
        .skip(Number(req.query.skip))
        .limit(1)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    } else {
        Post.find({type: "mrblog"})
        .sort({'posted-on': Number(req.query.sort)})        
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
});

router.post('/likes', (req, res) => {
    Post.findOneAndUpdate(
        { 'id': req.body.pid },
        { $addToSet: {'likes': { 'id': req.body.uid, 'nickname': req.body.nickname }}}
    ).then(post => res.send(post))
    .catch(err => res.status(500).send(err));
})

router.delete('/likes', (req, res) => {
    Post.findOneAndUpdate(
        { 'id': req.body.pid },
        { $pull: {'likes': { 'id': req.body.uid }}}
    ).then(post => res.send(post))
    .catch(err => res.status(500).send(err));
})

router.get('/count', (req, res) => {
    Post.find({ type: req.query.type }).count()
    .then((count)=>res.send({count: count}))
    .catch(err => res.status(500).send(err));
})

router.get('/:id', (req, res) => {
    Post.findOne({id: req.params.id})
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
});

module.exports = router;