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

        let tweets = `SELECT tweet_content,um.user_username,tweet_image,tweet_video,tweet_id,user_name
        FROM twitter.tweet_master om 
       join user_master um 
       on um.user_id = om.user_id
       where om.user_id = ${user_id}`;

        let get_tweets = await queryExecute(tweets);

        res.render('userprofile', { get_profile, tweets: get_tweets });
    } else {
        res.redirect('/');
    }

}

let fetch_tweets = async(req, res) => {

    console.log(req.session.user_id);
    res.json({ done: 'done' });

}


module.exports = {
    page_profilePage,
    fetch_tweets
}