const path = require("path");
const favicon = require("express-favicon");
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pg = require("pg");

const pool = new pg.Pool({
  user: "dbuser",
  database: "rcdb",
  password: "pa88w0rd",
  port: "5432"
});

var app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(__dirname + "/static/assets/images/favicon.ico"));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', function(request, response) {
  response.render('login');
});

app.post('/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    pool.connect(function(err, client, done) {
      if (err) {
        console.log(err)
      } else {
        client.query('SELECT * FROM USERS WHERE username = $1 AND password = $2', [username, password], function(err, result) {
          done();
          if (err) {
            console.log(err);
            throw err;
          }

          if (result.rowCount > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('home');
          } else {
            //response.send('Incorrect Username and/or Password!');
            response.redirect('401');
          }
          response.end();
        });
      }
    });
  } else {
    response.send('Please enter Username and Password!');
    //response.redirect('403');
    response.end();
  }
});

app.get('/home', function(request, response) {
  if (request.session.loggedin) {
    response.render('home');
  } else {
    //response.send('Please login to view this page!');
    response.redirect('403');
  }
  response.end();
});


app.get('/401', function(request, response) {
  response.render('401');
});

app.get('/403', function(request, response) {
  response.render('403');
});

app.listen(3000);
