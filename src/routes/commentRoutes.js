// Controller

let express = require('express');
let router = express.Router();


const { fetch_Comment, show_Comment } = require('../controllers/EP_Comment');

router.post('/comment', fetch_Comment);

router.get('/comment_show', show_Comment);

module.exports = router;