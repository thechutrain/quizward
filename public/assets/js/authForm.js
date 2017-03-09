$(document).ready(function() {
  console.log('loaded form.js');

  $(document).on('click', '.btn-submit', function(e) {
    // 1.) prevent default page load
    e.preventDefault();

    // 2) get all the form inputs
    var formObj = {};
    $(this).parent().find("input").each(function( index ){
      var key = $(this).attr('name');
      formObj[key] =  $(this).val().trim();
    })

    // 3.) make $ajax call
    var pathname = formObj.pathname;
    delete formObj.url;
    var origin = window.location.origin;
    var href = origin + pathname;
    $.ajax({
      method: 'POST',
      url: href,
      data: formObj
    }).then(function(result){
      if (result.signed_in){
        // redirect
        window.location = origin + '/auth';
      } else {
        // window.location = origin + '/auth/signin';
        alert('Sorry there was an error logginging you in');
      }
    });

  });


});