// Controller
const {
    page_forgetPassword,
    fetch_forgetPassword,
    fetch_sendMail,
    fetch_emailCheck,
    page_forgetPassword_post
} = require('../controllers/EP_ForgotPassword');


let express = require('express');
let router = express.Router();


// Endpoints

router.get('/forget_password', page_forgetPassword)

router.post('/forgetPassword', page_forgetPassword_post)

router.post('/fetch/forget_password', fetch_forgetPassword)

router.post('/email/send', fetch_sendMail);

router.post('/email/check', fetch_emailCheck)

module.exports = router;