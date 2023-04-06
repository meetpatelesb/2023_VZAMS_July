var express = require("express");
var router = express.Router();
var fetch_retweet = require("../controllers/EP_retweet");


router.post("/retweet", fetch_retweet);

module.exports = router;