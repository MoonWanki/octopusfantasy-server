const mongoose = require('mongoose')

const MahjongPlayerSchema = new mongoose.Schema({
    'id': String,
    'nickname': String,
    'rate': Number,
    'wins': [Number] // [1위 횟수, 2위 횟수, 3위 횟수, 4위 횟수]
})

MahjongPlayerSchema.statics.createPlayer = function(id, nickname) {
    return new this({
        'id': id,
        'nickname': nickname,
        'rate': 1500,
        'wins': [0, 0, 0, 0],
    }).save()
}

MahjongPlayerSchema.statics.getAllPlayers = function() {
    return this.find({})
}

MahjongPlayerSchema.statics.getPlayerById = function(id) {
    return this.findOne({ id })
}

MahjongPlayerSchema.statics.editNickname = function(id, nickname) {
    return this.findOneAndUpdate(
        { 'id': id },
        { 'nickname': nickname }
    )
}

MahjongPlayerSchema.statics.applyGameResultToPlayer = function(id, rank, rateChanged) {
    return this.findOneAndUpdate(
        { 'id': id },
        {
            $inc: rank===1 ? { 'wins.0': 1, 'rate': rateChanged }
                : rank===2 ? { 'wins.1': 1, 'rate': rateChanged }
                : rank===3 ? { 'wins.2': 1, 'rate': rateChanged }
                : rank===4 ? { 'wins.3': 1, 'rate': rateChanged } : null,
        },
    )
}

MahjongPlayerSchema.statics.deletePlayer = function(id) {
    return this.findOneAndDelete({ 'id': id })
}

module.exports = mongoose.model('mahjong-player', MahjongPlayerSchema)