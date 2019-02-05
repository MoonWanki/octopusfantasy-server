const mongoose = require('mongoose');

const MahjongPlayerSchema = new mongoose.Schema({
    'id': String,
    'battleName': String,
    'rate': String,
    'wins': [Number] // [1위 횟수, 2위 횟수, 3위 횟수, 4위 횟수]
})

MahjongPlayerSchema.statics.createPlayer = function(id, battleName) {
    return new this({
        'id': id,
        'battleName': battleName,
        'rate': 1500,
        'wins': [0, 0, 0, 0],
    }).save()
}

MahjongPlayerSchema.statics.getAllPlayers = function() {
    return this.find({})
}

MahjongPlayerSchema.statics.getPlayerById = function(id) {
    return this.find({ 'id': id })
}

MahjongPlayerSchema.statics.applyGameResultPlayer = function(rate, rank) {
    return this.findOneAndUpdate(
        { id: profile.id },
        profile,
        { upsert: true }
    )
}

MahjongPlayerSchema.statics.deletePlayer = function(id) {
    return this.findByIdAndDelete(id)
}

module.exports = mongoose.model('mahjong-player', MahjongPlayerSchema)