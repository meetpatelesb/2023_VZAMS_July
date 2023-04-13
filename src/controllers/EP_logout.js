const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/likeRoutes');
const bcrypt = require('bcryptjs');
var logout = async(req, res) => {
    res.render('../src/views/logout.ejs');
}
var fetch_logout = async(req, res) => {
    // // console.log('Bye logout');
    // res.render('../src/views/logout.ejs');
    req.session.destroy();
    res.redirect('/')
}
module.exports = { fetch_logout,logout };