var express = require('express');
var router = express.Router();

/* GET admin/Login page. */
router.get('/*', function(req, res, next) {
  res.render('gm'+req.url,{
      User:{
              "Name":"mengkliubei"
            }});
});

module.exports = router;
