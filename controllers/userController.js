var express = require('express');
var bodyParser = require('body-parser');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);

/**
 * GET /user --> displays user profile
 * (Later) PUT /user --> updates user profile
 * GET /user/login --> user login page
 * POST /user/login --> trys to login user --> redirects: /user/login OR /user
 * GET /user/signup --> user sign up page
 * POST /user/signup --> trys to makes user --> redirects: /user/signup OR (/user or /user/login)?
 */

// Routers
router.get('/', function(req, res) {
  res.render('user/profile', { user: req.user });
});

router.get('/test', function(req, res) {
  res.render('user/profile', { user: req.user });
});

module.exports = router;