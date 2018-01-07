var bar = $('.hal');
var menuopen = false;
$('#Home').css('margin-top', ((-1*($('.nav').height()+15))+'px'));
window.addEventListener("resize", function() {
	$('#Home').css('margin-top', ((-1*($('.nav').height()+15))+'px'));
	
}, false);

bar.on('click', function(){
	if (!menuopen) {
		$('#Home').animate({
			marginTop: "+="+($('.nav').height()+10)+"px"
		}, 500);
		console.log($('.nav').height());
		menuopen = true;
	}
	else if (menuopen) {
		$('#Home').animate({
			marginTop: "-="+($('.nav').height()+10)+"px"
		}, 500);
		menuopen = false;
	}
});

$('.nav #exit').on('click', function(){
	if (menuopen) {
		menuopen = false;
		$('#Home').animate({
			marginTop: "-="+($('.nav').height()+10)+"px"
		}, 500);
	}
});

var percentage = 24;
var up = true;
var playing = false;
var gradient_interval = setInterval(function() {
	if (percentage <= 24) up = true;
	else if (percentage >= 35) up = false;
	$('.hal').css('background', 'radial-gradient(yellow,red '+percentage+'%,black, black)');
	if (up) percentage+=1;
	else if (!up) percentage-=1;
}, 100);

$('#sound').on('click', function() {
	if (playing && ($('source').attr('source') !== "none")) {
		playing = false;
		$('audio').trigger('pause');
		$('#sound').attr('src', 'img/off.png');
	}
	else if (!playing && ($('source').attr('src') !== "none")) {
		playing = true;
		$('audio').trigger('play');
		$('#sound').attr('src', 'img/on.png');
	}
})