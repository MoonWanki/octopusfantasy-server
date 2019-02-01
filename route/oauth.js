const router = require('express').Router();
const axios = require('axios');

const oauthConfig = {
    NAVER: {
        URL_TOKEN: 'https://nid.naver.com/oauth2.0/token',
        URL_PROFILE: 'https://openapi.naver.com/v1/nid/me',
        API_KEY: process.env.NAVER_API_KEY,
        API_SECRET: process.env.NAVER_API_SECRET,
        profileParser: data => ({
            id: data.response.id,
            nickname: data.response.nickname,
            profileImage: data.response.profile_image,
            email: data.response.email,
        }),
    },
    KAKAO: {
        URL_TOKEN: 'https://kauth.kakao.com/oauth/token',
        URL_PROFILE: 'https://kapi.kakao.com/v2/user/me',
        API_KEY: process.env.KAKAO_API_KEY,
        API_SECRET: process.env.KAKAO_API_SECRET,
        profileParser: data => ({
            id: data.id,
            nickname: data.properties.nickname,
            profileImage: data.properties.thumbnail_image,
            email: data.kakao_account.email,
        }),
    },
}

router.get('/signin', (req, res) => {
    const { provider, code, state } = req.query
    const config = oauthConfig[provider]
    return axios({
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
    }).then(({ data }) => {
        const accessToken = data.access_token
        return axios({
            method: 'GET',
            url: config.URL_PROFILE,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            validateStatus: status => status == 200,
        })
    }).then(({ data }) => {
        const profile = config.profileParser(data)
        req.session.user = profile
        req.session.save(err => {
            if(err) {
                console.error(err)
                res.status(500).send(err)
            }
            else {
                console.log(req.session.user.nickname + " get signed in")
                res.send(req.session.user)
            }
        })
    })
})

router.get('/profile', (req, res) => {
    if(req.session.user) {
        console.log(req.session.user.nickname + " is signed in now")
        res.status(200).send(req.session.user)
    } else {
        console.log("Unauthorized user")
        res.sendStatus(401)
    }
})

router.get('/signout', (req, res) => {
    console.log(req.session.user.nickname + " has signed out")
    req.session.destroy(err => {
        if(err) res.status(500).send(err)
        else res.sendStatus(200)
    })
})

module.exports = router;