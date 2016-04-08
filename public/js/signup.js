'use strict';

$(document).ready(function() {
    $('.hidden').hide();

    $('#password-again').focusout( () => {
      let password = $('#password').val();
      let confirmPassword = $('#password-again').val();
      let errorMsg = $('.errorPassword');

      if(password != confirmPassword){
        errorMsg.show();
      } else {
        errorMsg.hide();
      }
    });

    $('#register-button')
      .click( () => {
        let password = $('#password').val();
        let confirmPassword = $('#password-again').val();
        let fname = $('#fname').val();
        let lname = $('#lname').val();
        let mi = $('#mi').val();
        let email = $('#email').val();
        let emptyChecker = fname === "" || lname === "" || mi === "" || email === "";

        if(emptyChecker){
          $('.errorRequired').show();
        } else{
            $('.errorRequired').show();

            let account = {
                fname: $('#fname').val(),
                mi: $('#mi').val(),
                lname: $('#lname').val(),
                username: $('#username').val(),
                email: $('#email').val(),
                password: $('#password').val()
            };
        }


      });
});
