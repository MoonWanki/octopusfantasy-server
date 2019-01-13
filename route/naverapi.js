const router = require('express').Router();
const redirectURI = encodeURI("https://www.octopusfantasy.com/naverlogincallback");

router.get('/access_token', (req, res) => {
    const options = {
        url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code
        &client_id=${process.env.NAVER_API_KEY}
        &client_secret=${process.env.NAVER_API_SECRET}
        &redirect_uri=${redirectURI}
        &code=${req.query.code}
        &state=${req.query.state}`,
        headers: {'X-Naver-Client-Id':process.env.NAVER_API_KEY, 'X-Naver-Client-Secret': process.env.NAVER_API_SECRET}
    };
    const request = require('request');
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.get('/profile', (req, res) => {

    var request = require('request');
    var accessToken = req.query.access_token;
    console.log(accessToken);
    var header = "Bearer " + accessToken; // Bearer 다음에 공백 추가
    var api_url = 'https://openapi.naver.com/v1/nid/me';

    var options = {
        method: 'GET',
        url: api_url,
        headers: {'Authorization': header, 'content-type': 'application/x-www-form-urlencoded'}
    };

    console.log(options);

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
          res.end(body);
        } else {
          console.log('error');
          if(response != null) {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
        }
      });
    
});

module.exports = router;