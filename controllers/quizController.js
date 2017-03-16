var express = require('express');
var Models = require('../Models');
var bodyParser = require('body-parser');
// Create Router Object & middleware
var jsonParse = bodyParser.json();
var router = express.Router();


// =========== GET ROUTES ===========
// TEST ROUTE --- comment out later
router.get('/', function(req, res) {
  Models.Quiz.findAll({
    include: [{
      model: Models.User,
      through: Models.UserQuiz,
    }, {
      model: Models.Category,
      through: Models.QuizCategory,
    }],
  }).then((results) => {
    var quizzes = {
      quizzes: results
    };
    // res.json(quizzes);
    res.render('quizzes/all', quizzes);
  });
});

router.get('/new', function(req, res) {
  res.render('quizzes/new');
});

router.get('/api/new', function(req, res) {
  Models.Category.findAll({}).then((results) => {
    res.json(results);
  });
});

router.get('/:id', function(req, res) {
  var quizId = req.params.id;

  Models.Quiz.findById(quizId).then((results) => {
    var quiz = {
      quiz: results
    };
    res.render('quizzes/single', quiz);
  });
});



// =========== POST ROUTES ===========
// Create Quiz

router.post('/questions', jsonParse, (req, res) => {
  console.log(req.body);

  for (var i = 0; i < req.body.questionList.length; i++) {
    Models.Question.create({
      quiz_id: req.body.questionList[i].quiz_id,
      question: req.body.questionList[i].question,
      correct_answer: req.body.questionList[i].answer,
      choice: req.body.questionList[i].choices,
      explanation: req.body.questionList[i].explanation
    }).then(function(q) {

    });
  }
});


router.post('/create', jsonParse, (req, res) => {
  console.log(req.body);
  Models.Quiz.create({
    name: req.body.name,
    description: req.body.description,
    category_id: req.body.category,
  }).then(function(q) {
    res.json(q);
  });
});



module.exports = router;