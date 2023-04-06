const connection = require('../config/connection');
const queryExecute = require('../config/queryExecute');


let follower_show = async(req,res) =>{
    var user_id = req.session.user_id;
    var target_id = req.params.id;

        // following
        var following_display = `select pm.profile_name,pm.profile_username,pm.profile_image,pm.user_id from profile_master pm inner join follow_master fm on pm.user_id = fm.followers_uid where fm.follow_uid = ${target_id} and fm.follow_flag =1;`
        var displayFollowing = await queryExecute(following_display);
       console.log(following_display);


        // followers
        var followers_display = `select profile_name,profile_username,profile_image,user_id from profile_master pm where pm.user_id in(
            select follow_uid from profile_master pm ,follow_master fm where
            pm.user_id = fm.followers_uid and fm.followers_uid = ${target_id} and fm.follow_flag=1)`;
            
            var displayFollower = await queryExecute(followers_display);
        
    console.log(followers_display);
   
    res.render('../src/views/userFollowFollower',{
        displayFollower,
        displayFollowing
    })}



module.exports = {follower_show
};