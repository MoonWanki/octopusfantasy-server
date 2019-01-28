const router = require('express').Router();
const axios = require('axios');

const userapi = require('../api/userapi');
const session = require('../api/loginapi');

const oauthConfig = {
    NAVER: {
        URL_TOKEN: 'https://nid.naver.com/oauth2.0/token',
        URL_PROFILE: 'https://openapi.naver.com/v1/nid/me',
        API_KEY: process.env.NAVER_API_KEY,
        API_SECRET: process.env.NAVER_API_SECRET,
    },
    KAKAO: {
        URL_TOKEN: 'https://kauth.kakao.com/oauth/token',
        URL_PROFILE: 'https://kapi.kakao.com/v2/user/me',
        API_KEY: process.env.KAKAO_API_KEY,
        API_SECRET: process.env.KAKAO_API_SECRET,
    },
}

router.get('/naver', async (req, res) => {
    const { code, state } = req.query
    const data = await getProfile(oauthConfig.NAVER, code, state)
    const profile = {
        id: data.response.id,
        nickname: data.response.nickname,
        profileImage: data.response.profile_image,
        email: data.response.email
    }
    userapi.userinsertByOauth(profile, req, res) //로그인한 사용자에 대한 insert and update
    console.log("id in cookie : ", req.cookies.sessionId);
    console.log("id in session : ", req.session.id);
    if(req.cookies.sessionId != req.session.id) { //세션 없음
        console.log("i will make you");
        session.sessionGet(profile, req, res);//세션 제공
    }
    res.redirect(state)

})

/* 
router.get('/kakao', async (req, res) => {
    const { code, state } = req.query
    const data = await getProfile(oauthConfig.KAKAO, code, state)
    const profile = {
        id: data.id,
        nickname: data.properties.nickname,
        profileImage: data.properties.thumbnail_image,
        email: data.kakao_account.email,
    }
    console.log(profile)
    userapi.userinsertByOauth(profile, res) //로그인한 사용자에 대한 insert and update
    session.sessionGet(profile, req, res);
    res.redirect(state)
}) */

const getProfile = (config, code, state) => axios({
        method: 'GET',
        url: config.URL_TOKEN,
        params: {
            'grant_type': 'authorization_code',
            'client_id': config.API_KEY,
            'client_secret': config.API_SECRET,
            'code': code,
            'state': encodeURIComponent(state),
        },
        validateStatus: status => status == 200,
    }).then(res => {
        const accessToken = res.data.access_token
        return axios({
            method: 'GET',
            url: config.URL_PROFILE,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            validateStatus: status => status == 200,
        })
    }).then(res => res.data)

module.exports = router;