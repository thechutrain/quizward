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
var user_1 = {
  username: 'test',
  email: 'test@gmail.com',
  password_hash: 'password_unhashed',
  isAdmin: false,
}

var quiz_1 = {
  name: 'random-quiz',
  description: 'a random quiz for testing',
  made_by: 1,
}

var question_1 = {
  question: 'What is your favorite color',
  choice: JSON.stringify(['red', 'blue', 'green', 'pink']),
  correct_answer: 'blue',
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

var userquiz_1 = {
  score: 72.34,
  quiz_id: 1,
  user_id: 1,
}

// ============ Call queries ==============
Models.sequelize.sync({ force: true }).then(function(){
  // 
  Promise.all([
    addRow(user_1, 'User'),
    addRow(quiz_1, 'Quiz'),
    addRow(question_1, 'Question'),
    addRow(question_2, 'Question'),
    addRow(userquiz_1, 'UserQuiz'),
  ])
  .then(function(){
    console.log('All your queries worked! Check your database');
  }); // promise.all end
})