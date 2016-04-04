var express = require('express');
var router = express.Router();

/* GET admin/Login page. */
router.get('/*', function(req, res, next) {
  res.render('static'+req.url);
});

module.exports = router;
