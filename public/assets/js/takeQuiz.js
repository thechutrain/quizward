$(document).ready(function() {
  var regex = new RegExp(/^\/quizzes\/[\d]+/, 'gi');
  var proceed = regex.test(window.location.pathname);
  if (!proceed) {
    console.log("this js file won't run for this url pathname");
    return;
  }
  getQuiz();
  var quizId;

  function getQuiz() {
    quizId = parseInt($('form').attr('quiz-id'));

    $.get('/api/quiz/' + quizId + '/questions', function(quiz) {
      printQuiz(quiz);
    });
  }

  function printQuiz(q) {
    var questionContainer = $('.questions-container');
    for (var i = 0; i < q.Questions.length; i++) {

      var singleQuestion = $('<div>').addClass('form-group').attr('question-number', i);

      var questionTitle = $('<label>').attr('for', i).html(q.Questions[i].question);
      singleQuestion.append(questionTitle);
      var choices = JSON.parse(JSON.parse(q.Questions[i].choice));

      for (var k = 0; k < choices.length; k++) {
        var radioGroup = $('<div>').addClass('radio');
        var radioLabel = $('<label>');
        var input = $('<input>').attr('type', 'radio').attr('name', 'optionsRadios' + i).attr('id', k).val(choices[k]);
        radioLabel.append(input).append(choices[k]);
        radioGroup.append(radioLabel);
        singleQuestion.append(radioGroup);
      }

      questionContainer.append(singleQuestion);
    }
  }

  $('.take-quiz').on('click', 'button', function(e) {
    e.preventDefault();
    var userAnswers = [];
    $('.take-quiz').find('.form-group').each(function() {
      userAnswers.push($(this).find('input[type=radio]:checked').val());
    });

    var quizResults = {
      userAnswers: JSON.stringify(userAnswers),
      quiz_id: quizId
    }
    console.log(quizResults);

    $.post('/api/userquiz', quizResults).then(function(results) {
      console.log(results);
    });
  });

});