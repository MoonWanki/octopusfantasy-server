const User = require('../models/user');

exports.sessionget = (profile, req, res) => {
    console.log("find complete");
    if(profile.id == user.id && profile.email == user.email) {
        req.session.logined = true;
        req.session.ID = user.ID;
        req.session.email = user.email;
        console.log("login success");
    } else {
        res.send("login failed");
    }
}