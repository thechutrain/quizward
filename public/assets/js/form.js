$(document).ready(function() {
  // call our Cats
  populateCats();

  // Function to query categories for Quiz Cat select dropdown
  function populateCats() {
    $.get("/quizzes/api/new", function(categories) {
      for (var i = 0; i < categories.length; i++) {
        var category = $('<option>').attr('category-id', categories[i].id).html(categories[i].name);
        $('.quiz-categories').append(category);
      }
    });
  }

  // Function to Add Choice
  function newChoice() {
    var choiceContainer = $(this).parent().find('.choice-container');
    var newChoice = $(this).parent().find('.copy-choice').clone();
    newChoice.removeClass('copy-choice');
    newChoice.find('input').val('');
    var newChoiceRemove = $('<button>').addClass('btn btn-danger remove-choice').text('X');
    newChoice.append(newChoiceRemove);
    choiceContainer.append(newChoice);
  }

  // ------------ Alan's Helper functions ----------------
  function getQuizData() {
    var newQuiz = {};
    newQuiz.name = $("[name=name]").val().trim();
    newQuiz.description = $('.quiz-description').val().trim();
    return newQuiz;
  };

  function getCategoryData() {
    categories_array = [];
    $('.quiz-categories option:selected').each(function() {
      categories_array.push(parseInt($(this).attr('category-id')));
    });
    return categories_array;
  };

  function getQuestionData() {
    var questionList = [];
    $('.question').each(function() {
      var questionItem = {};
      questionItem.question = $(this).find('[name=question]').val().trim();
      questionItem.correct_answer = $(this).find('[name=answer]').val().trim();
      questionItem.explanation = $(this).find('[name=explanation]').val().trim();
      var questionChoices = [];
      $(this).find('.choice-container').find('input').each(function() {
        questionChoices.push($(this).val().trim());
      })
      questionItem.choice = JSON.stringify(questionChoices);
      questionList.push(questionItem);
    });
    return questionList;
  };

  // Prevent New Quiz from submitting form unless through AJAX
  $('.new-quiz').on('click', 'button', function(e) {
    e.preventDefault();
  });

  // Add choice to question
  $(document).on('click', '.add-choice', newChoice);
  // Remove Question
  $(document).on('click', '.remove-choice', function() {
    $(this).parent().remove();
  });

  // Add Question
  $(document).on('click', '.add-question', function() {
    var newQuestion = $('.q1').clone();
    newQuestion.removeClass('q1').addClass('question');
    newQuestion.find('input').val('');
    newQuestion.find('textarea').val('');
    var newQuestionRemove = $('<button>').addClass('btn btn-danger remove-question').text('Remove Question');
    newQuestion.append(newQuestionRemove);
    $('.additional-questions').append(newQuestion);
  });

  // Remove Question
  $(document).on('click', '.remove-question', function() {
    $(this).parent().remove();
  });

  // Create Quiz
  $('body').on('click', '.submit-quiz', function() {
    var data = {
      quiz: JSON.stringify(getQuizData()),
      categories: JSON.stringify(getCategoryData()),
      questions: JSON.stringify(getQuestionData()),
    };

    $.post('/api/quiz/new', data)
      .then(function(response) {
        window.location.replace(response.url)
      });
  }); // closes .submit-quiz event

});