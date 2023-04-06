var express = require('express');
var router =  express.Router();
var {follower_show} = require('../controllers/EP_showFollower');


router.get("/showFollower/:id", follower_show);

module.exports = router;