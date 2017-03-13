$(document).ready(function() {

  $('.new-quiz').on('click', 'button', function(e) {
    e.preventDefault();
  });

  function populateCats() {
    $.get("/quizzes/api/new", function(categories) {
      for (var i = 0; i < categories.length; i++) {
        let category = $('<option>').attr('category-id', categories[i].id).html(categories[i].name);
        $('.quiz-categories').append(category);
      }
    });
  }
  populateCats();

  function newChoice() {
    let choiceContainer = $(this).parent().find('.choice-container');
    let newChoice = $(this).parent().find('.copy-choice').clone();
    newChoice.removeClass('copy-choice');
    newChoice.find('input').val('');
    let newChoiceRemove = $('<button>').addClass('btn btn-danger remove-choice').text('X');
    newChoice.append(newChoiceRemove);
    choiceContainer.append(newChoice);
  }

  // Add choice to question
  $(document).on('click', '.add-choice', newChoice);

  $(document).on('click', '.remove-choice', function() {
    $(this).parent().remove();
  });

  $(document).on('click', '.add-question', function() {
    let newQuestion = $('.q5').clone();
    newQuestion.removeClass('q5').addClass('question');
    newQuestion.find('input').val('');
    newQuestion.find('textarea').val('');
    let newQuestionRemove = $('<button>').addClass('btn btn-danger remove-question').text('Remove Question');
    newQuestion.append(newQuestionRemove);
    $('.additional-questions').append(newQuestion);
  });

  $(document).on('click', '.remove-question', function() {
    $(this).parent().remove();
  });

  function createQuiz() {
    let newQuiz = {};
    newQuiz.name = $("[name=name]").val();
    newQuiz.category = parseInt($('.quiz-categories option:selected').attr('category-id'));
    newQuiz.description = $('.quiz-description').val();

    $.ajax({
      method: 'POST',
      url: '/quizzes/create',
      data: newQuiz
    }).then(function(result) {
      createQuestions(result);
    });
  }

  function createQuestions(r) {
    let fullQuestionList = {};
    let questionList = [];
    $('.question').each(function() {
      let questionItem = {};
      questionItem.quiz_id = r.id;
      questionItem.question = $('[name=question]').val();
      questionItem.answer = $('[name=answer]').val();
      questionItem.explanation = $('[name=explanation]').val();
      let questionChoices = [];
      $(this).find('.choice-container').find('input').each(function() {
        questionChoices.push($(this).val());
      })
      questionItem.choices = questionChoices;

      questionList.push(questionItem);
    });
    fullQuestionList.questionList = questionList;
    console.log(fullQuestionList);

    $.ajax({
      method: 'POST',
      url: '/quizzes/create/questions',
      data: fullQuestionList
    }).then(function(result) {
      console.log(result);
    });

  }


  $('body').on('click', '.submit-quiz', function() {
    createQuiz();
  });

});