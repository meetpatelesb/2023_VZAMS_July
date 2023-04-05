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
var like = require("./src/routes/likeRoutes");
let search = require('./src/routes/searchRoutes');
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



// let sessionCheck = require('./src/middleWare/session')

app.use('/', search);

app.use("/", sessionCheck, editPage);

app.listen(process.env.PORT, () => { console.log('http://localhost:' + process.env.PORT); })