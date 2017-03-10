var express = require('express');
var bcrypt = require('bcryptjs');
var Models = require('../Models');

var router = express.Router();


// ========= START testing Routes =============
// temporarty auth home page
router.get('/', (req, res) => {
  res.render('auth/test');
});

router.get('/test', (req, res) => {
  // some db query
  Models.User.findAll({}).then((results) => {
    res.json(results);
  });
});

router.get('/session', (req, res) => {
    res.json({
      user: res.locals.user,
      logged_in: res.locals.logged_in,
    })
  })
  // ========= END testing Routes =============


// =========== GET ROUTES ===========
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.get('/signout', (req, res) => {
  // Optional - locals get wiped out anyway.
  res.locals.logged_in = false;
  res.locals.user = '';

  req.session.destroy(function(err) {
    if (err) res.json({ error: err });
    res.json({
      logged_in: res.locals.logged_in,
      user: res.locals.user,
    });
  })
})

// =========== POST ROUTES ===========
// login in post
router.post('/login', (req, res) => {
  Models.User.findOne({ where: { email: req.body.email } })
    .then((match) => {
      if (!match) {
        // No one with that username!
        res.redirect('/auth/signin');
        return Promise.reject('No one with that username');
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
            res.json({ signed_in: true });
          } else {
            // reject();
            resolve();
            console.log('FAILED TO SIGN IN');
            res.json({ signed_in: false });
          }
        });
      }); // closes promise
    }); //
});

// Create User
router.post('/create', (req, res) => {
  console.log(req.body);
  const errors = [];

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
          res.json({ signed_in: true });
          // res.redirect('/auth');
        });
      } else {
        res.json({ signed_in: true, errors: errors });
        // res.redirect('/')
      }
    });
});


module.exports = router;