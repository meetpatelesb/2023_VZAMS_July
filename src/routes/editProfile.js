// Controller
const {
    page_edit,
    page_editdata
} = require('../controllers/EP_EditProfile');


let express = require('express');
let router = express.Router();

router.get('/edit', page_edit);
router.post('/editdata', page_editdata)

module.exports = router;