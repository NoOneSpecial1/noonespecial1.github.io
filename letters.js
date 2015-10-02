var canvas = document.createElement("canvas");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var randY = Math.floor(Math.random() * 480 + 1);
var x = 0;
var letter = genChar();
var score = 0;
var speed = 800;

var gameOver = false;

function gameLoop() {
	render();
	update();
	requestAnimationFrame(gameLoop);
}

function render() {
	ctx.fillStyle = "lightgray";
	ctx.fillRect(0, 0, 640, 480);
	
	ctx.fillStyle = "gray";
	ctx.fillRect(460, 0, 20, 480);
	
	ctx.fillStyle = "white";
	ctx.font = "24px Arial";
	ctx.fillText(letter, x, randY);
	
	ctx.fillText("Score: " + score, 0, 25);
	
	if (gameOver) {
		ctx.fillStyle = "black";
		ctx.font = "40px, Arial";
		ctx.fillText("Game Over!", 250, 240);
		ctx.fillText("(Press Space to try again)", 250, 280);
	}
}

function update() {
	setTimeout(function() {
		x += 3;
	}, speed);
	
	if (x > 460) {
		gameOver = true;
	}
}

function keyDownHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if (keyPressed == letter) {
		score += 1;
		restart();
	}
	
	if (keyPressed == " ") {
		gameOver = false;
		score = 0;
		restart();
	}
}

function restart() {
	x = 0;
	randY = Math.floor(Math.random() * 480 + 1);
	letter = genChar();
}

function genChar() {
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	return chars.charAt(Math.floor(Math.random() * chars.length));
}

document.onkeydown = keyDownHandler;

requestAnimationFrame(gameLoop);
