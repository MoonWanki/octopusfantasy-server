const User = require('../models/user');

exports.usergetAll = (req, res) => {
    User.find({})
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
};

exports.usergetbyid = (req, res) => {
    console.log(req.params);
    User.findOne({id: req.params.id})
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
};

exports.userinsert = (req, res) => {
    const newUser = new User({
        id : req.body.id,
        nickname : req.body.nickname,
        profileImage : req.body.profileImage
    })
}

exports.userinsertByOauth = (profile, res) => {
    const id = profile.id;
    User.findOne({id : id}, (err, user) => {
        if(err) return res.status(500).send(err);
        if(!user) {
            User.create(profile)
            .then(res.send(profile))
            .catch(err => res.status(500).send(err));
        }
    });
};

exports.userupdatebyid = (req, res) => {
    User.findOneAndUpdate()
}

exports.userdelete = (req, res) => {
    User.findByIdAndDelete(req.param.id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
}