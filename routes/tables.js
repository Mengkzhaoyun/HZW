var fs = require('fs');

var GTables;
fs.readFile('required/tables.json', 'utf8', (err, data) => {
  if (err) throw err;
  GTables = JSON.parse(data);
});

var GTable = function(pTable) {
  this.IsInit = false;
  this._init(pTable);
}

GTable.prototype = {
  _init: function(pTable) {
    if (this.IsInit) return;
    this.IsInit = true;

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
    if (pTable.FormFields) {
      for (var i = 0; i < pTable.FormFields.length; i++) {
        var pBField = pTable.FormFields[i];
        var pField = pTable.Fields[pBField.Name];
        for (var sFieldProp in pField) {
          if (!pBField[sFieldProp]) pBField[sFieldProp] = pField[sFieldProp];
        }
      }
    }

    for (var sProp in pTable) {
      this[sProp] = pTable[sProp];
    }
  },
  Query_GetDBNames: function() {
    var pHostTable = this;
    var pFields = [];
    for (var sFieldProp in pHostTable.Fields) {
      var pField = pHostTable.Fields[sFieldProp];
      pFields.push(pField.DBName);
    }
    return pFields.join(",");
  },
  Query_GetDBValues: function(pDataRow) {
    var pHostTable = this;
    var pResult = {};
    for (var sFieldProp in pHostTable.Fields) {
      var pField = pHostTable.Fields[sFieldProp];
      pResult[sFieldProp] = pDataRow[pField.DBName];
    }
    return pResult;
  },
  Update_GetDBValues_Primary: function(pJObject) {
    var pHostTable = this;
    //主键有多个字段组成
    if (pHostTable.PrimaryKey.split(",").length > 1) {
      var pSplit = pHostTable.PrimaryKey.split(",");
      var pList = [];
      for (var i = 0; i < pSplit.length; i++) {
        var pField = pHostTable.Fields[pSplit[i].toLowerCase()];
        pList.push(GetDBValue_Set(pField, pJObject));
      }
      return pList.join(' and ');
    }
    //有多个字段可以作为主键使用
    else if (pHostTable.PrimaryKey.split("|").length > 1) {
      var pSplit = pHostTable.PrimaryKey.split("|");
      for (var i = 0; i < pSplit.length; i++) {
        var pField = pHostTable.Fields[pSplit[i].toLowerCase()];
        if (pJObject.hasOwnProperty(pField.Name)) {
          return GetDBValue_Set(pField, pJObject);
        }
      }
      //报错,找不到要更新列表的主键
      throw new ReferenceError(stringHelper("{0} is not a variable in this program.", pHostTable.PrimaryKey));
    }
    else {
      var pField = pHostTable.Fields[pHostTable.PrimaryKey.toLowerCase()];
      return GetDBValue_Set(pField, pJObject);
    }
  },
  Update_GetDBValues_Set: function(pJObject) {
    var pHostTable = this;
    var pResult = [];
    for (var sFieldProp in pHostTable.Fields) {
      if (pHostTable.PrimaryKey.indexOf(sFieldProp) == -1
      &&pJObject.hasOwnProperty(sFieldProp)) {
        var pField = pHostTable.Fields[sFieldProp];
        pResult.push(GetDBValue_Set(pField, pJObject));
      }
    }
    return pResult.join(" , ");
  }
}

stringHelper = require('stringformat');
function GetDBValue_Set(pField, pJObject) {
  switch (pField.Type) {
    case "String":
      return stringHelper("{0}='{1}'", pField.DBName, pJObject[pField.Name]);
    default:
      return stringHelper("{0}={1}", pField.DBName, pJObject[pField.Name]);
  }
}

module.exports.GetTable = function(sTable) {
  var pTable = GTables.Schemas[sTable.toLowerCase()];
  if (!pTable.IsInit) {
    pTable = new GTable(pTable);
    GTables.Schemas[sTable.toLowerCase()] = pTable
  }
  return pTable;
}
    
      