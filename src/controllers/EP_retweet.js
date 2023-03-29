const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/retweetRoutes');


var fetch_retweet = async(req, res) => {
    var user_id = req.session.user_id;
    var tweet_ID = req.body.tweet_id;
    var flag = req.body.flag;
    console.log('USER id', user_id);
    /* Getting  Active column to identified that user retweet a tweet or not*/

    var userActive = `select active from retweet_master where tweet_id = ${tweet_ID} && user_id =${user_id}`;
    console.log(userActive);
    var userData = await queryExecute(userActive);
    /* Getting user ID and Active column to identified that user retweet a tweet or not*/


    /*Get database retweet like query */
    var countRetweet = `select retweet_like_count from tweet_master where tweet_id = ${tweet_ID}`;
    console.log(countRetweet);
    var retweet_like = await queryExecute(countRetweet);
    console.log("RETWEET", retweet_like);
    var count = retweet_like[0].retweet_like_count;
    /*Get database retweet like query */

    var flag = false;

    if (userData.length != 0) {

        if (userData[0].active == '1') {
            count -= 1;
            var deleteRetweet = `delete from retweet_master where tweet_id = ${tweet_ID} && user_id = ${user_id} `;
            await queryExecute(deleteRetweet);

            var insertRtweetCount = `update tweet_master set retweet_like_count = ${count} where tweet_id = '${tweet_ID}'`

            await queryExecute(insertRtweetCount);
            flag = false;
        }
    } else {
        count += 1;
        var insertUsertweet = `insert into retweet_master (tweet_id,user_id,active) values ('${tweet_ID}','${user_id}','1')`;
        console.log(insertUsertweet);

        var userTweet = await queryExecute(insertUsertweet);

        var insertRtweetCount = `update tweet_master set retweet_like_count = ${count} where tweet_id = '${tweet_ID}'`

        var retweetCountExe = await queryExecute(insertRtweetCount);
        flag = true;
    }






    res.json({ count, flag });
}


module.exports = fetch_retweet;