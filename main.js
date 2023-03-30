var exp = require('express')
var cookieParser = require('cookie-parser')
var ms = require('mysql2')
var app = exp()
const path = require('path');
var multer = require('multer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { hashSync } = require('bcrypt');
const session = require('express-session');
const { Console } = require('console');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(exp.static(path.join(__dirname, '/public')));
// app.use(exp.static(path.join(__dirname,'/public/css')));
var con = ms.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "twitter"
});
function queryExecutor(query) {
    return new Promise(function (resolve, reject) {
        con.query(query, function (err, result) {
            resolve(result)
        })
    })
};
app.get('/signin', function (req, res) {
    res.render('signin.ejs', { status: "", msg: "" })
});
app.post('/signin', async function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    // console.log(pass);
    // console.log(email);
    var sql = `select * from  user_master where user_email="${email}" AND user_password="${pass}"`;
    var result = await queryExecutor(sql);
    if (!(result.length == 0)) {
        // res.json({ status: 200, msg: ' ' });
        res.redirect('/home')
    } else {
        res.render('signin.ejs', { status: 404, msg: 'password is incorrect!!please try again.' })
        // res.json({status: 404, msg:'password is incorrect!!please try again.'});
    }
})

app.post('/email', async function (req, res) {
    var email = req.body.email;
    // console.log(email);
    var sql = `select * from  user_master where user_email="${email}"`;
    var result = await queryExecutor(sql);
    if (!(result.length == 0)) {
        res.json({ status: 200, msg: '' });
    } else {
        res.json({ status: 404, msg: "Sorry,We couldn't find your email!!" });
    }
})
app.get('/home', async function (req, res) {

    var showTweet = `SELECT * FROM twitter.tweet_master where user_id = '1' order  by tweet_create desc;`;
    var showcomment = `SELECT * FROM twitter.comment_master where user_id = '1' order  by comment_create desc;`;
    var tweets = await queryExecutor(showTweet);
    var comments = await queryExecutor(showcomment);
    console.log(comments.length);
    console.log(comments);
    res.render('home', { tweets,comments});
});

app.get('/search', function (req, res) {

    var search = req.query.search;
    console.log(search + "meet");
    var search_query = `select twitter.profile_master.profile_name,twitter.user_master.user_username from twitter.profile_master left join twitter.user_master on twitter.profile_master.user_id = twitter.user_master.user_id  where twitter.user_master.user_username like '${search}%' or twitter.profile_master.profile_name  like '${search}%'`;
    console.log(search_query);

    con.query(search_query, (err, search_res, field) => {
        res.json({ search_res })
    });

});
app.post('/comment', async function (req, res){
    var cmt = req.body.cmt;
    var sql = `insert into comment_master (comment_content,user_id,tweet_id) values('${cmt}','${1}','${1}')`;
    var result = await queryExecutor(sql);
    console.log(result)
    res.redirect('/home')

})
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


app.post('/tweet', upload.single('image'), function (req, res) {

    var { tweet_text } = req.body;

    console.log(tweet_text + "meeet ");
    // console.log(req.file.filename);

    if (req.file != undefined) {
        var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id, tweet_image, tweet_image_comp, tweet_video, like_count) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '${req.file.filename}', '${req.file.filename}', '11')`;
        con.query(tweet_query, (req, tweetResult) => {
            console.log('tweet done with image');
            res.redirect('/home');
        });
    } else {
        var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id,like_count) VALUES ( '${tweet_text}', '1', '11')`;
        con.query(tweet_query, (req, tweetResult) => {
            console.log('tweet done without it');
            res.redirect('/home');
        });
    }

    // res.json({ tweetResult });

});


// res.render('home');
// console.log(tweet_query);


// res.send("Image Uploaded")


app.post('/tweetshow', function (req, res) {

});


app.get('/tweet', function (req, res) {
    res.redirect('/');

});








app.listen(6060);