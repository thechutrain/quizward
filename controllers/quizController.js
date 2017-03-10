var express = require('express');
var Models = require('../Models');

var router = express.Router();


// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/new', function(req, res) {
  res.render('quizzes/new');
});




// =========== POST ROUTES ===========
// Create User
router.post('/create', (req, res) => {

});


module.exports = router;