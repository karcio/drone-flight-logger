const pg = require("pg");
require("dotenv").config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

function drones(req, res, next) {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query("SELECT * FROM drones", (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        rdrones = res.rows;

        next();
      }
    });
  });
}

function flights(req, res, next) {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query("SELECT * FROM flight_log", (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        rflights = res.rows;

        next();
      }
    });
  });
}

module.exports = { drones, flights };
