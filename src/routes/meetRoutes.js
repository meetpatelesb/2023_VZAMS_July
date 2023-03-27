// Controller

let express = require('express');
let router = express.Router();
let multer = require('../config/multer')


const {
    page_home,
    tweet_create,
    follow,
    unfollow
} = require('../controllers/Meet_home');

router.get('/home', page_home);

router.post('/tweet', multer.upload.single('image'), tweet_create)

router.get('/follow', follow);

router.get('/unfollow', unfollow);

module.exports = router;