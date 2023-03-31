const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');
const { uplaod_profile } = require('../config/multer.js');
let username;

// let page_edit = async(req, res) => {
//     console.log(req.session.user_id);


//     let edit = `select profile_name,profile_cover,profile_image,profile_username,profile_bio,profile_location,dob from 
//     profile_master where user_id = ${req.session.user_id}`
//     let data = await queryExecute(edit);
//     console.log(data);
//     res.render('../src/views/editProfile', { data })
// };


// let page_editdata = async(req, res) => {


//     const { name, location, bio, birthdate } = req.body;
//     let editdata = `update profile_master set profile_image = '${req.file.filename}', profile_cover = '${req.file.filename}' ,profile_name = '${name}',profile_bio = '${bio}',
//     profile_location = '${location}',dob='${birthdate}' where user_id = ${req.session.user_id}`;
//     let data = await queryExecute(editdata);

//     res.redirect('/user');

// }

// const connection = require('../config/connection.js');
// const queryExecute = require('../config/queryExecute');
// const bcrypt = require('bcryptjs');
// const { uplaod_profile } = require('../config/multer.js');


let page_edit = async(req, res) => {
    // console.log(req.session.user_id);


    let edit = `select profile_name,profile_cover,profile_image,profile_username,profile_bio,profile_location,dob from 
    profile_master where user_id = ${req.session.user_id}`
    let data = await queryExecute(edit);
    // console.log(data);
    username = data[0].profile_username.replace('@', '');
    console.log(username);

    res.render('../src/views/editProfile', { data })
};


let page_editdata = async(req, res) => {

    // console.log(req.body);
    var user_id = req.session.user_id;
    const file = req.files;
    // console.log(file);
    var select_profile = `select profile_image as dp ,profile_cover as cover from profile_master where user_id=${user_id}`;
    var users_profile = await queryExecute(select_profile);



    var cover_imgsrc = req.files.image_cover;
    var profile_imgsrc = req.files.image;

    // console.log("COVER", cover_imgsrc);
    // console.log("PROFILE", profile_imgsrc);

    const { name, location, bio, birthdate } = req.body;
    if (cover_imgsrc) {
        cover_imgsrc = file.image_cover[0].filename;
    } else {
        cover_imgsrc = users_profile[0].cover;
    }

    if (profile_imgsrc) {
        profile_imgsrc = file.image[0].filename
    } else {
        profile_imgsrc = users_profile[0].dp
    }


    let editdata = `update profile_master set profile_image = '${profile_imgsrc}', profile_cover = '${cover_imgsrc}' ,profile_name = '${name}',profile_bio = '${bio}',
    profile_location = '${location}',dob='${birthdate}' where user_id = ${req.session.user_id}`;
    // console.log(editdata);
    let data = await queryExecute(editdata);

    res.redirect(`/user/${username}`);
}


module.exports = { page_edit, page_editdata };