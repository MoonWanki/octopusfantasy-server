const router = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

// 댓글 추가
router.post('/', (req, res) => {    /* pid, uid, nickname, profileImage, comment */
    const newComment = new Comment({
        'pid': req.body.pid,
        'uid': req.body.uid,
        'commented-on': new Date(),
        'nickname': req.body.nickname,
        'profile-image': req.body.profileImage,
        'comment': req.body.comment,
        'recomments': [],
        'valid': true
    });
    newComment.save()
    .then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

// 댓글 수정
router.put('/', (req, res) => {     /* pid, uid, commentedOn, comment */
    Comment.findOneAndUpdate(
        { 'pid': req.body.pid, 'uid': req.body.uid, 'commented-on': new Date(req.body.commentedOn) },
        { $set: { 'comment': req.body.comment } }
    ).then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

// 댓글 삭제
router.delete('/', (req, res) => {
    Comment.findOneAndUpdate(
        { 'pid': req.body.pid, 'uid': req.body.uid, 'commented-on': new Date(req.body.commentedOn) },
        { $set: { 'valid': false } }
    ).then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

// 답글 추가
router.post('/recomment', (req, res) => {    /* pid, parentUid, uid, commentedOn, nickname, profileImage, recomment */
    
    Comment.findOneAndUpdate(
        { 'pid': req.body.pid, 'uid': req.body.parentUid, 'commented-on': new Date(req.body.commentedOn) },
        { $push: {
            'recomments': {
                'uid': req.body.uid,
                'recommented-on': new Date(),
                'nickname': req.body.nickname,
                'profile-image': req.body.profileImage,
                'recomment': req.body.recomment,
                'valid': true  
                }
            }
        }
    ).then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

// 답글 수정
router.put('/recomment', (req, res) => {    /* pid, uid, recommentedOn, recomment */
    Comment.updateOne({
        'pid': req.body.pid,
        'recomments': {
            $elemMatch: { 'uid': req.body.uid, 'recommented-on': new Date(req.body.recommentedOn) }
        }
    },
    { $set: {'recomments.$.recomment': req.body.recomment }}
    ).then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

// 답글 제거
router.delete('/recomment', (req, res) => {  /* pid, uid, recommentedOn */
    Comment.findOneAndUpdate({
        'pid': req.body.pid,
        'recomments': {
            $elemMatch: { 'uid': req.body.uid, 'recommented-on': new Date(req.body.recommentedOn) }
        }
    },
    { $set: { 'recomments.$.valid': false } }
    ).then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
    Comment.find({'pid': req.query.pid })
    .sort({ 'commented-on': 1 })
    .then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

module.exports = router;