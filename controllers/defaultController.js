var express = require('express');
var router = express.Router();

// Routers
router.get('/', function(req, res) {
  res.render('home');
})

module.exports = router;