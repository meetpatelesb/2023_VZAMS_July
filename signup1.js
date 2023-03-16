var express=require('express')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var bcrypt=require('bcrypt')
var util=require('util')
var jwt=require("jsonwebtoken")
const { json } = require('body-parser')
const { log } = require('console')
var app=express()

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use("/assets",express.static(__dirname + '/public'))


app.listen(8000)

app.get("/signup",(req,res)=>{
    res.render("signup1")
})

console.log("Connected at 8000/signup");