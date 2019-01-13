const router = require('express').Router();
const request = require('request');

const redirect_uri = "https://www.octopusfantasy.com/kakaologincallback";

router.get('/access_token', function (req, res) {
    const code = req.query.code;
    console.log(code);
    
    request.post(
        'https://kauth.kakao.com/oauth/token',
        {
            form: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_API_KEY,
                redirect_uri: {redirect_uri},
                code: {code}
            }
        },
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.get('/profile', function (req, res) {

    var request = require('request');
    var accessToken = req.query.access_token;
    console.log(accessToken);
    var options = {
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: { 
            'cache-control': 'no-cache',
            'Authorization': 'Bearer ' + accessToken,
            'content-type': 'application/x-www-form-urlencoded' },
        };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
    });
    
});

module.exports = router;