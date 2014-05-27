// Space Game - Andrew Rehayem - 2014

var screen = $('#space_game')[0].getContext("2d");
var WIDTH = $('#space_game').width();
var HEIGHT = $('#space_game').height();
var x = 0;
var y = HEIGHT/2;
var diff = 15;
var playerWidth = 20;
var playerHeight = 10;
var bullets = [];
var asteroids = [];
var playerDead = false;
var gameStarted = false;
var ID1, ID2;

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
	if (gameStarted == false) {
		ID1 = setInterval(draw, 5);
		ID2 = setInterval(spawnAsteroid, 100);
	};
}

function shoot() {
	bullets.push({x_position: x, y_position: y});
}

function spawnAsteroid() {
	asteroids.push({x_position: WIDTH, y_position: Math.floor(Math.random() * HEIGHT)});
}

function drawBullets() {
	for(var i=0; i<bullets.length; i++) {
		bullets[i].x_position++;
		screen.beginPath();
		screen.rect(bullets[i].x_position, bullets[i].y_position+5, 20, 1);
		screen.closePath();
		screen.fill();
		if (bullets[i].x_position > WIDTH) {
			bullets.splice(i, 1);
			i--;
		};
	};
}

function drawAsteroids() {
	for(var i=0; i<asteroids.length; i++) {
		asteroids[i].x_position--;
		screen.beginPath();
		screen.arc(asteroids[i].x_position, asteroids[i].y_position, 10, 0,2*Math.PI);
		screen.closePath();
		screen.fill();
		if (asteroids[i].x_position < 0) {
			asteroids.splice(i, 1);
			i--;
		};
	};
	for(var i=0; i<bullets.length; i++) {
		for(var j=0; j<asteroids.length; j++) {
			if (colliding(bullets[i].x_position, bullets[i].y_position, asteroids[j].x_position, asteroids[j].y_position)) {
				asteroids.splice(j, 1);
				bullets.splice(i, 1);
				j--;
				i--;
			};
		};
	};
}

function drawPlayer() {
	$.each(asteroids, function(index, asteroid) {
		if (colliding(x, y ,asteroid.x_position, asteroid.y_position))
			playerDead = true;
	});
	screen.beginPath();
	screen.rect(x, y, 20, 10);
	screen.closePath();
	screen.fill();
}

function colliding(x1, y1, x2, y2) {
	if (x1 >= x2 - 10 && x1 <= x2 + 10 &&
	y1 >= y2 - 10 && y1 <= y2 + 10)
		return true;
	else
		return false;
}

function clear() {
	screen.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
	clear();
	drawPlayer();
	drawBullets();
	drawAsteroids();
	if (playerDead) {
		clearInterval(ID1);
		clearInterval(ID2);
		screen.font="20px Helvetica";
		screen.fillText("click to start",WIDTH/2-50,HEIGHT/2);
		bullets = [];
		asteroids = [];
		gameStarted = false;
		playerDead = false;
		x = 0;
		y = HEIGHT/2;
	};
}

screen.font="20px Helvetica";
screen.fillText("click to start",WIDTH/2-50,HEIGHT/2);

$('#space_game').on("click", function() {
	init();
	gameStarted = true;
});

$(document).on("keydown", handler);
