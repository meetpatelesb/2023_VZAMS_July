let express = require('express');
let router = express.Router();
let multer = require('../config/multer.js')


const { fetch_logout,logout } = require('../controllers/EP_logout');
router.get('/fetch_logout',logout)
router.get("/logout", fetch_logout);

module.exports = router;