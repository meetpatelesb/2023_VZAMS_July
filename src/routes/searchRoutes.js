// Controller

let express = require('express');
let router = express.Router();


const {
    search,
    search_profile
} = require('../controllers/EP_search');

router.get('/search', search);


module.exports = router;