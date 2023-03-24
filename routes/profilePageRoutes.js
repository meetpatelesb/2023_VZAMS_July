const { page_profilePage, fetch_tweets } = require('../controllers/EP_ProfilePage');

let express = require('express');
let router = express.Router();


router.get('/profile', page_profilePage);

router.post('/fetch/profile_tweets', fetch_tweets);

module.exports = router;