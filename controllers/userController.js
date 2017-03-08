var express = require('express');
var bcrypt = require('bcryptjs');
var Models = require('../Models');

var router = express.Router();

// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/', function(req, res) {
  res.render('user/test');
});

router.get('/test', (req, res) => {
  // some db query
  Models.User.findAll({}).then((results) => {
    res.json(results);
  });
});


// =========== POST ROUTES ===========
// login in post
router.post('/login', (req, res) => {
  Models.User.findOne({ where: { username: req.body.username } })
    .then((match) => {
      if (!match) {
        // No one with that username!
        res.redirect('/user/signin');
      }
      // console.log(match.dataValues);
      return Promise.resolve(match.dataValues);
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        // console.log(`USER: ${user}`);
        bcrypt.compare(req.body.password, user.password_hash, (err, result) => {
          if (result) {
            req.session.logged_in = true;
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.email = user.email;
            resolve();
            console.log('SIGNED IN SUCCESSFULLY');
            res.redirect('/user');
          } else {
            // reject();
            resolve();
            console.log('FAILED TO SIGN IN');
            res.redirect('/user');
          }
        });
      }); // closes promise
    }); //
});

// Create User
router.post('/create', (req, res) => {
  const errors = [];
  // 1. check if a user with username exists
  Models.User.findOne({
      where: { username: req.body.username },
    }).then((matches) => {
      // check to make sure no other username
      if (matches) {
        errors.push('Not a unique username');
      } else {
        Promise.resolve();
      }
    })
    // Check if there's a password, then create hash of password
    .then(() => {
      return new Promise((resolve, reject) => {
        if (!req.body.password) {
          errors.push('Must provide a password');
          reject('You need a password');
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (hashErr, hash) => {
            if (hashErr) {
              errors.push(hashErr);
              reject();
            }
            resolve(hash);
          });
        });
      }); // closes new Promise
    })
    // used hashed password to create a new user.
    .then((hash) => {
      if (errors.length === 0) {
        Models.User.create({
          username: req.body.username,
          email: req.body.email,
          password_hash: hash,
        }).then((user) => {
          // res.json(result);
          req.session.logged_in = true;
          req.session.user_id = user.id;
          req.session.username = user.username;
          // req.session.email= user.email;

          res.redirect('/user');
        });
      } else {
        res.json(errors);
        // res.redirect('/')
      }
    });
});


module.exports = router;