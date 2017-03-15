var express = require('express');
var bodyParser = require('body-parser');

// Get access to db
var Models = require('../models');

// Create Router Object & middleware
var router = express.Router();
var jsonParse = bodyParser.urlencoded({ extended: false });
router.use(jsonParse);


// API HOME  ----------------------------------- //
router.get('/', function(req, res) {
  res.render('api.handlebars');
})

// ====================== CATEGORY routes ====================== //
// GET for category ----------------------//
router.get('/categories/:id?', (req, res) => {
  category_id = parseInt(req.params.id);
  if (category_id) {
    Models.Category.findOne(
      { where: { id: category_id} }
    ).then((result) => {
      res.json(result);
    })
  } else {
    Models.Category.findAll({}).then((results) => {
      res.json(results);
    });
  }
});

// ====================== USER routes  ====================== //
// GET for user ----------------------//
router.get('/users/:id?', (req, res) => {
  var userId = parseInt(req.params.id);
  if (userId) {
    Models.User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password_hash'] },
    }).then((results) => {
      res.json(results);
    })
  } else {
    Models.User.findAll({
      attributes: { exclude: ['password_hash'] },
    }).then((results) => {
      res.json(results);
    })
  }
});

router.get('/users/:user_id/:searchTerm?', (req, res) => {
  var searchTerm = req.params.searchTerm;
  var userId = parseInt(req.params.user_id);

  if (searchTerm === 'quizzess-made'){
    var quizzess_made;
    Models.Quiz.findAll({
      where: { made_by: userId }
    }).then((quizMade) => {
      quizzess_made = quizMade;
      return Models.User.findOne({ where: { id: userId }});
    }).then((user) => {
      var userObj = user.dataValues;
      userObj.QuizzessMade = quizzess_made;
      res.json(userObj);
    });
  } else {
    switch (searchTerm) {
      case 'categories': {
        var includeArray = [{ model: Models.Category }];
        break;
      }
      case 'quizzess-taken': {
        var includeArray = [{ model: Models.Quiz }];
        break;
      }
      case 'posts': {
        var includeArray = [{ model: Models.Post }];
        break;
      }
    }; // ends switch

    Models.User.findOne({
      attributes: { exclude: ['password_hash'] },
      include: includeArray,
      where: { 
        id: userId, 
      }
    })
    .then((results) => {
        res.json(results);
    })
  } // end of else
}); // closes router


// ====================== QUIZ routes  ====================== //
// GET for quiz ----------------------//
router.get('/quiz/:id?', (req, res) => {
  var quiz_id = parseInt(req.params.id);
  if (quiz_id) {
    Models.Quiz.findOne({
      where: { id: quiz_id }
    }).then((results) => {
      res.json(results);
    })
  } else {
    Models.Quiz.findAll({}).then((results) => {
      res.json(results);
    })
  }
});

// gets the quiz & associated questions
router.get('/quiz/:id/questions', (req, res) => {
  var quiz_id = parseInt(req.params.id);
  if (quiz_id) {
    Models.Quiz.findOne({
      include: [{
        model: Models.Question
      }],
      where: { id: quiz_id }
    }).then((results) => {
      res.json(results);
    })
  } else {
    Models.Quiz.findAll({}).then((results) => {
      res.json(results);
    })
  }
});


// gets all quizzess based on category id
router.get('/quiz/by-category/:category_id?', (req, res) => {
  var category_id = parseInt(req.params.category_id);
  // res.json(category_id)
  Models.Quiz.findAll({
    include: [{ 
      model: Models.Category, 
      through: Models.QuizCategory,
      where: { id: category_id }
    }],
  }).then((results) => {
    res.json(results);
  })
});

// POST for quiz ----------------------//
router.post('/quiz/new', (req, res) => {
  // helper functions - to insert data 
  function insertCategories(categories, quiz_id) {
    if (categories.length === 0) return Promise.resolve(); // don't try to insert empty data
    var insertData = categories.map((category_id) => { return({category_id, quiz_id}) });
    return Models.QuizCategory.bulkCreate(insertData);
  };

  function insertQuestions(questions, quiz_id) {
    var insertData = questions.map((question) => { 
      question.quiz_id = quiz_id;
      return question;
    });
    return Models.Question.bulkCreate(insertData);
  };
  var quiz = JSON.parse(req.body.quiz);
  var categories = JSON.parse(req.body.categories); // array of category ids
  var questions = JSON.parse(req.body.questions); 
  // var quizObj;

  Models.Quiz.create({
    name: quiz.name,
    description: quiz.description,
    made_by: req.user ? req.user.id : "-1",
  })
  .then((quiz)=> {
    if (!quiz) throw new Error('Could not make a quiz');
    // quizObj = quiz;
    var category_promise = insertCategories(categories, quiz.id);
    var question_promise = insertQuestions(questions, quiz.id);
    return Promise.all([category_promise, question_promise]);
  })
  .then((results)=> res.json(results)); // ends Quiz.creation 
})



module.exports = router;