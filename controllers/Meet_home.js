const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');
const bcrypt = require('bcryptjs');
const { query } = require('../connection/connection');



var page_home = async function(req, res) {
    // var ses_user = req.session.user_id;
    // console.log("ses");
    var showTweet = `SELECT * FROM tweet_master where user_id = '1' order  by tweet_create desc;`;
    // var whoFollow1 = `select c.follow_flag,c.follow_uid, c.followers_uid , b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id left join follow_master c on c.follow_uid = b.user_id where c.follow_flag = 0 or c.follow_flag = 1 ;`;
    // var whoFollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id != 2;`;
    var whofollow_id = `SELECT followers_uid FROM twitter.follow_master where follow_flag = '1';`
    var whoFollow_id = await queryExecute(whofollow_id);
    var tweets = await queryExecute(showTweet);
    // console.log(whoFollow[0]);


    var ids = "(";
    if (whoFollow_id.length != 0) {


        for (let i = 0; i < whoFollow_id.length; i++) {
            console.log(whoFollow_id[i].followers_uid + "f_uid");

            ids += whoFollow_id[i].followers_uid;

            if (i != whoFollow_id.length - 1) {
                ids += ","
            }
        }

        // const userid = ${tokenData.id};

        // ids += ,${userid});
        ids += ")";

        const basic = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id not in${ids} and a.user_id!=2 limit 5;`;
        // console.log(basic);
        var whoFollow = await queryExecute(basic);
        res.render('home', { port: process.env.PORT, tweets, whoFollow });
        // console.log(whoFollow1);
        // const user_data = await getdata(basic);
        // console.log(query);
        // res.render("home", { tokenData, selectData, tweets, user_data, likes, flag, new_user_profile_pic, new_user_name, user_data, count, flag_rewteet })

    } else {
        var with_whofollow = `select  b.profile_name,a.user_id,b.profile_image,a.user_username from profile_master b left join user_master a on b.user_id = a.user_id where a.user_id != 2;`;
        var whoFollow = await queryExecute(with_whofollow);
        res.render('home', { port: process.env.PORT, tweets, whoFollow });
        // console.log(with_whoFollow);
        // console.log("else in folow");
    }
    console.log(ids);


    // var whoFollow = await queryExecute(whoFollow);
    // var whoFollow1 = await queryExecute(whoFollow1);
    // console.log(whoFollow1);
    // console.log(tweets.length);
    // console.log(tweets);

};


var tweet_create = async function(req, res) {

    var { tweet_text } = req.body;

    console.log(tweet_text + "meeet ");
    // console.log(req.file.filename);


    if (req.file != undefined) {
        console.log((req.file.filename).includes('.mp4'));
        if ((req.file.filename).includes('.mp4')) {
            var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id,tweet_video, like_count) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '11')`;

            var tweetResult = await queryExecute(tweet_query);
            console.log('tweet done with image');
            res.redirect('/home');
        } else {
            var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id, tweet_image, like_count) VALUES ( '${tweet_text}', '1', '${req.file.filename}', '11')`;
            var tweetResult = await queryExecute(tweet_query);
            console.log('tweet done with image');
            res.redirect('/home');
        };

    } else {
        var tweet_query = `INSERT INTO tweet_master ( tweet_content, user_id,like_count) VALUES ( '${tweet_text}', '1', '11')`;
        var tweetResult = await queryExecute(tweet_query);
        console.log('tweet done without it');
        res.redirect('/home');
    };


    // res.json({ tweetResult });

};


var follow = async(req, res) => {

    var follow_id = req.query.follow_id;
    // console.log(follow_id + "following");

    var check_data = `select * from follow_master where followers_uid = ${follow_id} and follow_uid = '1';`;
    // console.log(check_data);
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




var unfollow = async(req, res) => {
    var follow_id = req.query.follow_id;
    console.log(follow_id + "unfollow");
    res.json({ msg: "unfollowed" });


}


module.exports = { page_home, tweet_create, follow, unfollow };