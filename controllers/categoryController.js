var express = require('express');
var Models = require('../Models');
var multer = require('multer');
var router = express.Router();
// router.use(multer({ dest: './public/uploads/' }));

// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/new', function(req, res) {
  Models.User.findAll({}).then((results) => {
    var users = {
      users: results
    };
    res.render('categories/new', users);
  });

});




// =========== POST ROUTES ===========
// Create User
router.post('/new', (req, res) => {
  console.log(req.body); //form fields
  console.log(req.file);
  res.redirect('/categories/new');
});


module.exports = router;