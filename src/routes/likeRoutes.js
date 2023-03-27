var express = require('express');
var routes = express.Router();
var fetch_like = require("../controllers/EP_like");
var fetch_like = require("../controllers/EP_retweet");

router.post("/", fetch_like)
router.post("/like", fetch_retweet)