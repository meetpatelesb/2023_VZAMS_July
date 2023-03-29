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


let page_profilePage = async(req, res) => {


    let get_id = `select user_id from profile_master where profile_username = '@${req.params.user_name}'`;
    let sda = await queryExecute(get_id);

    // who to follow 

    var whofollow_id = `SELECT followers_uid FROM follow_master where follow_flag = '1' and follow_uid = ${req.session.user_id};`

    var whoFollow_id = await queryExecute(whofollow_id);
    var ids = "(";

    if (whoFollow_id.length != 0) {
        for (let i = 0; i < whoFollow_id.length; i++) {
            ids += whoFollow_id[i].followers_uid;
            if (i != whoFollow_id.length - 1) {
                ids += ","
            }
        }
        ids += `,${req.session.user_id})`;
        const basic = `select b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} limit 3;`;

        var whoFollow = await queryExecute(basic);
    }
    // // wtf


    if (sda.length != 0) {

        let user_id = sda[0]['user_id'];
        let sql = `select um.create_date,profile_username,profile_name,profile_bio,profile_following,profile_followers,dob,profile_location from profile_master pm
        join user_master um on pm.user_id = um.user_id
        where um.user_id = ${user_id};
`
        let get_profile = await queryExecute(sql);

        let tweets = `SELECT retweet_like_count,tweet_content,um.user_username,tweet_image,tweet_video,tweet_id,user_name
        FROM tweet_master om 
       join user_master um 
       on um.user_id = om.user_id
        where om.user_id = ${user_id} 
        order by tweet_id desc
         `;

        let get_tweets = await queryExecute(tweets);

        let session_user = `select user_username,user_name from user_master where user_id = ${req.session.user_id}`
        let user_data = await queryExecute(session_user);

        if (user_id == req.session.user_id) {
            res.render('../src/views/userprofile', { get_profile, user_data, tweets: get_tweets, btn: 'Edit Profile', whoFollow });
        } else {

            let getFollowing = `SELECT follow_flag FROM follow_master where follow_uid= ${req.session.user_id} and follow_flag = 0 and followers_uid = ${user_id};`
            console.log(getFollowing);

            let getdata = await queryExecute(getFollowing);

            if (getdata.length == 0) {
                res.render('../src/views/userprofile', { get_profile, user_data, tweets: get_tweets, btn: 'Following', whoFollow });
            } else {
                res.render('../src/views/userprofile', { get_profile, user_data, tweets: get_tweets, btn: 'Follow', whoFollow });
            }
        }
    } else {
        res.render('../src/views/404');
    }
}
module.exports = {
    page_profilePage,
    fetch_follow,
    fetch_tweets,
    fetch_retweets
}