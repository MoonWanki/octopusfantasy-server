const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    '_id' : {type : Number, required : true},
    'id' : String,
    'nickname' : String,
    'profileImage' : String,
    'email' : String,
});

module.exports = mongoose.model('user', UserSchema);