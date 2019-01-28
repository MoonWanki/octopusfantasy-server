const User = require('../models/user');

exports.sessionGet = (user, req, res) => { //in user, id, email, nickname, profileimage
    req.session.logined = true;
    req.session.ID = user.id;
    req.session.email = user.email;
    console.log(req.session);
    console.log(req.session.cookie);
    //session 생성

    res.cookie('sessionId', `${req.session.id}`, {
        expires : new Date(Date.now() + 90000),
        httpOnly : true
    });
    //cookie 날림
}

exports.sessionOut = (req, res) => {
    //when user request Log-out, session is destroyed
    req.session.destroy(() => {req.session});
}