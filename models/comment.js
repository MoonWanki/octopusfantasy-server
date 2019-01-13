const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    'pid': String,
    'uid': String,
    'commented-on': Date,
    'nickname': String,
    'profile-image': String,
    'comment': String,
    'recomments': [{
        'uid': String,
        'recommented-on': Date,
        'nickname': String,
        'profile-image': String,
        'recomment': String,
        'valid': Boolean
    }],
    'valid': Boolean
})

module.exports = mongoose.model('comment', CommentSchema);