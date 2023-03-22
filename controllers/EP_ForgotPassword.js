// Require LocalFiles
const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');


// Global Variable 
let OTP;
let count = 0;

// Functions

let page_forgetPassword = (req, res) => {
    res.render('forgetPassword');
};

let fetch_forgetPassword = async(req, res) => {

    let text = req.body.text_value;
    let sql = '';
    let checkExists;
    if (text.includes('@')) {
        let lowEmail = text.toLowerCase();
        sql = `select user_email from user_master where user_email = '${lowEmail}';`
        checkExists = await queryExecute(sql);
    } else {
        sql = `select user_email from user_master where user_username = '@${text}';`
        checkExists = await queryExecute(sql);
    }
    if (!(checkExists.length === 0)) {

        res.status(200);
        res.json({ status: 200, msg: ' ', email: checkExists[0]['user_email'] });

    } else {
        res.status(404);
        res.json({ status: 404 });
    }
};

let fetch_sendMail = async(req, res) => {

    let toggle = req.body.toggle;

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
    //     to: 'Aditya <>',
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

    res.json({ send: 'sent' });


};

let fetch_emailCheck = async(req, res) => {

    let getotp = req.body.getotp;
    if (getotp == OTP) {
        res.json({ status: 200 });
    } else {
        res.json({ status: 404 });
    }
}

// export

module.exports = {
    page_forgetPassword,
    fetch_forgetPassword,
    fetch_emailCheck,
    fetch_sendMail,
};