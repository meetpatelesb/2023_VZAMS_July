const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');
var moment = require("moment");
const { query } = require('../config/connection');

var page_home = async function(req, res) {
    var user_id = req.session.user_id;
    var tweet_id = req.body.tweet_id

    var likes = `select retweet_like_count from tweet_master`;
    var showLikes = await queryExecute(likes);
    var retweet_like_count = showLikes;
    var countcmt = `SELECT comment_count FROM tweet_master order by tweet_create desc;`
    var totalcmt = await queryExecute(countcmt);
    // console.log("totalcmt", countcmt);
    let session_user = `select um.user_username,um.user_name,pm.profile_image from user_master um join profile_master pm on um.user_id = pm.user_id  where pm.user_id = ${req.session.user_id};`
    let user_data = await queryExecute(session_user);

    var already = `select tweet_id from retweet_master where user_id = ${user_id} AND active =  1`
    var alreadyLiked = await queryExecute(already);
    var userLiked = [];
    for (let i = 0; i < alreadyLiked.length; i++) {
        userLiked.push(alreadyLiked[i].tweet_id);
    }

    // var showTweet = `SELECT tm.*,um.user_name,um.user_username,pm.profile_image FROM 
    // tweet_master tm join user_master um on 
    // um.user_id = tm.user_id order by tweet_create desc`;
    var showTweet = `SELECT tm.*,um.user_name,um.user_username,pm.profile_image FROM 
    tweet_master tm left join user_master um on 
    um.user_id = tm.user_id left join profile_master as pm on pm.user_id=um.user_id order by  tweet_create desc`;
    var tweets = await queryExecute(showTweet);


    var tweet_create = [];
    for (let i = 0; i < tweets.length; i++) {

        tweet_create.push(moment(tweets[i].tweet_create).fromNow());
    }


    // var user = `select user_name,user_username from user_master where user_id = ${user_id}`;

    var user = `select um.user_name,um.user_username,pm.profile_image from user_master um join profile_master pm where um.user_id = pm.user_id and um.user_id = ${user_id};`;
    var userName = await queryExecute(user);

    //like
    var likeCount = `SELECT like_count from tweet_master;`
    var likeCount_result = await queryExecute(likeCount);
    // // // console.log(likeCount_result);
    var like_count = likeCount_result

    var already_liked = `SELECT like_tweet_id from like_master WHERE like_user_id =${user_id} AND activate= 1;`

    var already_liked_result = await queryExecute(already_liked)
    var user_liked = [];

    for (let i = 0; i < already_liked_result.length; i++) {
        user_liked.push(already_liked_result[i].like_tweet_id)
    }

    // who to follow ................................................
    var user_id = req.session.user_id;
    var whofollow_id = `SELECT followers_uid FROM follow_master where follow_flag = '1' and follow_uid=${user_id} ;`
    var whoFollow_id = await queryExecute(whofollow_id);
    // console.log(whoFollow_id);
    // console.log(whoFollow_id);


    var ids = "(";
    if (whoFollow_id.length != 0) {
        for (let i = 0; i < whoFollow_id.length; i++) {
            ids += whoFollow_id[i].followers_uid;

            if (i != whoFollow_id.length - 1) {
                ids += ","
            }
        }
        ids += `,${req.session.user_id})`;
        const basic = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} and a.user_id!=${user_id} limit 5;`;
        var whoFollow = await queryExecute(basic);

    } else {
        var with_whofollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id!=${user_id} limit 5;`;
        var whoFollow = await queryExecute(with_whofollow);

    }
    res.render('../src/views/homePage', { port: process.env.PORT, tweets, user_data, retweet_like_count, userLiked, userName, tweet_create, totalcmt, like_count, tweet_id, user_liked, whoFollow });
};

var page_tweet_create = async function(req, res) {
    var user_id = req.session.user_id;

    // console.log("tweet creat follow homepage");

    var { tweet_text } = req.body;
    tweet_text = tweet_text.trim();




    if (req.file != undefined) {
        if ((req.file.filename).includes('.mp4')) {

            var user_id = req.session.user_id;
            var tweetResult = connection.query('INSERT INTO tweet_master ( tweet_content, user_id,tweet_video) VALUES (?,?,?)', [tweet_text, user_id, req.file.filename]);
            res.redirect('/homePage');
        } else {
            var tweet_query = connection.query('INSERT INTO tweet_master ( tweet_content, user_id, tweet_image) VALUES (?,?,?)', [tweet_text, user_id, req.file.filename]);
            res.redirect('/homePage');
        };

    } else if (tweet_text.length && (tweet_text != " " || tweet_text != null || tweet_text != undefined)) {

        let tweet_query = connection.query('INSERT INTO tweet_master ( tweet_content, user_id) VALUES (?,?)', [tweet_text, user_id])
        res.redirect('/homePage');
    } else {
        res.redirect('/homePage');

    }

};

// who to follow showings
var fetch_follow = async(req, res) => {
    // console.log("HELLO FOLLOW");
    var user_id = req.session.user_id;
    var follow_id = req.query.follow_id;

    // console.log("fetch follow homepage");
    // console.log(follow_id);
    var check_count = `select a.profile_following, a.profile_followers, a.user_id from profile_master a left join user_master b on a.user_id = b.user_id where a.user_id = ${ user_id };`;

    var update_count_followers = `select a.profile_following, a.profile_followers, a.user_id from profile_master a left join user_master b on a.user_id = b.user_id where a.user_id = ${ follow_id };`
        // console.log(update_count_followers);
    var check_Count = await queryExecute(check_count);
    var check_Count_followers = await queryExecute(update_count_followers);

    var following_count = check_Count[0].profile_following;
    var followers_count = check_Count_followers[0].profile_followers;
    // console.log(following_count, followers_count, "homepage");

    // following counter and followers.......................

    var check_data = `select * from follow_master where followers_uid = ${ follow_id } and follow_uid = ${ user_id };`;
    // console.log("check data: " + check_data);
    var check_data_res = await queryExecute(check_data);
    // console.log(check_data_res[0] != undefined);

    if (check_data_res[0] != undefined) {

        if (check_data_res[0].follow_flag == 1) {
            var update_flag1 = `
            update follow_master set follow_flag = 0 where followers_uid = ${ follow_id }
            and follow_uid = ${ user_id };
            `

            // console.log("update flag1", update_flag1);
            var res_u_flag1 = await queryExecute(update_flag1);


            // following counter
            following_count -= 1;
            var update_count = `
            update profile_master set profile_following = ${ following_count } where user_id = ${ user_id };`;
            // console.log("update_count1: " + update_count);
            var update_Count = await queryExecute(update_count);


            // followers counter
            followers_count -= 1;
            var update_count_followers = `
            update profile_master set profile_followers = ${ followers_count }
            where user_id = ${ follow_id };
            `;
            // console.log("update_count_followers1: " + update_count_followers);
            var update_Count_followers = await queryExecute(update_count_followers);


        } else if (check_data_res[0].follow_flag == 0) {

            var update_flag0 = `
            update follow_master set follow_flag = 1 where followers_uid = ${ follow_id }
            and follow_uid = ${ user_id };
            `;

            // console.log("update_flag0: " + update_flag0);
            var res_u_flag0 = await queryExecute(update_flag0);

            // following counter
            following_count += 1;
            var update_count = `
            update profile_master set profile_following = ${ following_count }
            where user_id = ${ user_id };
            `;
            // console.log("update_count2: " + update_count);
            var update_Count = await queryExecute(update_count);

            // followers counter
            followers_count += 1;
            var update_count_followers = `
            update profile_master set profile_followers = ${ followers_count }
            where user_id = ${ follow_id };
            `;
            // console.log("update_count_followers2: " + update_count_followers);
            var update_Count_followers = await queryExecute(update_count_followers);
        }
    } else {
        // console.log("log else ");

        var insert_follow_data = `
            INSERT INTO follow_master(follow_uid, followers_uid, follow_flag) VALUES(${ user_id }, ${ follow_id }, '1');`
        var res_insert_f_data = await queryExecute(insert_follow_data);


        // following count first
        following_count += 1;
        var insert_count = `
            update profile_master set profile_following = ${ following_count }
            where user_id = ${ user_id };
            `
            // console.log(insert_count);
        var insert_Count = await queryExecute(insert_count);

        // followers count first
        followers_count += 1;
        var insert_count2 = `
            update profile_master set profile_followers = ${ followers_count }
            where user_id = ${ follow_id };
            `
            // console.log(insert_count2);
        var insert_Count2 = await queryExecute(insert_count2);
    }
    let count_follower_page = `select profile_following,profile_followers from profile_master where user_id = ${follow_id}`
    var updated_count_follow = await queryExecute(count_follower_page);

    let session_user_follower_count = `select profile_following from profile_master where user_id = ${req.session.user_id}`
    let session_user_following = await queryExecute(session_user_follower_count);

    let session_user_following_count = session_user_following[0].profile_following;
    let user_following_count = updated_count_follow[0].profile_following;
    var user_followers_count = updated_count_follow[0].profile_followers;
    res.json({ msg: "followed", user_following_count, user_followers_count, session_user_following_count });
    // console.log("user following count" + user_following_count, "    user followers count" + user_followers_count);

}

module.exports = { page_home, page_tweet_create, fetch_follow };