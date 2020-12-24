
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "203.154.83.62",
  user: "loph",
  password: "161042",
  database: "db_loph"
});
con.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = con;
