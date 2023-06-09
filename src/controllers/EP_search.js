const connection = require('../config/connection');
const queryExecute = require('../config/queryExecute');



var search = async function(req, res) {
    var search = req.query.search;

    var search_query = `select profile_master.profile_name,user_master.user_id,profile_master.profile_image,user_master.user_username from profile_master left join user_master on profile_master.user_id = user_master.user_id  where user_master.user_username like '%${search}%' or profile_master.profile_name  like '%${search}%'`;
    // `SELECT profile_name,profile_image,a.user_id,follow_uid,followers_uid,follow_flag from user_master a,profile_master b, follow_master c where a.user_id=b.user_id and b.user_id=c.follow_uid;`

    var search_res = await queryExecute(search_query);
    if (!(search_res.length == 0)) {
        res.json({ status: 200, search_res });
    } else {
        res.json({ status: 404 });
    }

}


module.exports = { search };