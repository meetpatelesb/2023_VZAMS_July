// Controller
const {
    page_edit,
    page_editdata
} = require('../controllers/EP_EditProfile');
let express = require('express');
let router = express.Router();
let multer = require('../config/multer.js')


router.get('/edit', page_edit);
router.post('/editdata', multer.uplaod_profile.fields([{

    name: 'image',
    maxCount: 1
}, {
    name: 'image_cover',
    maxCount: 1
}]), page_editdata);



module.exports = router;