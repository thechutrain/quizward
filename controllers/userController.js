var express = require('express');
var bodyParser = require('body-parser');

var API = require('../helper/apiQueries');

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
  res.redirect('user/profile');
  // res.render('user/profile', { user: req.user });
});


/** =========== API routes ====================
 */
router.get('/test/profile', function(req, res) {
  if (req.user) {
    var id = req.user.id;
    API.getUser(id).then((result) => {
      res.json(result);
    });
  } else {
    res.json({ error: 'Must sign in' });
  };
});

router.get('/profile', function(req, res) {
  if (req.user) {
    var id = req.user.id;
    Promise.all([
      API.getUser(id),
      API.getUserPosts(id),
      API.getUserQuizMade(id),
      API.getUserQuizTaken(id),
    ]).then((results) => {
      var dataObj = {
        "user": results[0],
        "Posts": results[1],
        "QuizMade": results[2],
        "QuizTaken": results[3],
      };
      // res.json(returnObj);
      res.render('user/profile', dataObj);
    })
  } else {
    res.render('user/profile', { error: 'Must sign in' });
    // res.json({ error: 'Must sign in' });
  };
});


router.get('/profile/json', function(req, res) {
  if (req.user) {
    var id = req.user.id;
    Promise.all([
      API.getUser(id),
      API.getUserPosts(id),
      API.getUserQuizMade(id),
      API.getUserQuizTaken(id),
    ]).then((results) => {
      var dataObj = {
        "User": results[0],
        "Posts": results[1],
        "QuizMade": results[2],
        "QuizTaken": results[3],
      };
      // res.json(returnObj);
      // console.dir(dataObj);
      res.json(dataObj);
    })
  } else {
    res.json({ error: 'Must sign in' });
    // res.json({ error: 'Must sign in' });
  };
});
// 

module.exports = router;