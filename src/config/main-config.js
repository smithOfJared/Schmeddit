require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");
const User = require("../../src/db/models").User;

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressValidator());
    app.use(session({
     secret: process.env.cookieSecret,
     resave: false,
     saveUninitialized: false,
     cookie: { maxAge: 1.21e+9 }
    }));
   app.use(flash());
   passportConfig.init(app);
   app.use((req,res,next) => {
     res.locals.notice = req.flash("notice");
     next();
   });
   app.use((req,res,next) => {
     if(req.user){
       User.findById(req.user.id)
       .then((user) => {
         res.locals.currentUser = user;
         next();
       });
     } else {
       res.locals.currentUser = null;
       next();
     }
    });
    app.use(express.static(path.join(__dirname, "..", "assets")));
  }
};
