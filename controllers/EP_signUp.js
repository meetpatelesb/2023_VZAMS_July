// Require Files
const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');
const bcrypt = require('bcryptjs')

// variable

let count = 0

// Functions

let page_signUp = async(req, res) => {
    res.render('signUp');
};

let page_signUp_post = async(req, res) => {
    var userData = [];
    var body = req.body;

    console.log(req.body);
    for (const i in body) {
        userData.push(body[i]);
    }

    let email = userData[1].toLowerCase();

    var psw = userData[5];
    let newPsw = await bcrypt.hash(psw, 10);

    var query = `INSERT INTO user_master (user_username, user_email, user_password,user_activation , user_dob) VALUES
    ('@${userData[4]}','${email}', '${newPsw}', '1','${userData[2]}')`;
    console.log(query);
    try {
        var result = await queryExecute(query);
        if (!(result)) {
            console.log('No result');
        }
    } catch (err) {
        console.error("Executing Error!");
    }

    res.redirect('/');
}

let fetch_validEmail = async(req, res) => {
    var userEmail = req.body.email;

    var query = `select user_email from user_master where user_email = '${userEmail}'`;

    try {
        var result = await queryExecute(query);
        if (result.length != 0) {
            var email = result[0].user_email;
            res.json({
                email
            })
        }
    } catch (err) {
        console.error("Executing Error!");
    }

}


let fetch_sendMail = async(req, res) => {

    let email = req.body.email;
    console.log(email);


    if (count == 0) {
        OTP = '';
        for (i = 0; i <= 4; i++) {

            OTP += '' + Math.trunc(Math.random() * 9)
            if (OTP[0] == '0') {
                OTP[0] = '7';
            }
        }
        count = 1;
    }

    console.log(OTP);

    // let transport = nodemailer.createTransport({
    //     host: '',
    //     service: '',
    //     auth: {
    //         type: 'OAuth2',
    //         clientId: '',
    //         clientSecret: '',
    //         refreshToken: '',
    //         accessToken: ''
    //     },

    // })

    // let info = transport.sendMail({
    //     to: `${email}`,
    //     from: 'email',
    //     subject: 'Twitter Verification Code',
    //     text: 'OTP Code',
    //     html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    //     <div style="margin:50px auto;width:70%;padding:20px 0">
    //     <div style="border-bottom:1px solid #EEE">
    //     <a href="" style="font-size:1.4em;color: #00466A;text-decoration:none;font-weight:600">Your Brand</a>
    //     </div>
    //     <p style="font-size:1.1em">Hi,</p>
    //     <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    //     <h2 style="background: #00466A;margin: 0 auto;width: max-content;padding: 0 10px;color: #FFF;border-radius: 4px;">${OTP}</h2>
    //     <p style="font-size:0.9em;">Regards,<br />EsparkBiz</p>
    //     <hr style="border:none;border-top:1px solid #EEE" />
    //     </div>
    //     </div>`
    // })
    console.log(OTP);
    res.json({ send: 'sent', OTP });


};


let fetch_userName = async(req, res) => {
    var userName = req.body.username;

    var query = `select user_username from user_master where user_username = '${userName}'`;
    try {
        var result = await queryExecute(query);
        if (result.length != 0) {
            var username = result[0].user_username;
            res.json({
                username
            })
        }
    } catch (err) {
        console.error("Executing Error!");
    }

}

module.exports = {
    page_signUp,
    page_signUp_post,
    fetch_validEmail,
    fetch_userName,
    fetch_sendMail
}