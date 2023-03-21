// Require LocalFiles
const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');

// Functions

let page_signIn = (req, res) => {
    res.render('signIn')
};

let page_signIn_post = async(req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    var sql = `select user_email from  user_master where user_email="${email}" AND user_password="${pass}"`;
    var result = await queryExecute(sql);
    if (!(result.length == 0)) {
        res.redirect('/home')
    } else {
        res.render('signin.ejs')
    }
}

let fetch_validEmail = async(req, res) => {
    var email = req.body.email;
    var sql = `select user_email from  user_master where user_email="${email}"`;
    var result = await queryExecute(sql);
    if (!(result.length == 0)) {
        res.json({ status: 200 });
    } else {
        res.json({ status: 404 });
    }
}

module.exports = {
    page_signIn,
    page_signIn_post,
    fetch_validEmail,
}