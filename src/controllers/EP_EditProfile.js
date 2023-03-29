const connection = require('../config/connection.js');
const queryExecute = require('../config/queryExecute');
const bcrypt = require('bcryptjs');
const { uplaod_profile } = require('../config/multer.js');


let page_edit = async(req, res) => {
    console.log(req.session.user_id);


    let edit = `select profile_name,profile_cover,profile_image,profile_username,profile_bio,profile_location,dob from 
    profile_master where user_id = ${req.session.user_id}`
    let data = await queryExecute(edit);
    console.log(data);
    res.render('../src/views/editProfile', { data })
};


let page_editdata = async(req, res) => {


    const { name, location, bio, birthdate } = req.body;
    let editdata = `update profile_master set profile_image = '${req.file.filename}', profile_cover = '${req.file.filename}' ,profile_name = '${name}',profile_bio = '${bio}',
    profile_location = '${location}',dob='${birthdate}' where user_id = ${req.session.user_id}`;
    let data = await queryExecute(editdata);

    res.redirect('/user');

}


module.exports = { page_edit, page_editdata };