const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');
const { query } = require('../config/connection');


var page_home = async function(req, res) {
    var user_id = req.session.user_id;
    var tweet_id = req.body.tweet_id

    var likes = `select retweet_like_count from tweet_master`;
    var showLikes = await queryExecute(likes);
    var retweet_like_count = showLikes;
    //comment show
    var countcmt = `SELECT comment_count FROM tweet_master order by tweet_create desc;`
    var totalcmt = await queryExecute(countcmt);
    // console.log("totalcmt", countcmt);

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

    //like
    var likeCount = `SELECT like_count from tweet_master;`
    var likeCount_result = await queryExecute(likeCount);
    // console.log(likeCount_result);
    var like_count = likeCount_result
        // console.log(like_count, ':-Like_count ')

    var already_liked = `SELECT like_tweet_id from like_master WHERE like_user_id =${user_id} AND activate= 1;`

    var already_liked_result = await queryExecute(already_liked)
        // console.log(already_liked_result, "like select")
    var user_liked = [];

    for (let i = 0; i < already_liked_result.length; i++) {
        user_liked.push(already_liked_result[i].like_tweet_id)
    }

    // res.render('../src/views/homePage', { port: process.env.PORT, tweets, retweet_like_count, userLiked, userName, totalcmt, like_count, tweet_id, user_liked, whoFollow: "" });


    // who to follow 
    var user_id = req.session.user_id;
    var whofollow_id = `SELECT followers_uid FROM follow_master where follow_flag = '1' and follow_uid=${user_id} ;`
    var whoFollow_id = await queryExecute(whofollow_id);
    console.log(whoFollow_id);


    var ids = "(";
    // console.log(whoFollow_id);
    if (whoFollow_id.length != 0) {
        for (let i = 0; i < whoFollow_id.length; i++) {
            // console.log(whoFollow_id[i].followers_uid + "f_uid");
            ids += whoFollow_id[i].followers_uid;

            if (i != whoFollow_id.length - 1) {
                ids += ","
            }
        }
        ids += ")";
        const basic = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} and a.user_id!=${user_id} limit 5;`;
        console.log(basic);
        var whoFollow = await queryExecute(basic);
        console.log(whoFollow);

    } else {
        var with_whofollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id!=${user_id} limit 5;`;
        console.log(with_whofollow);
        var whoFollow = await queryExecute(with_whofollow);
        var whoFollow = await queryExecute(with_whofollow);
        console.log();
    }
    // console.log("whoFollow", whoFollow);
    res.render('../src/views/homePage', { port: process.env.PORT, tweets, retweet_like_count, userLiked, userName, totalcmt, like_count, tweet_id, user_liked, whoFollow });


};

var page_tweet_create = async function(req, res) {
    var user_id = req.session.user_id;

    var { tweet_text } = req.body;


    if (req.file != undefined) {
        // console.log((req.file.filename).includes('.mp4'));
        if ((req.file.filename).includes('.mp4')) {
            var user_id = req.seesion.user_id;
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
    console.log(user_id + "user id", follow_id + "follow_id");

    var check_count = ` select a.profile_following,a.profile_followers,a.user_id from profile_master a left join user_master b on a.user_id =b.user_id where a.user_id =${user_id};`;
    console.log(check_count);
    var check_Count = await queryExecute(check_count);
    console.log(check_Count);

    var following_count = check_Count[0].profile_following;
    var followers_count = check_Count[0].profile_followers;
    console.log(following_count, followers_count);


    var check_data = `select * from follow_master where followers_uid = ${follow_id} and follow_uid = ${user_id};`;
    console.log(check_data);
    var check_data_res = await queryExecute(check_data);

    if (check_data_res[0] != undefined) {

        if (check_data_res[0].follow_flag == 1) {
            var update_flag1 = `update  follow_master set follow_flag  = 0 where followers_uid = ${follow_id} and follow_uid = ${user_id};`
            var res_u_flag1 = await queryExecute(update_flag1);
            console.log("prev count" + following_count);

            following_count -= 1;

            var update_count = ` update  profile_master set profile_following = ${following_count} where user_id = ${user_id};`;
            var update_Count = await queryExecute(update_count);
            console.log("current count" + following_count);


        } else if (check_data_res[0].follow_flag == 0) {
            var update_flag0 = `update  follow_master set follow_flag  = 1 where followers_uid = ${follow_id} and follow_uid = ${user_id};`
            var res_u_flag0 = await queryExecute(update_flag0);

            console.log("prev count" + following_count);



            following_count += 1;

            var update_count = ` update  profile_master set profile_following = ${following_count} where user_id = ${user_id};`;
            var update_Count = await queryExecute(update_count);
            console.log("current count" + following_count);
        }
    } else {
        var insert_follow_data = `INSERT INTO follow_master ( follow_uid, followers_uid, follow_flag) VALUES ( ${user_id}, ${follow_id}, '1');`
        var res_insert_f_data = await queryExecute(insert_follow_data);

        var insert_count = `	update  profile_master set profile_following = 1 where user_id = ${user_id};  `
        var insert_Count = await queryExecute(insert_count);

    }
    res.json({ msg: "followed" });
    // res.redirect('/homePage');

    console.log(following_count + "total following");
}

// var fetch_unfollow = async(req, res) => {
//     var follow_id = req.query.follow_id;
//     res.json({ msg: "unfollowed" });
// }


module.exports = { page_home, page_tweet_create, fetch_follow };