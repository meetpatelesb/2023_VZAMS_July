// // functions 


// app.get('/usera', (req, res) => {

//     res.render('otherprofile.ejs');
// })

// app.post('/404', (req, res) => {
//     res.render('404');
// })

// app.get('/user/:user_name', async(req, res) => {
//     let name = req.params.user_name;
//     let checkExists;
//     let sql = `select * from user_master where user_username = '@${name}'`;
//     console.log(sql);
//     checkExists = await queryExecute(sql);

//     if (!(checkExists.length === 0)) {

//         res.render('userprofile')
//             // res.status(200);
//             // res.else({ status: 200, msg: ' ', email: checkExists });

//     } else {
//         res.render('404');
//         // res.status(404);
//         // res.json({ status: 404 });
//     }



// })







// Calling



// Packages

const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
const PORT = process.env.PORT;

// Require Routes
let forgetPassword = require('./routes/forgotPasswordRoutes');
let signUp = require('./routes/signUpRoutes');
let signIn = require('./routes/signInRoutes');
let profilePage = require('./routes/profilePageRoutes');
let homePage = require('./routes/homePageRoutes');


let sessionCheck = require('./middleWare/session')


// ejs templete view engine
app.set('view engine', 'ejs');


// Assets
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/assets", express.static(__dirname + '/public/assets'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/upload", express.static(__dirname + '/public/upload'));
//access body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//access env file
dotenv.config();

// session

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// routes 
app.use('/forget', forgetPassword);
app.use('/', signUp);
app.use('/', signIn);
app.use('/', sessionCheck, profilePage);
app.use('/', sessionCheck, homePage);


app.get('/edit', sessionCheck, (req, res) => {
    res.render('editProfile')
})

app.listen(process.env.PORT, () => { console.log('http://localhost:' + process.env.PORT); })