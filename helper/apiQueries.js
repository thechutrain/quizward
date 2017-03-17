/** Description of these helper function here:
 * 
 */

// refs to models
var Models = require('../models');

// module.exports.testQuery = function(x){
//   return new Promise((resolve, reject) => {
//     var x = x || undefined || 'x';
//     resolve({ result: x });
//   });
// };


/** ================== USER related helper functions ==============
 * getUser 
 * getUserPosts - gets the posts the user's made
 * getUserComments - quizzes's they've commented on 
 * getUserQuizMade - gets the quizzess made by user
 * getUserQuizTaken - gets the quizzess the user took
 */
module.exports.getUser = function(num) {
  return new Promise((resolve, reject) => {
    var userId = parseInt(num);
    // Make query
    if (userId) {
      Models.User.findOne({
        include: [{ model: Models.Avatar }],
        where: { id: userId },
        attributes: { exclude: ['password_hash'] },
      }).then((results) => {
        if (!results) {
          resolve({}); // if no user, return empty object not NULL
        } else {
          resolve(results);
        }
      }); 
    } else {
      Models.User.findAll({
        attributes: { exclude: ['password_hash'] },
      }).then((results) => {
        if (!results) {
          resolve({}); // if no user, return empty object not NULL
        } else {
          resolve(results);
        }
      })
    }
  }); // end of Promise
}; 

// Get's User most recent posts -- you can limit posts
module.exports.getUserPosts = function(num, limit) {
  return new Promise((resolve, reject) => {
    var LIMIT = limit || 5;
    var userId = parseInt(num);
    Models.Post.findAll({
      attributes: { 
        exclude: ['password_hash']
      },
      where: { user_id: userId },
      order: [
        ['updated_at', 'DESC'],
      ],
      limit: LIMIT,
    })
    .then((userPosts) => {
      // console.dir(userPosts);
      if (!userPosts) {
        resolve([]); // send back empty array
      } else {
        // console.dir(userPosts);
       resolve(userPosts);
      };
    })
  }); // end of promise
};

module.exports.getUserQuizMade = function(num) {
  return new Promise((resolve, reject) => {
    var userId = parseInt(num);
    console.log(userId);
    Models.Quiz.findAll({ where: { made_by: userId }})
    .then((results) => {
      if (!results) {
        resolve([]); // send back empty array
      } else {
       resolve(results);
      };
    })
  }); // end of promise
};

// returns all quizzess that a User's taken (array of obj)
module.exports.getUserQuizTaken = function(num) {
  return new Promise((resolve, reject) => {
    var userId = parseInt(num);
    Models.UserQuiz.findAll({
      include: [{ model: Models.Quiz }],
      where: { user_id: userId },
    })
    .then((userResult) => {
      // console.dir(userResult);
      if (!userResult) {
        resolve([]); // send back empty array
      } else {
       resolve(userResult);
      };
    })
  }); // end of promise
};