$(document).ready(function(){
  // get references to form
  var loginForm = $('form.login-form');
  var signupForm = $('form.signup-form');
  var usernameInput = $('input#username-input');
  var emailInput = $('input#email-input');
  var passwordInput = $('input#password-input');

  // =========== EVENT LISTENERS ===========
  // Event Listeners - login form submission
  loginForm.on('submit', function(event){
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // TO DO - add proper validators!
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  }); // closes on submit event

  // Event Listeners - signup form submission
  signupForm.on('submit', function(event){
    event.preventDefault();
    // debugger;
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // TO DO - add proper validators!
    signupUser(userData.username, userData.email, userData.password);
    usernameInput.val('');
    emailInput.val('');
    passwordInput.val('');
  }); // closes on submit event

  // =========== Helper Functions ===========
  // signUp - helper function
  function signupUser(username, email, password) {
    $.post('/auth/signup', {
      username: username,
      email: email,
      password: password,
    })
    .then(function(result){
      if (result.url) {
        window.location.replace(result.url);
      } 
      else {
        console.log(result);
      }
    })
  };

  // login - helper function
  function loginUser(email, password) {
    $.ajax({
      method: 'POST',
      url: '/auth/login',
      data: {
        email: email,
        password: password,  
      }
    })
    .then(function(result){
      if (result.url) {
        window.location.replace(result.url);
      } else {
        console.log(result);
      }
    }).catch(function(err){
      console.log(err);
    })
  };

});