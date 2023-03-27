// Controller

let express = require('express');
let router = express.Router();
let multer = require('../config/multer.js')


const { page_home, page_tweet_create, fetch_follow, fetch_unfollow } = require('../controllers/EP_HomePage');

router.get('/homePage', page_home);

router.post('/tweet', multer.upload.single('image'), page_tweet_create)

router.get('/follow', fetch_follow);

router.get('/unfollow', fetch_unfollow);

module.exports = router;