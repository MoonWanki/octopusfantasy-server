const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    'id': { type: Number, required: true },
    'type': String,
    'title': String,
    'posted-on': Date,
    'video': String,
    'contents': String,
    'comments': [{
        'uid': String,
        'commentedOn': Date,
        'text': String,
        'valid': Boolean,
        'modified': Boolean,
        'recomments': [{
            'uid': String,
            'recommentedOn': Date,
            'text': String,
            'valid': Boolean,
            'modified': Boolean,
        }],
    }],
    'likes': Array,
})

PostSchema.virtual('comments.commentedBy', {
    ref: 'user',
    localField: 'comments.uid',
    foreignField: 'id',
    justOne: true,
})

PostSchema.virtual('comments.recomments.recommentedBy', {
    ref: 'user',
    localField: 'comments.recomments.uid',
    foreignField: 'id',
    justOne: true,
})

PostSchema.statics.getPostById = function(id) {
    return this.findOne({ id }).populate('comments.commentedBy').populate('comments.recomments.recommentedBy')
}

PostSchema.statics.getPostsByType = function(type) {
    return this.find({ type }).populate('comments.commentedBy').populate('comments.recomments.recommentedBy')
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
                'uid': uid,
                'commentedOn': new Date(),
                'text': text,
                'valid': true,
                'modified': false,
                'recomments': [],
            },
        }},
    )
}

PostSchema.statics.editComment = function(pid, uid, cid, text) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments.uid': uid, 'comments._id': cid },
        { $set: { 
            'comments.$[c].text': text,
            'comments.$[c].modified': true,
        }},
        { 'arrayFilters': [{ 'c._id': cid }] },
    )
}

PostSchema.statics.deleteComment = function(pid, uid, cid) {
    console.log(pid, uid, cid)
    return this.findOneAndUpdate(
        { 'id': pid, 'comments.uid': uid, 'comments._id': cid },
        { $set: { 
            'comments.$[c].valid': false,
        }},
        { 'arrayFilters': [{ 'c._id': cid }] },
    )
}

/* --------------- RECOMMENT --------------- */

PostSchema.statics.addRecomment = function(pid, uid, cid, text) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments._id': cid },
        { $push: { 
            'comments.$.recomments': {
                'uid': uid,
                'recommentedOn': new Date(),
                'text': text,
                'valid': true,
                'modified': false,
            },
        }},
    )
}

PostSchema.statics.editRecomment = function(pid, uid, cid, rcid, text) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments._id': cid, 'comments.recomments._id': rcid, 'comments.recomments.uid': uid },
        { $set: {
            'comments.$[c].recomments.$[rc].text': text,
            'comments.$[c].recomments.$[rc].modified': true,
        }},
        { 'arrayFilters': [{ 'c._id': cid }, { 'rc._id': rcid }] },
    )
}

PostSchema.statics.deleteRecomment = function(pid, uid, cid, rcid) {
    return this.findOneAndUpdate(
        { 'id': pid, 'comments._id': cid, 'comments.recomments._id': rcid, 'comments.recomments.uid': uid },
        { $set: {
            'comments.$[c].recomments.$[rc].valid': false,
        }},
        { 'arrayFilters': [{ 'c._id': cid }, { 'rc._id': rcid }] },
    )
}

module.exports = mongoose.model('post', PostSchema);