var express = require('express');
var router = express.Router();

var fs = require('fs');
var GTables = require('tables.js');

router.get('/:page', function(req, res, next) {
    var sPage = req.params.page;
    var pData = { "User": { "Name": "MengkZhaoyun" } };
    if (sPage == "player.html") {
        pData.Schemas_accountinfo = GTables.GetTable("accountinfo");
    }
    sPage = sPage.split(".")[0]+".tpl";    
    res.render(sPage, pData);
});

module.exports = router;
