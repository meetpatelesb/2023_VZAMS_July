var moment = require("moment");
var exp = require("express");
var app = exp();

app.get("/", (req, res) => {

    var hh = moment('2023-03-27 15:27:59').fromNow();

    console.log(hh);

})


app.listen(8080);