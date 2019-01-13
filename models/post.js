const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    'id': { type: Number, required: true },
    'type': String,
    'title': String,
    'posted-on': Date,
    'video': String,
    'content': String,
    'likes': Array,
})

module.exports = mongoose.model('post', PostSchema);