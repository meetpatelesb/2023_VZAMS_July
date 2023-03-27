const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');
const { query } = require('../config/connection');


var page_home = async function(req, res) {
    var user_id = req.session.user_id;

    var likes = `select retweet_like_count from tweet_master`;
    var showLikes = await queryExecute(likes);
    var retweet_like_count = showLikes;

    var already = `select tweet_id from retweet_master where user_id = ${user_id} AND active =  1`
    var alreadyLiked = await queryExecute(already);
    var userLiked = [];
    for (let i = 0; i < alreadyLiked.length; i++) {
        userLiked.push(alreadyLiked[i].tweet_id);
    }

    var showTweet = `SELECT * FROM tweet_master order by tweet_create desc;`;
    var tweets = await queryExecute(showTweet);

    var user = `select user_name,user_username from user_master where user_id = ${user_id}`;
    var userName = await queryExecute(user);

    // who to follow 

    var whofollow_id = `SELECT followers_uid FROM twitter.follow_master where follow_flag = '1';`
    var whoFollow_id = await queryExecute(whofollow_id);


    var ids = "(";
    console.log(whoFollow_id);
    if (whoFollow_id.length != 0) {
        for (let i = 0; i < whoFollow_id.length; i++) {
            console.log(whoFollow_id[i].followers_uid + "f_uid");
            ids += whoFollow_id[i].followers_uid;

            if (i != whoFollow_id.length - 1) {
                ids += ","
            }
        }
        ids += ")";
        const basic = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} and a.user_id!=2 limit 5;`;
        var whoFollow = await queryExecute(basic);

    } else {
        var with_whofollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id != 2 and a.user_id!=2 limit 5;`;
        var whoFollow = await queryExecute(with_whofollow);
    }
    console.log("whoFollow", whoFollow);




    res.render('../src/views/homePage', { port: process.env.PORT, tweets, retweet_like_count, userLiked, userName, whoFollow });

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
    var user_id = req.session.user_id;
    var follow_id = req.query.follow_id;


    var check_data = `select * from follow_master where followers_uid = ${follow_id} and follow_uid = '1';`;
    var check_data_res = await queryExecute(check_data);
    // console.log(check_data_res);
    if (check_data_res[0] != undefined) {
        // console.log("data not");
        if (check_data_res[0].follow_flag == 1) {
            var update_flag1 = `update  follow_master set follow_flag  = 0 where followers_uid = ${follow_id} and follow_uid = '1';`

            // console.log(update_flag1);
            var res_u_flag1 = await queryExecute(update_flag1);
            // console.log(res_u_flag1);
        } else if (check_data_res[0].follow_flag == 0) {
            var update_flag0 = `update  follow_master set follow_flag  = 1 where followers_uid = ${follow_id} and follow_uid = '1';`

            // console.log(update_flag0);
            var res_u_flag0 = await queryExecute(update_flag0);
            // console.log(res_u_flag0);
        }
    } else {

        // console.log("data present");
        var insert_follow_data = `INSERT INTO follow_master ( follow_uid, followers_uid, follow_flag) VALUES ( '1', ${follow_id}, '1');`
            // console.log(insert_follow_data);
        var res_insert_f_data = await queryExecute(insert_follow_data);
        // console.log(res_insert_f_data);

    }
    // var follow_query = `insert into follow_master(follow_uid,followers_uid,follow_flag) values('1',${follow_id},'1');`;
    // console.log(follow_query);
    // var followResult = await queryExecute(follow_query);
    res.json({ msg: "followed" });
}

// var fetch_unfollow = async(req, res) => {
//     var follow_id = req.query.follow_id;
//     res.json({ msg: "unfollowed" });
// }


module.exports = { page_home, page_tweet_create, fetch_follow };