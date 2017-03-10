$(document).ready(function() {

  console.log('loaded');


  function newChoice() {
    let choiceContainer = $(this).parent().find('.choice-container');
    let newChoiceHolder = $('<span>').addClass('added-choice');
    let newChoice = $('<input>').attr('type', 'text').attr('placeholder', 'Choice').addClass('form-control');
    let newChoiceRemove = $('<button>').addClass('btn btn-danger remove-choice').text('X');
    newChoiceHolder.append(newChoice).append(newChoiceRemove);
    choiceContainer.append(newChoiceHolder);
  }

  // Add choice to question
  $(document).on('click', '.add-choice', newChoice);

  $(document).on('click', '.remove-choice', function() {
    $(this).parent().remove();
  });

  $(document).on('click', '.add-question', function() {
    let newQuestion = $('.q5').clone();
    newQuestion.removeClass('q5');
    let newQuestionRemove = $('<button>').addClass('btn btn-danger remove-question').text('Remove Question');
    newQuestion.append(newQuestionRemove);
    $('.additional-questions').append(newQuestion);
  });

  $(document).on('click', '.remove-question', function() {
    $(this).parent().remove();
  })

});