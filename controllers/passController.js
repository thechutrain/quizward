var express = require('express');
var bcrypt = require('bcryptjs');
var Models = require('../Models');
var bodyParser = require('body-parser');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);

// lib
var passport = require('../config/passport');

// ============= TESTING ROUTES =========
router.get('/test', (req, res) => {
  // some db query
  Models.User.findAll({}).then((results) => {
    res.json(results);
  });
});

router.get('/session', (req, res) => {
  res.json(req.user);
})

// ======= GET routes ==========
// DEFAULT HOME PAGE
router.get('/', function(req, res) {
  res.render('auth/default', { user: req.user });
});

// LOGIN page
router.get('/login', function(req, res) {
  res.render('auth/login');
});

// REGISTRATION page
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// LOGOUT route
router.get('/signout', function(req, res) {
  console.log('signing out!');
  req.logout();
  res.redirect('/auth');
});


// =========== POST ROUTES ===========
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({ url: '/user/profile' });
});

router.post('/signup', jsonParse, function(req, res) {
  // define variables
  var errors = [];
  var validData, uniqueUser, properHash; // promises 

  // make sure the user is signed out:
  req.logout();

  validData = new Promise(function(resolve, reject) {
    // Check that there is req.username, .password, email!
    if (!req.body.username || !req.body.password || !req.body.email) {
      errors.push('Need a username, password, and email');
      reject('Need a username, password, and email');
    } else {
      resolve('Given valid form data');
    }
  });

  // Check that there are no others with that email
  uniqueUser = new Promise(function(resolve, reject) {
    Models.User.findOne({ where: { email: req.body.email } })
      .then(function(matches) {
        if (matches) {
          errors.push('There is a user with that email already');
          reject('There is a user with that email already');
        }
        resolve('Unique user name');
      })
  });

  // hash the given password using bcrypt
  properHash = new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) reject(err);
      bcrypt.hash(req.body.password, salt, function(hashErr, hash) {
        if (hashErr) reject(hashErr);
        resolve(hash);
      })
    })
  })

  Promise.all([validData, uniqueUser, properHash])
    .then(function(valuesArray) {
      Models.User.create({
          username: req.body.username,
          email: req.body.email,
          password_hash: valuesArray[2],
        })
        // sends redirect url to jQuery
      res.json({ url: 'login' })
    })
    .catch(function(err) {
      console.log('USER WAS NOT CREATED!!!');
      res.json({ errors: errors })
    })
});

module.exports = router;