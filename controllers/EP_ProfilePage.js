const connection = require('../connection/connection');
const queryExecute = require('../connection/queryExecute');

let page_profilePage = async(req, res) => {

    let user_id = req.session.user_id;

    if (user_id) {
        console.log(user_id)
        let sql = `select user_username,profile_name,profile_bio,profile_following,profile_followers,profile_location
         from profile_master om 
         join user_master um
         on om.user_id = um.user_id
         where om.user_id = ${user_id}
`
        console.log(sql);
        let get_profile = await queryExecute(sql);
        res.render('userprofile', { get_profile });
    } else {
        res.redirect('/');
    }

}


module.exports = {
    page_profilePage
}