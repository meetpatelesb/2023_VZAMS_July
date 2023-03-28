const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/likeRoutes');
const bcrypt = require('bcryptjs');

var fetch_like = async(req, res) => {
    var user_id = req.session.user_id;
    tweet_id = req.body.tweet_id
        // console.log(tweet_id + ' :-tweet_id');

    //count column selection from tweet table ----------------------------------------------
    var tweet_tbl = `SELECT * from tweet_master WHERE tweet_id = '${tweet_id}'`
        // console.log(tweet_tbl, ':- tweet tbl')

    var tweet_tbl_result = await queryExecute(tweet_tbl)
        //console.log(tweet_tbl_result[0].like_count, ' :-like_count')

    l_count = tweet_tbl_result[0].like_count
        // console.log(l_count, ':-like_count')

    //Selecting Like Master queries ---------------------------------------------------
    var like_select = `SELECT * FROM like_master WHERE like_user_id='${user_id}' AND like_tweet_id='${tweet_id}'`
    var select_result = await queryExecute(like_select)

    //dislike update ------------------------------------------------------------------
    if (select_result[0]) {
        if (select_result[0].activate == 1) {
            var like_delete = `UPDATE like_master SET activate='0' WHERE like_tweet_id='${tweet_id}' AND like_user_id='${user_id}'`
            var delete_result = await queryExecute(like_delete)

            l_count -= 1
            var update_tweet_like = `UPDATE tweet_master SET like_count=${l_count} 
                                 WHERE tweet_id = '${tweet_id}'`
                // console.log(update_tweet_like, ':- tweet dislike updated')
            var tweet_like_result = await queryExecute(update_tweet_like)
        }

        //Re-like updation ------------------------------------------------------------
        else if (select_result[0].activate == 0) {
            var like_update = `UPDATE like_master SET activate='1' WHERE like_tweet_id='${tweet_id}' AND like_user_id='${user_id}'`
            var update_result = await queryExecute(like_update)

            l_count += 1
            var update_tweet_like = `UPDATE tweet_master SET like_count=${l_count} 
                                 WHERE tweet_id = '${tweet_id}'`
                // console.log(update_tweet_like, ':- tweet Re-like updated')
            var tweet_like_result = await queryExecute(update_tweet_like)
        }
    }

    //First time liked so, inserted -----------------------------------------------------
    else {
        var insert_like = `insert into like_master(like_user_id,like_tweet_id,activate) 
        values('${user_id}','${tweet_id}','1')`;
        var data_run = await queryExecute(insert_like)

        //inserted like nu count to be increased in TWEET_MASTER table------------------
        l_count += 1
        var update_tweet_like = `UPDATE tweet_master SET like_count=${l_count} 
                                 WHERE tweet_id = '${tweet_id}'`
            // console.log(update_tweet_like, ':- tweet like updated')
        var tweet_like_result = await queryExecute(update_tweet_like)
    }
    res.json({
        l_count
    })
}
module.exports = { fetch_like };