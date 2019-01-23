const router = require('express').Router();
const axios = require('axios');

const userapi = require('../api/userapi');
const session = require('../api/loginapi');

router.get('/naver', (req, res) => {
    // 토큰 요청
    // 'code' and 'state' must be in query!
    axios({
        method: 'GET',
        url: `https://nid.naver.com/oauth2.0/token
            ?grant_type=authorization_code
            &client_id=${process.env.NAVER_API_KEY}
            &client_secret=${process.env.NAVER_API_SECRET}
            &redirect_uri=${process.env.NAVER_REDIRECT_URI}
            &code=${req.query.code}
            &state=${req.query.state}`,
        validateStatus: status => status == 200,
    }).then(({ data }) => {
        console.log(data)
        const accessToken = data.access_token

        // 프로필 요청
        return axios({
            method: 'GET',
            url: 'https://openapi.naver.com/v1/nid/me',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            validateStatus: status => status == 200,
        })
    }).then(({ data }) => {
        const profile = {
            id: data.response.id,
            nickname: data.response.nickname,
            profileImage: data.response.profile_image,
            email: data.response.email
        }
    }).then(({profile}) => {
        session.sessionget(profile, req, res);
    }).catch(err => res.sendStatus(401).send(err))
})

router.get('/kakao', (req, res) => {
    // 토큰 요청
    // 'code' must be in query!
    axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_API_KEY,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code: req.query.code,
        },
        validateStatus: status => status == 200,
    }).then(({ data }) => {
        console.log(data)
        const accessToken = data.access_token;

        // 프로필 요청
        return axios({
            method: 'POST',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                'cache-control': 'no-cache',
                'Authorization': 'Bearer ' + accessToken,
                'content-type': 'application/x-www-form-urlencoded',
            },
            validateStatus: status => status == 200,
        })
    }).then(({ data }) => {
        const profile = {
            id: data.id,
            nickname: data.properties.nickname,
            profileImage: data.properties.thumbnail_image,
            email: email || "",
        }
        userapi.userinsert()
        res.send(profile)
    }).catch(err => res.sendStatus(401).send(err))
})

module.exports = router;