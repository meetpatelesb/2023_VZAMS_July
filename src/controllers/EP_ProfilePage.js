const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');


let fetch_tweets = async(req, res) => {

    res.json({ done: 'done' });

}

let fetch_retweets = async(req, res) => {

    console.log(req.session.user_id);
    res.json({ done: 'done' });

}

var fetch_follow = async(req, res) => {
    var user_id = req.session.user_id;
    var follow_id = req.query.follow_id;


    var check_data = `select * from follow_master where followers_uid = ${follow_id} and follow_uid = ${user_id};`;
    var check_data_res = await queryExecute(check_data);
    if (check_data_res[0] != undefined) {
        if (check_data_res[0].follow_flag == 1) {
            var update_flag1 = `update follow_master set follow_flag  = 0 where followers_uid = ${follow_id} and follow_uid = ${user_id};`
            var res_u_flag1 = await queryExecute(update_flag1);
        } else if (check_data_res[0].follow_flag == 0) {
            var update_flag0 = `update follow_master set follow_flag  = 1 where followers_uid = ${follow_id} and follow_uid = ${user_id};`
            var res_u_flag0 = await queryExecute(update_flag0);
        }
    } else {

        var insert_follow_data = `INSERT INTO follow_master ( follow_uid, followers_uid, follow_flag) VALUES ( ${user_id}, ${follow_id}, '1');`
        var res_insert_f_data = await queryExecute(insert_follow_data);
    }

    res.json({ msg: "followed" });
}






var page_profilePage = async function(req, res) {
    var user_id = req.session.user_id;
    var tweet_id = req.body.tweet_id


    let get_id = `select user_id from profile_master where profile_username = '@${req.params.user_name}'`;
    let sda = await queryExecute(get_id);

    if (sda.length != 0) {

        let user_id = sda[0]['user_id'];
        let sql = `select um.create_date,profile_username,profile_name,profile_bio,profile_following,profile_followers,dob,profile_location from profile_master pm
        join user_master um on pm.user_id = um.user_id
        where um.user_id = ${user_id};
`
        let get_profile = await queryExecute(sql);
        var likes = `select retweet_like_count from tweet_master`;
        var showLikes = await queryExecute(likes);
        var retweet_like_count = showLikes;
        var countcmt = `SELECT comment_count FROM tweet_master order by tweet_create desc;`
        var totalcmt = await queryExecute(countcmt);
        // console.log("totalcmt", countcmt);

        let session_user = `select user_username,user_name from user_master where user_id = ${req.session.user_id}`
        let user_data = await queryExecute(session_user);

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

        var already_liked = `SELECT like_tweet_id from like_master WHERE like_user_id =${user_id} AND activate= 1;`

        var already_liked_result = await queryExecute(already_liked)
        var user_liked = [];

        for (let i = 0; i < already_liked_result.length; i++) {
            user_liked.push(already_liked_result[i].like_tweet_id)
        }

        // who to follow ................................................
        var whofollow_id = `SELECT followers_uid FROM follow_master where follow_flag = '1' and follow_uid=${req.session.user_id} ;`

        console.log(whofollow_id);
        var whoFollow_id = await queryExecute(whofollow_id);


        var ids = "(";
        if (whoFollow_id.length != 0) {
            for (let i = 0; i < whoFollow_id.length; i++) {
                ids += whoFollow_id[i].followers_uid;

                if (i != whoFollow_id.length - 1) {
                    ids += ","
                }
            }
            ids += ")";
            const basic = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} and a.user_id!=${user_id} limit 5;`;
            var whoFollow = await queryExecute(basic);

        } else {
            var with_whofollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id!=${user_id} limit 5;`;
            var whoFollow = await queryExecute(with_whofollow);

        }
        res.render('../src/views/userprofile', { get_profile, user_data, port: process.env.PORT, tweets, retweet_like_count, userLiked, userName, totalcmt, like_count, tweet_id, user_liked, whoFollow });
    };
};
// if (getdata.length == 0) {
//     res.render('../src/views/userprofile', { get_profile, user_data, tweets: get_tweets, btn: 'Following', whoFollow });
// } else {
//     res.render('../src/views/userprofile', { get_profile, user_data, tweets: get_tweets, btn: 'Follow', whoFollow });
// }
// }
// } else {
//     res.render('../src/views/404');
// }
// }
module.exports = {
    page_profilePage,
    fetch_follow,
    fetch_tweets,
    fetch_retweets
}