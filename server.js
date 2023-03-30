// // Packages
// const express = require('express');
// const app = express();
// const bcrypt = require('bcryptjs')
// const dotenv = require('dotenv');
// const bodyparser = require('body-parser');
// const mysql2 = require('mysql2');
// const { ejs } = require('ejs');
// var http = require('http');
// const { connect } = require('http2');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const queryExecute = require('./connection/queryExecute');
// app.use(cookieParser());
// const PORT = process.env.PORT;
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));
// // Require Routes
// // let forgetPassword = require('./routes/forgotPasswordRoutes');
// // let signUp = require('./routes/signUpRoutes');
// // let signIn = require('./routes/signInRoutes');

// // multer use
// var multer = require('multer');
// const path = require('path');

// // ejs templete view engine
// app.set('view engine', 'ejs');


// // Assets
// // app.use("/css", express.static(__dirname + '/public/css'));
// // app.use("/assets", express.static(__dirname + '/public/assets'));
// // app.use("/js", express.static(__dirname + '/public/js'));
// //access body
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }))

// //access env file
// dotenv.config();

// //assests

// app.use(express.static((__dirname + '/public')));
// console.log(__dirname + '/public');

// // home api 
// let meet_home = require('./routes/meetRoutes')
// app.use('/', meet_home);

// // search api
// let search = require('./routes/searchRoutes');
// app.use('/', search);


// // app.post('/tweetshow', function(req, res) {

// // });


// // app.get('/tweet', function(req, res) {
// //     res.redirect('/');

// // });


// // port

// // // functions 


// // app.get('/usera', (req, res) => {

// //     res.render('otherprofile.ejs');
// // })

// // app.post('/404', (req, res) => {
// //     res.render('404');
// // })

// // app.get('/user/:user_name', async(req, res) => {
// //     let name = req.params.user_name;
// //     let checkExists;
// //     let sql = `select * from user_master where user_username = '@${name}'`;
// //     console.log(sql);
// //     checkExists = await queryExecute(sql);

// //     if (!(checkExists.length === 0)) {

// //         res.render('userprofile')
// //             // res.status(200);
// //             // res.else({ status: 200, msg: ' ', email: checkExists });

// //     } else {
// //         res.render('404');
// //         // res.status(404);
// //         // res.json({ status: 404 });
// //     }



// // })







// // Calling



// Packages

const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
const PORT = process.env.PORT;

// Require Routes
let forgetPassword = require('./src/routes/forgotPasswordRoutes');
let signUp = require('./src/routes/signUpRoutes');
let signIn = require('./src/routes/signInRoutes');
let profilePage = require('./src/routes/profilePageRoutes');
let homePage = require('./src/routes/homePageRoutes');
let retweet = require("./src/routes/retweetRoutes.js");
let editPage = require('./src/routes/editProfileRoutes');
var comment = require("./src/routes/commentRoutes");
var like = require("./src/routes/likeRoutes")
var twitterBlue = require("./src/routes/tblueRoutes")
var twitterLogout = require("./src/routes/logoutRoutes")


let sessionCheck = require('./src/middleWare/session')


// ejs templete view engine
app.set('view engine', 'ejs');


// Assets
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/assets", express.static(__dirname + '/public/assets'));
app.use("/images", express.static(__dirname + '/public/images'));
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
app.use("/tweet", retweet);
app.use("/comm", comment);
app.use("/tweet_like", like)
app.use("/tweet_blue", twitterBlue)
app.use("/tweet_logout", twitterLogout)


let search = require('./src/routes/searchRoutes');
// let sessionCheck = require('./src/middleWare/session')

app.use('/', search);

app.use("/", sessionCheck, editPage);

app.listen(process.env.PORT, () => { console.log('http://localhost:' + process.env.PORT); })