var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var flash = require("connect-flash");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
app.use(require("cookie-parser")());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(
  new LocalStrategy(function(username, password, done) {
    if (username !== "admin" || password !== "admin") {
      return done(null, false, { message: "Incorrect username or password." });
    }
    return done(null, username, password);
  })
);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.set("view engine", "ejs");
app.get("/login", function(req, res) {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

/*
app.get("/", isAuthenticated, function(req, res) {
  res.render("index");
});
//https://stackoverflow.com/questions/41229507/check-if-user-logged-in-by-passport-strategy-different-user-types
function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user.authenticated) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect("/login");
}
*/
app.get("/", function(req, res) {
  res.render("index");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
