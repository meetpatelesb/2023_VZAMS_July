const { page_profilePage } = require('../controllers/EP_ProfilePage');

let express = require('express');
let router = express.Router();


router.get('/profile', page_profilePage);

module.exports = router;