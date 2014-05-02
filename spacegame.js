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
var playerDead = false;

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
	setInterval(spawnAsteroid, 200);
}

function shoot() {
	bullets.push({x_position: x, y_position: y});
}

function spawnAsteroid() {
	asteroids.push({x_position: WIDTH, y_position: Math.floor(Math.random() * HEIGHT)});
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

function drawAsteroids() {
	$.each(asteroids, function(index, asteroid) {
		asteroid.x_position--;
		screen.beginPath();
		screen.arc(asteroid.x_position, asteroid.y_position, 10, 0,2*Math.PI);
		screen.closePath();
		screen.fill();
		if (asteroid.x_position < 0)
			asteroids.splice(index, 1);
	});
	$.each(bullets, function(index, bullet) {
		$.each(asteroids, function(index, asteroid) {
			if (colliding(bullet.x_position, bullet.y_position, asteroid.x_position, asteroid.y_position))
				asteroids.splice(index, 1);
		});
	});
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
	if (playerDead == false) {
		drawPlayer();
		drawBullets();
		drawAsteroids();
	};
}

init();

$(document).on("keydown", handler);
