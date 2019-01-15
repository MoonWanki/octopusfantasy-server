const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    '_id' : {type : Number, required : true},
    'id' : String,
    'nickname' : String,
    'email' : String,
    'profile-image_src' : String,
})

module.exports = mongoose.model('user', UserSchema);