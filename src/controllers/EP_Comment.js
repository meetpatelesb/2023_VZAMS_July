const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const { use } = require('../routes/commentRoutes');
const bcrypt = require('bcryptjs');

var fetch_Comment = async(req, res) => {
    var user_id = req.session.user_id;
    // console.log("userme", user_id);
    var cmt = req.body.comment;
    var tweet_id = req.body.tweet_id;
    // console.log("tweet_id", tweet_id);


    var countcm = `SELECT comment_count FROM tweet_master WHERE tweet_id = ${tweet_id};`
    var countex = await queryExecute(countcm);
    var count = countex[0].comment_count;
    // console.log("countcm", countcm);

    //insert comment
    var sql = `insert into comment_master(comment_content,user_id,tweet_id) values('${cmt}','${user_id}','${tweet_id}')`;
    var result = await queryExecute(sql);
    // console.log("inssql", sql);
    count++;
    // console.log(count, "count");


    // show comments
    var showcomment = `SELECT cm.*,um.user_name,um.user_username,pm.profile_image FROM
    comment_master cm join user_master um on
    um.user_id = cm.user_id join profile_master pm on pm.user_id = cm.user_id where tweet_id=${tweet_id} order by comment_create desc;`;
    var comments = await queryExecute(showcomment);
    var countsql = `
                UPDATE tweet_master
                SET comment_count = ${ count }
                WHERE tweet_id = ${ tweet_id };
                `
    var comment_count = await queryExecute(countsql);
    // console.log("que", countsql, comment_count)
    res.json({ comments: comments });
}



var show_Comment = async(req, res) => {
    // console.log("heyy");
    let tweet_id = req.query.id;
    var showcomment = `SELECT cm.*,um.user_name,um.user_username,pm.profile_image FROM
    comment_master cm join user_master um on
    um.user_id = cm.user_id join profile_master pm on pm.user_id = cm.user_id where tweet_id=${tweet_id} order by comment_create desc;`;

    var comments = await queryExecute(showcomment);
    res.json({ comments: comments });
}


module.exports = { fetch_Comment, show_Comment };