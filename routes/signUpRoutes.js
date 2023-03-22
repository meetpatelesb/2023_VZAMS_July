// Controller
const {
    page_signUp,
    page_signUp_post,
    fetch_validEmail,
    fetch_userName,
    fetch_sendMail
} = require('../controllers/EP_signUp');


let express = require('express');
let router = express.Router();

// Endpoints

router.get('/signUp', page_signUp)

router.post('/signUp', page_signUp_post)

router.post('/signUp/valid_email', fetch_validEmail);

router.post('/signUp/valid_username', fetch_userName);

router.post('/signup/email/send', fetch_sendMail);

module.exports = router;