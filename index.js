require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4500;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch(e => console.error(e));

app.use(cors());

app.use('/post', require('./route/post'));
app.use('/naverapi', require('./route/naverapi'));
app.use('/kakaoapi', require('./route/kakaoapi'));
app.use('/comment', require('./route/comment'));
app.use('/mahjong', require('./route/mahjong'));

app.listen(port, () => console.log(`Server listening on port ${port}`));