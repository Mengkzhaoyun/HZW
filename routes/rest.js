var express = require('express');
var router = express.Router();

/* GET admin/Login page. */
router.get('/tables/:table/:id', function(req, res, next) {
    var sTable = req.params.table;
    var sId = req.params.id;
    
  res.render('gm'+req.url,{
      User:{
              "Name":"mengkliubei"
            }});
});

module.exports = router;
