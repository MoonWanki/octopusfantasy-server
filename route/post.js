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

router.put('/:pid/comment', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        // TODO: check if the comment is made by this user
        const { pid } = req.params
        const { cid, text } = req.body
        Post.editComment(pid, cid, text)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:pid/comment', (req, res) => {
    if(req.session.user) {
        const { id: uid } = req.session.user
        // TODO: check if the comment is made by this user
        const { pid } = req.params
        const { cid } = req.body
        Post.deleteComment(pid, cid)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err))
    } else {
        res.sendStatus(401)
    }
})

module.exports = router