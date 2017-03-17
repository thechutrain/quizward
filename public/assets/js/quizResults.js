$(document).ready(function() {
  // var regex = new RegExp(/^\/quizzes\/[\d]+/ ^ \results\, 'gi');
  // var proceed = regex.test(window.location.pathname);
  // if (!proceed) {
  //   console.log("this js file won't run for this url pathname");
  //   return;
  // }


  var quizId;
  displayResults();

  function displayResults() {
    quizId = $('.quiz-results').attr('results-id');

    console.log("quiz id: " + quizId);
    $.get("/api/quiz/" + quizId + "/results", function(results) {
      console.log(results);
      printResults(results);
      printComments(results);
    });
  }

  function printResults(r) {
    var resultsContainer = $('.panel-group');
    resultsContainer.empty();
    $('.quiz-title').html(r.a.name);
    $('.quiz-description').html(r.a.description);
    $('.categories').empty();
    for (var i = 0; i < r.a.Categories.length; i++) {
      var category = $('<a>').addClass('category-links').attr("href", "/categories/" + r.a.Categories[i].id).html(r.a.Categories[i].name);
      $('.categories').append(category);
    }
    $('.categories').prepend('Categories: ');

    for (var i = 0; i < r.a.UserQuizzes.length; i++) {
      var newPanel = $('<div>').addClass('panel panel-default').attr('quiz', i);
      var newPanelHeading = $('<div>').addClass('panel-heading').attr('role', 'tab').attr('id', i);

      var newPanelTitle = $('<h4>').addClass('panel-title');

      var newPanelLink = $('<a>').attr('href', '#collapse' + i).data('parent', '#accordion').attr('data-role', 'button').attr('data-toggle', 'collapse').html('Quiz ' + (i + 1) + ' Taken At: ' + r.a.UserQuizzes[i].created_at).attr('aria-controls', i).attr('aria-expanded', 'false').addClass('collapsed');

      newPanelTitle.append(newPanelLink);
      newPanelHeading.append(newPanelTitle);
      newPanel.append(newPanelHeading);

      var newPanelCollapse = $('<div>').addClass('panel-collapse collapse').attr('role', 'tabpanel').attr('id', 'collapse' + i).attr('aria-labelledby', 'heading' + i);

      var newPanelBody = $('<div>').addClass('panel-body');
      var userChoices = JSON.parse(r.a.UserQuizzes[i].userAnswers);
      var correct = 0;
      var totalQuestions = 0;
      r.a.Questions.forEach(function(item, index) {
        totalQuestions++;
        // console.log(item);
        var newQuestion = $('<div>').addClass('well well-lg');
        var questionInfo = $('<h5>').html(item.question);
        var questionAnswer = $('<p>').html('Answer: ' + JSON.parse(item.correct_answer));

        var userAnswer = $('<p>').html('Your Answer: ' + userChoices[index]);
        if ((JSON.parse(item.correct_answer)) === userChoices[index]) {
          newQuestion.addClass('correct-bg');
          correct++;
        } else {
          newQuestion.addClass('wrong-bg');
        }
        newQuestion.append(questionInfo);
        newQuestion.append(questionAnswer);
        newQuestion.append(userAnswer);
        newPanelBody.append(newQuestion);
      })
      var total = $('<span>').addClass('label score label-default').html('You got ' + correct + ' out of ' + totalQuestions + ' correct!');
      newPanelBody.append(total);

      newPanelCollapse.append(newPanelBody)
      newPanel.append(newPanelCollapse);
      resultsContainer.prepend(newPanel);
    }


  }

$(".comment-submit").on('click', function(e){
  e.preventDefault();
  var comment = $(".comment-body").val().trim();
  quizId = $('.quiz-results').attr('results-id');

  var commentObj = {
    comment: comment,
    quiz_id: quizId
  }
  
  $.post('/quizzes/comment', commentObj).then(function(results){
    console.log(results);
    displayResults();
  })
})

  function printComments(r){
    $('.posts-container').empty();
     for (var i = 0; i < r.b.length; i++) {
      var username = r.b[i].User.username;
      var comments = r.b[i].comment;
      var usernameDiv = $('<div>').addClass('username-div').append(username);
      var commentDiv = $('<div>').addClass('comment-div').append(comments);
      commentDiv.prepend(usernameDiv);
      $('.posts-container').append(commentDiv);
    } 
  }


});