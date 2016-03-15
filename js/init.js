(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
 	$('.login').hide();
 	$('.classDropDown').hide();
 	$('.coolh1').hide();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(function(){
  var $elems = $('.animateblock');
  var winheight = $(window).height();
  var fullheight = $(document).height();
  $('.carousel').carousel();
  $('ul.tabs').tabs('select_tab', 'tab_id');
  
  $(window).scroll(function(){
	if ($(document).scrollTop() > 50) {
	  //  $('nav').addClass('shrink');
	    $('nav i').addClass('shrink');
	} else {
	    $('nav').removeClass('shrink');
	    $('nav i').removeClass('shrink');
	}
    animate_elems();
  });
  $( ".coolh1" ).slideDown( 2000);
  $("#loginbutton").click(function(){
	    $(".login").slideToggle();
	});
  $("#classDD").click(function(){
	    $(".classDropDown").slideToggle();
	});
  function animate_elems() {
    wintop = $(window).scrollTop(); // calculate distance from top of window
 
    // loop through each item to check when it animates
    $elems.each(function(){
      $elm = $(this);
      
      if($elm.hasClass('animated')) { return true; } // if already animated skip to the next item
      
      topcoords = $elm.offset().top; // element's distance from top of page in pixels
      
      if(wintop > (topcoords - (winheight*.60))) {
        // animate when top of the window is 3/4 above the element
        $elm.addClass('animated');
      }
    });
  } // end animate_elems()

	
});

