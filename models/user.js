const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    'id' : String,
    'nickname' : String,
    'profileImage' : String,
    'email' : String,
});

module.exports = mongoose.model('user', UserSchema);