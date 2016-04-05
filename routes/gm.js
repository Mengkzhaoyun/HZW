var express = require('express');
var router = express.Router();

var fs = require('fs');
var GTables = JSON.parse(fs.readFileSync('required/tables.json').toString());
GTables.GetTable = function(sTable) {
    return GTables.Schemas[sTable.toLowerCase()];
}
for (var sProp in GTables.Schemas) {
    var pTable = GTables.Schemas[sProp];
    pTable.Query_GetDBNames = function() {
        var pHostTable = this;
        var pFields = [];
        for (var sFieldProp in pHostTable.Fields) {
            var pField = pHostTable.Fields[sFieldProp];
            pFields.push(pField.DBName);
        }
        return pFields.join(",");
    }
    pTable.Query_GetDBValues = function(pDataRow) {
        var pHostTable = this;
        var pResult = {};
        for (var sFieldProp in pHostTable.Fields) {
            var pField = pHostTable.Fields[sFieldProp];
            pResult[sFieldProp] = pDataRow[pField.DBName];
        }
        return pResult;
    }
    if (pTable.FormFields) {
        for (var i = 0; i < pTable.FormFields.length; i++) {
            var pBField = pTable.FormFields[i];
            var pField = pTable.Fields[pBField.Name];
            for (var sFieldProp in pField) {
                if (!pBField[sFieldProp]) pBField[sFieldProp] = pField[sFieldProp];
            }
        }
    }
}

/* GET admin/Login page. */
router.get('/*', function(req, res, next) {
    var sPage = req.url.split("?")[0];
    if (sPage == "/actor.html") {
        var pTable = GTables.GetTable("user");
        res.render('gm' + sPage, {
            "User": { "Name": "MengkZhaoyun" },
            "Schemas_user": pTable
        });
    }
    else {
        res.render('gm' + sPage, {
            "User": { "Name": "MengkZhaoyun" }
        });
    }
});

module.exports = router;
