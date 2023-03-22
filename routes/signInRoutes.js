// Controller
const {
    page_signIn,
    page_signIn_post,
    fetch_validEmail,
} = require('../controllers/EP_signIn');


let express = require('express');
let router = express.Router();

// Endpoints


router.get('/signIn', page_signIn)

router.post('/signIn', page_signIn_post)

router.post('/signin/valid_email', fetch_validEmail);

module.exports = router;