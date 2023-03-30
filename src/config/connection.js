let mysql = require('mysql2');
let dotenv = require('dotenv');
dotenv.config();

let connect = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})

module.exports = connect;