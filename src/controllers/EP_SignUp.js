// Require Files
const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
// variable

let count = 0;

// Functions

let page_signUp = async (req, res) => {
    res.render('../src/views/signUp');
    
};

let page_signUp_post = async (req, res) => {

    const { name, email, dob, username, psw } = req.body;

    let newPsw = await bcrypt.hash(psw, 10);

    try {
        var user = `INSERT INTO user_master (user_name , user_username, user_email, user_password,user_activation , user_dob) values
            ('${name}','${username}','${email.toLowerCase()}', '${newPsw}', '1','${dob}')`;
        var userInsert = await queryExecute(user);
        insertedUserId = userInsert.insertId;

        let profile = `INSERT INTO profile_master (profile_name,profile_username, user_id,dob) values
            ('${name}','${username}',${insertedUserId},'${dob}')`;
        let result = await queryExecute(profile);

       
        if (!(result)) {
            console.log('No result');
        }
    } catch (err) {
        console.error("Executing Error!");
    }

    res.redirect("/");
}

let fetch_validEmail = async (req, res) => {
    var userEmail = req.body.email;
 

    var query = `select user_email from user_master where user_email = '${userEmail.toLowerCase()}'`;
  
        var result = await queryExecute(query);
        if (result.length != 0) {

            res.json({

                email: userEmail
            })
        }
   

}


let fetch_sendMail = async (req, res) => {

    let email = req.body.email;
   

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
    //     host: 'smtp.gmail.com',
    //     service: 'gmail',
    //     auth: {
    //         user: 'thakoraditya67@gmail.com',
    //         type: 'OAuth2',
    //         clientId: '943582744863-fuigvuqr8cl68stkc6j8pi6e1f6r2pl4.apps.googleusercontent.com',
    //         clientSecret: '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',
    //         refreshToken: '1//04bTcF88AHqZ-CgYIARAAGAQSNwF-L9Irhwx9NRV2OZFO1dB4ZOFgf4ZAMgdKLanOKDfH0LzsoSCBj64IEKUMfFQIeXwLYJLBePM',
    //         accessToken: 'ya29.a0AVvZVspkiKrnikILO8nHR_h8U8BZG1dUu0ekxRLLtaoArZhbO2KNGiGnykXWFeYQL8P8ie-Ag1_drpEUuDQfo5CaG5i6s_UuVkSvTJOzV_nIjo8YccljDZX2EWxCuqJqPVhDuxcqU1GB1T0WAqVrSm_6edhYaCgYKAaISARESFQGbdwaIFhLYQNYeuc2yQo47LDL0jA0163'
    //     },

    // })

    // let info = transport.sendMail({
    //     to: `${email}`,
    //     from: '"Aditya" <thakoraditya67@gmail.com>',
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


    res.json({ send: 'sent', OTP });


};


let fetch_userName = async (req, res) => {
    var userName = req.body.username;
   
    var query = `select user_username from user_master where user_username = '${userName}'`;
  
    var result = await queryExecute(query);
   
    if (result.length != 0) {
        res.json({
            username: result[0].user_username
        })
    }
    else {
        res.json({
            userName
        })
    }

}

module.exports = {
    page_signUp,
    page_signUp_post,
    fetch_validEmail,
    fetch_userName,
    fetch_sendMail
}