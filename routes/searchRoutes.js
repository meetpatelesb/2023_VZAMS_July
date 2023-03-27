// Controller

let express = require('express');
let router = express.Router();


const {
    search,
    search_profile
} = require('../controllers/EP_search');

router.get('/search', search);
router.get('/search_profile', search_profile)

module.exports = router;