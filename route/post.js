const router = require('express').Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    const { type } = req.query
    if(type) {
        Post.getPostsByType(Number(type))
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err))
    }
    else {
        Post.getAllPosts()
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
    }
})

router.get('/:pid', (req, res) => {
    const { pid } = req.params
    Post.getPostById(pid)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
});

/* --------------- LIKE --------------- */

router.post('/:pid/likes', (req, res) => {
    const { pid } = req.params
    const { uid } = req.body
    Post.addLike(pid, uid)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
})

router.delete('/:pid/likes', (req, res) => {
    const { pid } = req.params
    const { uid } = req.body
    Post.deleteLike(pid, uid)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
})

/* --------------- COMMENT --------------- */

router.post('/:pid/comment', (req, res) => {
    const { pid } = req.params
    const { uid, text } = req.body
    Post.addComment(pid, uid, text)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err))
})

router.put('/:pid/comment', (req, res) => {
    const { pid } = req.params
    const { uid, cid, text } = req.body
    Post.editComment(pid, cid, text)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err))
})

router.delete('/:pid/comment', (req, res) => {
    const { pid } = req.params
    const { uid, cid } = req.body
    Post.deleteComment(pid, cid)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err))
})

module.exports = router;