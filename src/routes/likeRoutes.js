let express = require('express');
let router = express.Router();
let multer = require('../config/multer.js')


const { fetch_like } = require('../controllers/EP_like');

router.post("/like", fetch_like);
module.exports = router;