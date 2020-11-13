require("dotenv").config();
const path = require("path");
const favicon = require("express-favicon");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const pg = require("pg");
const app_port = process.env.APP_PORT;

const pool = new pg.Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

var app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(__dirname + "/static/assets/images/favicon.ico"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.render("login");
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    pool.connect(function (err, client, done) {
      if (err) {
        console.log(err);
      } else {
        client.query(
          "SELECT * FROM USERS WHERE username = $1 AND password = $2",
          [username, password],
          function (err, result) {
            done();
            if (err) {
              console.log(err);
              throw err;
            }
            if (result.rowCount > 0) {
              request.session.loggedin = true;
              request.session.username = username;
              response.redirect("home");
            } else {
              response.redirect("401");
            }
            response.end();
          }
        );
      }
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.render("home");
  } else {
    response.redirect("403");
  }
  response.end();
});

app.get("/401", function (request, response) {
  response.render("401");
});

app.get("/403", function (request, response) {
  response.render("403");
});

app.get("/drones", (request, response) => {
  if (request.session.loggedin) {
    response.render("drones");
  } else {
    response.redirect("403");
  }
  response.end();
});

app.get("/flightlog", (request, response) => {
  if (request.session.loggedin) {
    response.render("flightlog");
  } else {
    response.redirect("403");
  }
  response.end();
});

app.get("/adddrone", function (request, response) {
  if (request.session.loggedin) {
    response.render("adddrone");
  } else {
    response.redirect("403");
  }
  response.end();
});

app.post("/adddrone", (req, res) => {
  const data = {
    drone_id: req.body.drone_id,
    drone_name: req.body.drone_name,
    fc: req.body.fc,
    esc: req.body.esc,
    camera: req.body.camera,
  };
  pool.connect((err, client, done) => {
    if (err) {
      res.send("no database connection ...");
      console.log(err);
    }
    const query =
      "INSERT INTO drones(drone_id, drone_name, fc, esc, camera) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      data.drone_id,
      data.drone_name,
      data.fc,
      data.esc,
      data.camera,
    ];

    client.query(query, values, (error, result) => {
      done();
      if (error) {
        console.log(error);
        res.status(400).json({
          error,
        });
      }
      res.redirect("/adddrone");
    });
  });
});

app.get("/addflight", function (request, response) {
  if (request.session.loggedin) {
    response.render("addflight");
  } else {
    response.redirect("403");
  }
  response.end();
});

app.post("/addflight", (req, res) => {
  const data = {
    date: req.body.date,
    place: req.body.place,
    drone_id: req.body.drone_id,
    lipo: req.body.lipo,
    notes: req.body.notes,
  };
  pool.connect((err, client, done) => {
    if (err) {
      res.send("no database connection ...");
      console.log(err);
    }

    const query =
      "INSERT INTO flight_log (date, place, drone_id, lipo, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      data.date,
      data.place,
      data.drone_id,
      data.lipo,
      data.notes,
    ];

    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({
          error,
        });
      }
      res.redirect("/addflight");
    });
  });
});

app.listen(app_port, () =>
  console.log(`... Application running on port: ` + app_port + `...`)
);
