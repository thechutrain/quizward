var Models = require('../models');

// ========== Query Functions ==========
function addRow(rowObj, modelName){
  return new Promise(function(resolve, reject){
    Models[modelName].create(rowObj)
    .then(
    // success
    function(){ resolve() },
    // error  
    function(){ reject() }
    )
  })
}

// =========== Test Variables ===============

// USERS
var user_1 = {
  username: 'food guru',
  email: 'foodie@gmail.com',
  password_hash: 'password_unhashed',
  isAdmin: false,
}

var user_2 = {
  username: 'Jon Doe',
  email: 'jon@gmail.com',
  password_hash: 'password_unhashed',
  isAdmin: false,
}

var user_3 = {
  username: 'Mary Jane',
  email: 'mary@gmail.com',
  password_hash: 'password_unhashed_duhhh',
  isAdmin: false,
}

// QUIZ
var quiz_1 = {
  name: 'food quiz',
  description: 'a random quiz for testing on food',
  made_by: 1,
}
var question_1 = {
  question: 'What seed has a ton of zinc in it?',
  choice: JSON.stringify(['pumpkin seeds', 'sunflower seeds', 'almonds', 'cashews']),
  correct_answer: 'pumpkin seeds',
  explanation: 'Just because ...',
  quiz_id: 1,
}
var question_2 = {
  question: 'What vegetable has the most about of protein in it?',
  choice: JSON.stringify(['cabbage', 'broccoli', 'spinach', 'beets']),
  correct_answer: 'broccoli',
  explanation: 'Pretty sure ...',
  quiz_id: 1,
}

// Categories
var cat_1 = {
  name: 'Food',
  description: 'Quizzess related to food'
};

var cat_2 = {
  name: 'History',
  description: 'Quizzess related to world history',
};

// Relationships M:M talbes
var quizCat_1 = {
  category_id: 1,
  quiz_id: 1,
}

// Quizzess taken
var userquiz_1 = {
  score: 72.34,
  quiz_id: 1,
  user_id: 3,
}

var userCat_1 = {
  user_id: 3,
  category_id: 1,
}
var userCat_2 = {
  user_id: 3,
  category_id: 2,
}

var post_1 = {
  comment: 'Hello FOOODid world!',
  quiz_id: 1,
  user_id: 3,
}


// ============ Call queries ==============
Models.sequelize.sync({ force: true }).then(function(){
  // 
  Promise.all([
    addRow(user_1, 'User'),
    addRow(user_2, 'User'),
    addRow(user_3, 'User'),
    addRow(quiz_1, 'Quiz'),
    addRow(question_1, 'Question'),
    addRow(question_2, 'Question'),
    addRow(userquiz_1, 'UserQuiz'),
    addRow(cat_1, 'Category'),
    addRow(cat_2, 'Category'),
    addRow(userCat_1, 'UserCategory'),
    addRow(userCat_2, 'UserCategory'),
    addRow(post_1, 'Post'),
    addRow(quizCat_1, 'QuizCategory'),
  ])
  .then(function(){
    console.log('All your queries worked! Check your database');
  }); // promise.all end
})