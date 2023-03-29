var express = require("express");
var connection = require("../config/connectionDB");
var bcrypt = require('bcryptjs');
var sessions = require('express-session');
var util = require("util");
var router = express.Router();

router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false 
}));

//PUBLIC ROUTE
var queryExecute = util.promisify(connection.query).bind(connection);
router.post("/signup",async (req,res) => {
    var userData = [];
    var body = req.body;
    console.log(body);
    for (const i in body) {
        userData.push(body[i]);
    }
    var psw = userData[5];
    console.log(psw);
    let newPsw = await bcrypt.hash(psw, 10);
    console.log(newPsw);
    
    var query = `INSERT INTO user_master (user_username, user_email, user_password,user_activation , user_dob) VALUES
    ('${userData[4]}','${userData[1]}', '${newPsw}', '1','${userData[2]}')`;
    console.log(query);
    try{
        var result = await queryExecute(query);
        console.log(result);
        if(result)
        {
            req.session.email = userData[1];
            console.log(req.session.email);
        }
    }
    catch(err)
    {
        console.log(err,"Executing Error!");

    }

})


router.post("/valid_email" , async (req , res)=>{
var userEmail = req.body.email;

var query = `select user_email from user_master where user_email = '${userEmail}'`;
console.log(query);

try{
    var result = await queryExecute(query);
        console.log(result);
        if(result.length != 0)
        {  
            var email = result[0].user_email;
            console.log(email);
            res.json({
                email
            })
        }
}
catch(err)
{
    console.log(err,"Executing Error!");

}

})

router.post("/valid_username", async (req ,res)=>{
    var userName = req.body.username;

    var query = `select user_username from user_master where user_username = '${userName}'`;
    console.log(query);
    try{
        var result = await queryExecute(query);
        if(result.length != 0)
        {  
            var username = result[0].user_username;
            console.log(username);
            res.json({
                username
            })
        }
    }
    catch(err)
    {
        console.log(err,"Executing Error!");
    }
    
})
module.exports = router;