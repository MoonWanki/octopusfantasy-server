const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    'start_time': Date,
    'end_time': Date,
    'players': [{
        'id': String,
        'nickname': String,
        'rating': Number
    }],
    'average': Number,
    'result': [{
        'score': Number,
        'rating': Number
    }],
    'rotations': [{
        'round': Number,
        'counter': Number,
        'start_time': Date,
        'end_time': Date,
        'aborted': String,
        'result': {
            'winner': Number,
            'yakus': [{
                'name': String,
                'han': Number
            }],
            'han_named': String,
            'score': [Number],
        },
    }],
})

module.exports = mongoose.model('game', GameSchema);