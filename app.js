require("dotenv").config();
const path = require("path");
const favicon = require("express-favicon");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const pg = require("pg");
const app_port = process.env.APP_PORT;
const users = require("./models/users");
const droneDatas = require("./models/data");
//const drones = require("./models/data");
//const flights = require("./models/data");

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
app.use(users);
app.use(droneDatas.drones);
app.use(droneDatas.flights);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/auth", (req, res) => {
  res.render("login");
});

app.post("/auth", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    pool.connect((err, client, done) => {
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
              req.session.loggedin = true;
              req.session.username = username;
              res.redirect("home");
            } else {
              res.redirect("401");
            }
            res.end();
          }
        );
      }
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

app.get("/home", (req, res) => {
  if (req.session.loggedin) {
    res.render("home");
  } else {
    res.redirect("403");
  }
  res.end();
});

app.get("/401", (req, res) => {
  res.render("401");
});

app.get("/403", (req, res) => {
  res.render("403");
});

app.get("/drones", (req, res) => {
  if (req.session.loggedin) {
    res.render("drones");
    console.log(rdrones);
  } else {
    res.redirect("403");
  }
  res.end();
});

app.get("/flightlog", (req, res) => {
  if (req.session.loggedin) {
    res.render("flightlog");
    console.log(rflights);
  } else {
    res.redirect("403");
  }
  res.end();
});

app.get("/adddrone", (req, res) => {
  if (req.session.loggedin) {
    res.render("adddrone");
  } else {
    res.redirect("403");
  }
  res.end();
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

app.get("/addflight", (req, res) => {
  if (req.session.loggedin) {
    res.render("addflight");
  } else {
    res.redirect("403");
  }
  res.end();
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
  console.log(`... Application running on port: ${app_port} ...`)
);
