const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');
const bcrypt = require('bcryptjs')



var page_home = async function(req, res) {

    var showTweet = `SELECT * FROM twitter.tweet_master where user_id = '1' order  by tweet_create desc;`;

    var tweets = await queryExecute(showTweet);
    res.render('homePage', { port: process.env.PORT, tweets });
};

var page_tweet_create = async function(req, res) {

    var { tweet_text } = req.body;

    console.log(tweet_text + "meeet ");

    if (req.file != undefined) {
        console.log((req.file.filename).includes('.mp4'));
        if ((req.file.filename).includes('.mp4')) {
            var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id,tweet_video, like_count) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '11')`;

            var tweetResult = await queryExecute(tweet_query);
            console.log('tweet done with image');
            res.redirect('/homePage');
        } else {
            var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id, tweet_image, like_count) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '11')`;
            var tweetResult = await queryExecute(tweet_query);
            console.log('tweet done with image');
            res.redirect('/homePage');
        };

    } else {
        var tweet_query = `INSERT INTO twitter.tweet_master ( tweet_content, user_id,like_count) VALUES ( '${tweet_text}', '1', '11')`;
        var tweetResult = await queryExecute(tweet_query);
        console.log('tweet done without it');
        res.redirect('/homePage');
    };

};
var fetch_follow = async(req, res) => {

    var follow_id = req.query.follow_id;
    console.log(follow_id + "following");

    var follow_query = `insert into twitter.follow_master(follow_uid,followers_uid,follow_flag) values('1',${follow_id},'1');`;
    console.log(follow_query);
    var followResult = await queryExecute(follow_query);
    res.json({ msg: "followed" });
}

var fetch_unfollow = async(req, res) => {
    var follow_id = req.query.follow_id;
    console.log(follow_id + "unfollow");
    res.json({ msg: "unfollowed" });
}


module.exports = { page_home, page_tweet_create, fetch_follow, fetch_unfollow };