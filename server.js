require("dotenv").config();
const path = require("path");
const favicon = require("express-favicon");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app_port = process.env.APP_PORT;
const users = require("./models/users");
const drones = require("./models/data");

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
app.use(drones);

app.get("/", (req, res) => {
  res.send(req.users);
  //res.send(req.drones);
  console.log(req.drones);
  console.log(req.users);
  res.end();
});

app.listen(app_port, () =>
  console.log(`... Application running on port: ${app_port} ...`)
);
