const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    'id': { type: Number, required: true },
    'type': String,
    'title': String,
    'posted-on': Date,
    'video': String,
    'contents': String,
    'comments': [{
        '_id': mongoose.Types.ObjectId,
        'uid': String,
        'commented-on': Date,
        'text': String,
        'valid': Boolean,
        'modified': Boolean,
        'recomments': [{
            '_id': mongoose.Types.ObjectId,
            'uid': String,
            'commented-on': Date,
            'text': String,
            'valid': Boolean,
            'modified': Boolean,
        }],
    }],
    'likes': Array,
})

PostSchema.statics.getPostById = function(id) {
    return this.findOne({ id })
}

PostSchema.statics.getPostsByType = function(type) {
    return this.find({ type })
}

PostSchema.statics.getAllPosts = function() {
    return this.find({})
}

/* --------------- LIKE --------------- */

PostSchema.statics.addLike = function(pid, uid) {
    return this.findOneAndUpdate(
        { 'id': pid },
        { $addToSet: { 'likes': uid } },
    )
}

PostSchema.statics.deleteLike = function(pid, uid) {
    return this.findOneAndUpdate(
        { 'id': pid },
        { $pull: { 'likes': uid } },
    )
}

/* --------------- COMMENT --------------- */

PostSchema.statics.addComment = function(pid, uid, text) {
    return this.findOneAndUpdate(
        { 'id': pid },
        { $push: { 
            'comments': {
                '_id': new mongoose.Types.ObjectId(),
                'uid': uid,
                'commented-on': new Date(),
                'text': text,
                'valid': true,
                'modified': false,
                'recomments': [],
            },
        }},
    )
}

PostSchema.statics.editComment = function(pid, cid, text) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments._id': cid },
        { $set: { 
            'comments.$.text': text,
            'comments.$.modified': true,
        }},
    )
}

PostSchema.statics.deleteComment = function(pid, cid) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments._id': cid },
        { $set: { 
            'comments.$.valid': false,
        }},
    )
}

module.exports = mongoose.model('post', PostSchema);