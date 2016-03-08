var students = [
	{
		"name": "Prince Aragones"
	},
	{
		"name": "Angeli Tomagos"
	},
	{
		"name": "Graceal Villamor"
	},
	{
		"name": "Van Santos"
	},
	{
		"name": "Narom Santos"
	}
];

function renderStudents(){
	var maindiv = document.getElementById("deck");
	 students.forEach(function(student){
	 /*	var maina = document.createElement("a");
	 	maina.classList.add("carousel-item");
	 	var icon = document.createElement("i");
	 	maina.classList.add("material-icons right");
	 	icon.innerHTML = "settings";
	 	var header = document.createElement("h6");
	 	header.innerHTML = 
	 	maina= document.appendChild(icon);
	 	maindiv.appendChild(maina);
	 	*/
	 	
	 });
}

$( document ).ready(function() {
	$('.countDown').hide();
	
	$("#start").click(function(){
		$('.carousel').carousel('next',[Math.floor(Math.random()*100000000)]);
		var deadline = new Date(Date.parse(new Date()) +  60 * 60 * 1000);
		initializeClock('clockdiv', deadline);
		$('.countDown').show();
	});
});

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

