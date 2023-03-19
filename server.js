var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var app = express();

app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/assets",express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.render('signup');
})

//Load routes
var userSignup = require("./routes/userSignup.js");
var emailRoute = require("./routes/emailRoute.js");
//Load routes 

app.use("/register",userSignup);


app.use("/email",emailRoute);






app.listen(process.env.PORT,()=>{
    console.log("running 8000");
})