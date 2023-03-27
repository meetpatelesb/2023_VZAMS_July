// Controller

let express = require('express');
let router = express.Router();


const {
    search
} = require('../controllers/EP_search');

router.get('/search', search);

module.exports = router;