var mysql = require('mysql');

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "exercise"
});

module.exports.getUserbyUsername = function(username) {
  var sql = "SELECT username, password from users WHERE username=?";
  return new Promise(function(resolve, reject){
    con.query(sql, [username], function (err, result) {
      if (err) throw err
      else resolve(result[0])
    });
  })
}
