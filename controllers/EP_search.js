const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');

var search = async function(req, res) {
    var search = req.query.search;
    console.log(search + "meet");

    var search_query = `select twitter.profile_master.profile_name,twitter.user_master.user_id,twitter.profile_master.profile_image,twitter.user_master.user_username from twitter.profile_master left join twitter.user_master on twitter.profile_master.user_id = twitter.user_master.user_id  where twitter.user_master.user_username like '%${search}%' or twitter.profile_master.profile_name  like '%${search}%'`;

    var search_res = await queryExecute(search_query);
    if (!(search_res.length == 0)) {
        res.json({ status: 200, search_res });
    } else {
        res.json({ status: 404 });
    }

}

module.exports = { search };