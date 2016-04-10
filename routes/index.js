var express = require('express');
var router = express.Router();

var fs = require('fs');
var GTables = require('./tables.js');
var GConn = require('./conn.js');

router.get('/', function(req, res, next) {
  var pData = { "User": { "Name": "MengkZhaoyun" } };
  var sPage = "index.tpl";
  res.render(sPage, pData);
});

router.get('/:page', function(req, res, next) {
  var sPage = req.params.page;
  var pData = { "User": { "Name": "MengkZhaoyun" } };
  if (sPage == "player.html") {
    pData.Schemas_accountinfo = GTables.GetTable("accountinfo");
  }
  else if (sPage == "connect.html") {
    var pHZW = GConn.GetGConn().HZW;
    var pConnInfo = { Rows: [] };
    for (var sProp in pHZW) {
      pConnInfo.Rows.push({ Name: sProp, Alias: sProp, Value: pHZW[sProp] });
    }
    pData.ConnInfo = pConnInfo;
  }
  sPage = sPage.split(".")[0] + ".tpl";
  res.render(sPage, pData);
});

module.exports = router;
