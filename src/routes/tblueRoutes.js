let express = require('express');
let router = express.Router();
let multer = require('../config/multer.js')


const { fetch_tblue } = require('../controllers/EP_tblue');

router.get("/tblue", fetch_tblue);

module.exports = router;