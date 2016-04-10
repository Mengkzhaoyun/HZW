var fs = require('fs');
var mysql = require('mysql');

var GConn;

fs.readFile('required/conn.json', 'utf8', (err, data) => {
    if (err) throw err;
    GConn = JSON.parse(data);
});

module.exports.GetGConn = function () { 
  return GConn;
 }

module.exports.createConnection = function (sDataBase) { 
  var pHZW = GConn.HZW;
  return mysql.createConnection({
      host: pHZW.Server,
      user: pHZW.User,
      password: pHZW.Password,
      database: sDataBase
    });
 }