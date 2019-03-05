const router = require('express').Router()
const Post = require('../models/Post')

router.get('/', (req, res) => {
    const { type } = req.query
    if(type) {
        Post.getPostsByType(type)
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err))
    }
    else {
        Post.getAllPosts()
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err))
    }
})

router.get('/:pid', (req, res) => {
    const { pid } = req.params
    Post.getPostById(pid)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err))
})

/* --------------- LIKE --------------- */

router.post('/:pid/like', (req, res) => {
    if(req.session.user) {
        const { pid } = req.params
        const { id: uid } = req.session.user
        Post.addLike(pid, uid)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:pid/like', (req, res) => {
    if(req.session.user) {
        const { pid } = req.params
        const { id: uid } = req.session.user
        Post.deleteLike(pid, uid)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

/* --------------- COMMENT --------------- */

router.post('/:pid/comment', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid } = req.params
        const { text } = req.body
        Post.addComment(pid, uid, text)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.put('/:pid/comment/:cid', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid, cid } = req.params
        const { text } = req.body
        Post.editComment(pid, uid, cid, text)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:pid/comment/:cid', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid, cid } = req.params
        Post.deleteComment(pid, uid, cid)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

/* --------------- RECOMMENT --------------- */

router.post('/:pid/comment/:cid', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid, cid } = req.params
        const { text } = req.body
        Post.addRecomment(pid, uid, cid, text)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.put('/:pid/comment/:cid/:rcid', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid, cid, rcid } = req.params
        const { text } = req.body
        Post.editRecomment(pid, uid, cid, rcid, text)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:pid/comment/:cid/:rcid', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        const { pid, cid, rcid } = req.params
        Post.deleteRecomment(pid, uid, cid, rcid)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

module.exports = router