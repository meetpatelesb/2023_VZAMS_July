var session = require('express-session');

let app = require('express')();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: `daffyduck`,
    secret: 'some-secret-example',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // This will only work if you have https enabled!
        maxAge: 60000 // 1 min
    }
}));
var sessionChecker = (req, res, next) => {
    console.log(`Session Checker: ${req.session.id}`.green);
    console.log(req.session);
    if (req.session.profile) {
        console.log(`Found User Session`.green);
        next();
    } else {
        console.log(`No User Session Found`.red);
        res.redirect('/');
    }
};
module.export = sessionChecker;