var express = require("express");
var connection = require("../config/connectionDB");
var bcrypt = require('bcryptjs');
var util = require("util");
var router = express.Router();

//PUBLIC ROUTES
var queryExecute = util.promisify(connection.query).bind(connection)
router.post("/signup",async (req,res) => {
    var psw = req.body.psw;
    console.log(psw);
    let newPsw = await bcrypt.hash(psw, 10);
    console.log(newPsw);
    
    var query = `INSERT INTO register (password) VALUES ('${newPsw}')`;
    console.log(query);
    
    res.end("Done");

})
module.exports = router;