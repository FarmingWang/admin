var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/menu/list');
});

router.get('/admin', function(req, res, next) {
  res.redirect('/admin/menu/list');
});

module.exports = router;
