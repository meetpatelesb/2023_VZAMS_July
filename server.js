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
app.use(cookieParser());
port = 9584;
// multer use
var multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'twitter'
});

con.connect();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static((__dirname + '/public')));
console.log(__dirname + '/public');



app.get('/', function(req, res) {
    res.render('home', { port });
});

app.get('/search', function(req, res) {
    var search = req.query.search;
    console.log(search + "meet");
    var search_query = `select twitter.profile_master.profile_name,twitter.user_master.user_username from twitter.profile_master left join twitter.user_master on twitter.profile_master.user_id = twitter.user_master.user_id  where twitter.user_master.user_username like '${search}%' or twitter.profile_master.profile_name  like '${search}%'`;
    console.log(search_query);

    con.query(search_query, (err, search_res, field) => {
        res.json({ search_res })
    });

});

// multer start

// upload using MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/meet-vaghasiya/Desktop/VZAMS/project/twitter/public/upload') //folder name
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

// app.get('/upload', (req, res) => {
//     res.render("upload")
// })

//'image' same as the name in input = file

// app.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file.filename + 'filename');
//     res.send("Image Uploaded")
// })

// multer finished


app.post('/tweet', upload.single('image'), function(req, res) {
    var { tweet_text } = req.body;

    console.log(tweet_text + "meeet ");
    console.log(req.file.filename);
    var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id, tweet_image, tweet_image_comp, tweet_video, like_count, tweet_create, tweet_update) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '${req.file.filename}', '${req.file.filename}', '11', '', '')`;
    console.log(tweet_query);

    con
    res.send("Image Uploaded")

});










// port

app.listen(port, (req, res) => {

    console.log('server is running on port ' + port);
});