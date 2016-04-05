var express = require('express');
var router = express.Router();
var stringHelper = require('stringformat');
var mysql = require('mysql');

var GTables;
var GConn;

var fs = require('fs');

fs.readFile('required/tables.json', 'utf8', (err, data) => {
    if (err) throw err;
    GTables = JSON.parse(data);
});

fs.readFile('required/conn.json', 'utf8', (err, data) => {
    if (err) throw err;
    GConn = JSON.parse(data).HZW;
});

/* Query Table */
router.get('/Tables/:table', function(req, res, next) {
    var sTable = req.params.table;
    if (GTables && GTables.Schemas && GTables.Schemas[sTable]) {
        var pTable = GTables.Schemas[sTable];
        var sSort = req.query["sort"];
        var sOrder = req.query["order"];
        var sLimit = req.query["limit"];
        var sOffset = req.query["offset"];
        var sSearch = req.query["search"];
        var sFilter = req.query["filter"];

        if (sLimit == "ALL") {
            delete sLimit;
        }
        if (sOffset == "NaN") {
            delete sOffset;
        }

        var sSql = stringHelper("select {1} from {0}", pTable.Table, Query_GetAllDBNames(pTable));
        if (sFilter && sFilter.length > 1) {
            sSql = stringHelper("select * from ({0} where {1})", sSql, sFilter);
        }

        if (sSearch && sSearch.length > 1) {
            var pSearchList = [];
            for (var i = 0; i < pTable.Fields.length; i++) {
                var pField = pTable.Fields[i];
                if (!pField.Searchable) continue;
                if (!pField.Domain || pField.Domain.length == 0) {
                    switch (pField.Type.toLowerCase()) {
                        case "string":
                            var sTempSearch = stringHelper(" {0} like '%{1}%' ", pField.DBName, sSearch);
                            pSearchList.push(sTempSearch);
                            break;
                        default:
                            var iTempSearch = stringHelper(" {0} = {1} ", pField.DBName, sSearch);
                            pSearchList.push(sTempSearch);
                            break;
                    }
                }
                else {
                    //..有Domain的时候要特殊处理
                }
            }
            if (pSearchList.length > 0) {
                sSql = stringHelper("select * from ({0}) a where {1}", sSql, pSearchList.join(" or "));
            }
        }

        var sTotalSql = stringHelper("select count(*) from ({0}) a", sSql);

        if (sSort && sOrder) {
            for (var i = 0; i < pTable.Fields.length; i++) {
                var pField = pTable.Fields[i];
                if (pField.Name.toLowerCase() == sSort.toLowerCase()) {
                    sSql = stringHelper("{0} order by {1} {2}", sSql, pField.DBName, sOrder);
                    break;
                }
            }
        }

        if (sOffset || sLimit) {
            var pLimitArray = [];
            if (sOffset) {
                pLimitArray.push(sOffset);
            }
            if (sLimit) {
                pLimitArray.push(sLimit);
            }
            sSql = stringHelper("{0} limit {1}", sSql, pLimitArray.join(","));
        }

        var pResult = {};
        var pConn = mysql.createConnection({
            host: GConn.Server,
            user: GConn.User,
            password: GConn.Password,
            database: pTable.DataBase
        });        
        pConn.connect();        
        pConn.query(sTotalSql, function(err, rows, fields) {
            if (err) {
                pResult["total"] = 0;
                pResult["status"] = "500 Server Internal Error!";
            }
            else {
                pResult["total"] = rows[0]["count(*)"];
            }

        });
        pConn.query(sSql, function(err, rows, fields) {
            if (err) {
                pResult["rows"] = [];
                pResult["status"] = "500 Server Internal Error!";
                res.status(500).json(pResult);
            }
            else {
                var pResult_Rows = [];
                for (var i = 0; i < rows.length; i++) {
                    var pRow = rows[i];
                    pResult_Rows.push(Query_GetDBValues(pTable, pRow));
                }
                pResult["rows"] = pResult_Rows;
                res.json(pResult);
            }
        });
        pConn.end();
        return;
    }

    res.json({ "STATUS": "404 NOT FOUND" });
});

function Query_GetAllDBNames(pTable) {
    var pFields = [];
    for (var i = 0; i < pTable.Fields.length; i++) {
        var pField = pTable.Fields[i];
        pFields.push(pField.DBName);
    }
    return pFields.join(",");
}

function Query_GetDBValues(pTable, pRow) {
    var pResult = {};
    for (var i = 0; i < pTable.Fields.length; i++) {
        var pField = pTable.Fields[i];
        pResult[pField.Name] = pRow[pField.DBName];
    }
    return pResult;
}

/* Query Schema */
router.get('/Schemas/:table', function(req, res, next) {
    var sTable = req.params.table;
    if (GTables && GTables.Schemas && GTables.Schemas[sTable]) {
        var pTableSchema = GTables.Schemas[sTable];
        res.json(pTableSchema);
        return;
    }
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.json({ "STATUS": "404 NOT FOUND" });
});

module.exports = router;
