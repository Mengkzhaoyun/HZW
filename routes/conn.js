var fs = require('fs');

var GConn;

fs.readFile('required/conn.json', 'utf8', (err, data) => {
    if (err) throw err;
    GConn = JSON.parse(data).HZW;
});

module.exports = GConn;