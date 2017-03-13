var express = require('express');
var Models = require('../Models');
var bodyParser = require('body-parser');


// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);

// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/new', function(req, res) {
  res.render('quizzes/new');
});

router.get('/api/new', function(req, res) {
  Models.Category.findAll({}).then((results) => {
    res.json(results);
  });
});


// =========== POST ROUTES ===========
// Create Quiz
router.post('/create', (req, res) => {
  console.log(req.body);
  Models.Quiz.create({
    name: req.body.name,
    description: req.body.description,
    category_id: req.body.category,
  }).then(function(q) {
    res.json(q);
  });
});

router.post('/create/questions', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});



module.exports = router;