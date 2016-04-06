var carousel = document.getElementById('classCarousel');
carousel.style.visibility = "visible";

var cards = document.getElementById('classCards');
cards.style.visibility = "hidden";

function toggle() {
    if (carousel.style.visibility == 'visible') {
        carousel.style.visibility = 'hidden';
    } else {
        carousel.style.visibility = 'visible';
    }
    if (cards.style.visibility == 'visible') {
        cards.style.visibility = 'hidden';
    } else {
        cards.style.visibility = 'visible';
    }
}
