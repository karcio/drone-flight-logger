const pg = require("pg");
require("dotenv").config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

function users(req, res, next) {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query("SELECT * FROM users WHERE id = $1", [1], (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        req.users = res.rows[0];

        next();
      }
    });
  });
}

module.exports = users;
