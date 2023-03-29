const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/likeRoutes');
const bcrypt = require('bcryptjs');

var fetch_tblue = async(req, res) => {
    console.log('Hello blue');
    res.render('../src/views/tblue.ejs');

}
module.exports = { fetch_tblue };