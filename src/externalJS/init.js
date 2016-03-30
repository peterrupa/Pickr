(function() {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.login').hide();
    $('.coolh1').hide();

    let elems = $('.animateblock');
    let winheight = $(window).height();
    let fullheight = $(document).height();
    $('.carousel').carousel();
    $('ul.tabs').tabs('select_tab', 'tab_id');

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('nav i').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
            $('nav i').removeClass('shrink');
        }
        animate_elems();
    });
    $(".coolh1").slideDown(2000);
    $("#loginbutton").click(function() {
        $(".login").slideToggle();
    });
    function animate_elems() {
        let wintop = $(window).scrollTop(); // calculate distance from top of window

        // loop through each item to check when it animates
        elems.each(function() {
            let $elm = $(this);

            if ($elm.hasClass('animated')) {
                return true;
            } // if already animated skip to the next item

            let topcoords = $elm.offset().top; // element's distance from top of page in pixels

            if (wintop > (topcoords - (winheight * .60))) {
                // animate when top of the window is 3/4 above the element
                $elm.addClass('animated');
            }
        });
    } // end animate_elems()

}); // end of document ready
