const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    'id' : String,
    'nickname' : String,
    'profileImage' : String,
    'email' : String,
});

UserSchema.statics.getAllUsers = () => {
    return this.find({})
}

UserSchema.statics.getUserById = function(id) {
    return this.find({'id' : id})
}

UserSchema.statics.userUpdate = function(profile, req, res) {
    this.findOneAndUpdate(
        {id : profile.id},
        profile,
        {upsert : true}
    )
}

UserSchema.statics.userDelete = function(id) {
    this.findByIdAndDelete(id)
}

module.exports = mongoose.model('user', UserSchema);