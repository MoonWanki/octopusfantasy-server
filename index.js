require('dotenv').config();

// module definition
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// module
const app = express();
const port = process.env.PORT || 4500;

//static add
app.use(express.static('public'));

//bodyparser add
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//global promise
mongoose.Promise = global.Promise;

//Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(e => console.error(e));

//session
app.use(session({
    name : 'OctopusyFantasy',
    secret : 'encryptionPrivateKey',
    resave : true,
    saveUninitialized : true,
    store : require('mongoose-session')(mongoose)
}));

//security
    //helmet
app.use(helmet.hidePoweredBy({setTo : 'YouCantSeeMe'}))
    //cors
app.use(cors());

app.use('/post', require('./route/post'));
app.use('/naverapi', require('./route/naverapi'));
app.use('/kakaoapi', require('./route/kakaoapi'));
app.use('/comment', require('./route/comment'));
app.use('/mahjong', require('./route/mahjong'));
app.use('/oauth', require('./route/oauth'))
app.use('/user', require('./route/user'));

app.listen(port, () => console.log(`Server listening on port ${port}`));