const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql2 = require('mysql2');
const { ejs } = require('ejs');
var http = require('http');
const { connect } = require('http2');
const bcrypt = require('bcrypt');
// const e = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const queryExecute = require('./connection/queryExecute');
app.use(cookieParser());


// session
var session = require('express-session');
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
}))


// multer use
var multer = require('multer');
const path = require('path');




// middleware





app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static((__dirname + '/public')));
console.log(__dirname + '/public');

// home api 
let meet_home = require('./routes/meetRoutes')
app.use('/', meet_home);

// search api
let search = require('./routes/searchRoutes');
app.use('/', search);


// app.post('/tweetshow', function(req, res) {

// });


// app.get('/tweet', function(req, res) {
//     res.redirect('/');

// });


// port

app.listen(process.env.PORT, (req, res) => {

    console.log('server is running on port ' + process.env.PORT);
});