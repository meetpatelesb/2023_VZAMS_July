// Require Files
const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');
const bcrypt = require('bcryptjs');

// Functions

let page_signIn = (req, res) => {
    res.render('signIn')
};

let fetch_signIn_post = async(req, res) => {
    var pass = req.body.pass;
    let email = req.body.email;

    var sql = `select user_password,user_id from user_master where user_email="${email}"`;
    var result = await queryExecute(sql);
    console.log(result[0]['user_password']);
    let passas = await bcrypt.compare(pass, result[0]['user_password']);
    console.log(passas);
    console.log(result[0]['user_id']);

    if ((passas)) {
        req.session.user_id = result[0]['user_id']

        res.json({ status: 200 })

    } else {
        res.json({ status: 400 })
    };

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
    fetch_signIn_post,
    fetch_validEmail,
}