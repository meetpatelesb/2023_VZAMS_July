const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/likeRoutes');
const bcrypt = require('bcryptjs');

var fetch_logout = async(req, res) => {
    // console.log('Bye logout');
    res.render('../src/views/logout.ejs');
    req.session.destroy();
}
module.exports = { fetch_logout };