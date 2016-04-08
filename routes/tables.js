var fs = require('fs');

var GTables;
fs.readFile('required/tables.json', 'utf8', (err, data) => {
  if (err) throw err;
  GTables = JSON.parse(data);
});

module.exports.GetTable = function(sTable) {
  var pTable = GTables.Schemas[sTable.toLowerCase()];
  return init_Table(pTable);
}

function init_Table(pTable) {
  if (!pTable._IsInit) {
    pTable._IsInit = true;
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
    pTable.Update_GetDBValues_Primary = function(pJObject) {
      var pHostTable = this;
      //主键有多个字段组成
      if (pHostTable.PrimaryKey.split(",").length > 1) {
        var pSplit = pHostTable.PrimaryKey.split(",");
        var pList = [];
        for (var i = 0; i < pSplit.length; i++) {
          var pField = pHostTable.Field[pSplit[i].toLowerCase()];
          pList.push(GetDBValue_Set(pField, pJObject));
        }
        return pList.join(' and ');
      }
      //有多个字段可以作为主键使用
      else if (pHostTable.PrimaryKey.split("|").length > 1) {
        var pSplit = pHostTable.PrimaryKey.split(",");
        for (var i = 0; i < pSplit.length; i++) {
          var pField = pHostTable.Field[pSplit[i].toLowerCase()];
          if(pJObject[pField.Name]){
            return GetDBValue_Set(pField, pJObject);
          }         
        }
        //报错,找不到要更新列表的主键
        throw new ExceptionInformation();
      }
      else {
        var pField = pHostTable.Field[pHostTable.PrimaryKey.toLowerCase()];
        return GetDBValue_Set(pField, pJObject);
      }
    }
    pTable.Update_GetDBValues_Set = function(pJObject) {
      var pHostTable = this;
      var pResult = {};
      for (var sFieldProp in pHostTable.Fields) {
        var pField = pHostTable.Fields[sFieldProp];
        pResult[sFieldProp] = pDataRow[pField.DBName];
      }
      return pResult;
    }
    for (var sProp in pTable.Fields) {
      pTable.Fields[sProp].Name = sProp;
    }
    if (pTable.BootstrapTableFields) {
      for (var i = 0; i < pTable.BootstrapTableFields.length; i++) {
        var pBField = pTable.BootstrapTableFields[i];
        var pField = pTable.Fields[pBField.Name];
        for (var sFieldProp in pField) {
          if (!pBField[sFieldProp]) pBField[sFieldProp] = pField[sFieldProp];
        }
      }
    }
  }
}

var stringHelper = require('stringformat');
function GetDBValue_Set(pField, pJObject) {
  switch (pField.Type) {
    case "String":
      return stringHelper("{0}='{1}'", pField.DBName, pJObject[pField.Name]);
    default:
      return stringHelper("{0}={1}", pField.DBName, pJObject[pField.Name]);
  }
}