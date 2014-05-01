// Space Game - Andrew Rehayem - 2014

var x = 0;
var y = 200;
var diff = 15;
var WIDTH;
var HEIGHT;
var playerWidth = 20;
var playerHeight = 10;
var screen;
var bullets = [];
var asteroids = [];

function handler(e) {
	switch(e.which){
		case 37: case 39: case 38:  case 40: // Arrow keys
		case 32: e.preventDefault(); break; // Space
		default: break; // do not block other keys
	};
	if (e.which == 38) y -= diff;
	else if (e.which == 40) y += diff;
	else if (e.which == 37) x -= diff;
	else if (e.which == 39) x += diff;
	else if (e.which == 32) shoot();
	if (y > (HEIGHT-playerHeight)) y = (HEIGHT-playerHeight);
	else if (y < 0) y = 0;
	else if (x < 0) x = 0;
	else if (x > (WIDTH-playerWidth)) x = (WIDTH-playerWidth);
}

function init() {
	screen = $('#space_game')[0].getContext("2d");
	WIDTH = $('#space_game').width();
	HEIGHT = $('#space_game').height();
	setInterval(draw, 5);
}

function shoot() {
	bullets.push({x_position: x, y_position: y});
}

function drawBullets() {
	$.each(bullets, function(index, bullet) {
		bullet.x_position++;
		screen.beginPath();
		screen.rect(bullet.x_position, bullet.y_position, 3, 3);
		screen.closePath();
		screen.fill();
		if (bullet.x_position > WIDTH)
			bullets.splice(index, 1);
	});
}

function drawPlayer() {
	screen.beginPath();
	screen.rect(x, y, 20, 10);
	screen.closePath();
	screen.fill();
}
	
function clear() {
	screen.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
	clear();
	drawPlayer();
	drawBullets();
}

init();

$(document).on("keydown", handler);
