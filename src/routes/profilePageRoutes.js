const { page_profilePage, fetch_tweets, fetch_follow, fetch_retweets } = require('../controllers/EP_ProfilePage');

let express = require('express');
let router = express.Router();



router.post('/fetch/profile_tweets', fetch_tweets);

router.post('/fetch/profile_retweets', fetch_retweets);

router.get('/user/:user_name', page_profilePage);

// router.get('/follow', fetch_follow);
module.exports = router;