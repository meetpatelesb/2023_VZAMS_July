const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');


var page_home = async function(req, res) {
var user_id = req.session.user_id;

    var likes = `select retweet_like_count from tweet_master`;
    var showLikes = await queryExecute(likes);
    var retweet_like_count = showLikes;

    var already = `select tweet_id from retweet_master where user_id = ${user_id} AND active =  1`
    var alreadyLiked = await queryExecute(already);
    var userLiked = [];
    for(let i=0;i<alreadyLiked.length;i++)
    {
        userLiked.push(alreadyLiked[i].tweet_id);
    }

    var showTweet = `SELECT * FROM tweet_master order by tweet_create desc;`;
    var tweets = await queryExecute(showTweet);

    var user = `select user_name,user_username from user_master where user_id = ${user_id}`;
    var userName = await queryExecute(user);
    res.render('../src/views/homePage', { port: process.env.PORT, tweets , retweet_like_count ,userLiked ,userName});
   
};

var page_tweet_create = async function(req, res) {
    var user_id = req.session.user_id;

    var { tweet_text } = req.body;

    if (req.file != undefined) {
        console.log((req.file.filename).includes('.mp4'));
        if ((req.file.filename).includes('.mp4')) {
    var user_id = req.seesion.user_id;
            var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id,tweet_video, like_count) VALUES ( '${tweet_text}', ${user_id}, '${req.file.filename}', '11')`;

            var tweetResult = await queryExecute(tweet_query);
            
            res.redirect('/homePage');
        } else {
            var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id, tweet_image, like_count) VALUES ( '${tweet_text}', ${user_id}, '${req.file.filename}', '11')`;
            var tweetResult = await queryExecute(tweet_query);
            
            res.redirect('/homePage');
        };

    } else {
        var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id,like_count) VALUES ( '${tweet_text}', ${user_id}, '11')`;
        var tweetResult = await queryExecute(tweet_query);
      
        res.redirect('/homePage');
    };

};
var fetch_follow = async(req, res) => {

    var follow_id = req.query.follow_id;
   

    var follow_query = `insert into follow_master(follow_uid,followers_uid,follow_flag) values('1',${follow_id},'1');`;
   
    var followResult = await queryExecute(follow_query);
    res.json({ msg: "followed" });
}

var fetch_unfollow = async(req, res) => {
    var follow_id = req.query.follow_id;
 
    res.json({ msg: "unfollowed" });
}


module.exports = { page_home, page_tweet_create, fetch_follow, fetch_unfollow };