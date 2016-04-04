var express = require('express');
var router = express.Router();

/* GET admin/Login page. */
router.get('/Login.html', function(req, res, next) {
  res.render('admin/Login.html');
});

/* GET admin/Register page. */
router.get('/Register.html', function(req, res, next) {
  res.render('admin/Register.html');
});

/* GET admin/Register page. */
router.get('/Profile.html', function(req, res, next) {
  res.render('admin/Profile.html');
});

/* GET admin/Register page. */
router.get('/Lockscreen.html', function(req, res, next) {
  res.render('admin/Lockscreen.html');
});

module.exports = router;
