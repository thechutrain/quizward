var express = require('express');

var router = express.Router();

// Routers
router.get('/', function(req, res) {
  res.send('Hello world!');
})

module.exports = router;