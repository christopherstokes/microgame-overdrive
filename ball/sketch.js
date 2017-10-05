'use strict';

// declare actors
let ball={}, player={};

// declare game state object
let gameState = {};

let speed = 250;

gameState.currentState = 'intro';

gameState.intro = {
	draw: function () {
		background(0);
		player.bounceAnim.draw(width/2, height-64);
	},


	keyPressed: function () {
		if (key == "z" || "Z") {
			gameState.currentState = 'game';
		}
	}
}

gameState.game = {
	draw: function () {
		background(0);

		// draw player
		player.juggleAnim.draw(width/2 + player.xOffset, height-64);


		// draw ball
		stroke(ball.col);
		fill(ball.col);
		rect(ball.x, ball.y, ball.w, ball.w);
	},

	keyPressed: function () {
		if ((millis() - player.lastMoveTime) > speed) {
			if (key == "d" || key == "D") {
				player.juggleAnim.changeFrame(player.juggleAnim.getFrame() + 1);
				player.lastMoveTime = millis();
				if (player.juggleAnim.getFrame() > 3) {
					player.xOffset = 16;
				}
			} else if (key == "a" || key == "A") {
				if (player.juggleAnim.getFrame() > 0) {
					player.juggleAnim.changeFrame(player.juggleAnim.getFrame() - 1);
					player.lastMoveTime = millis();
				}
				if (player.juggleAnim.getFrame() < 4) {
					player.xOffset = -16;
				}
			}
		}
	}
}

function preload() {
	// setup animations, bounce for intro and juggle
	player.bounceAnim = loadAnimation("img/pl_0.png", "img/pl_3.png");	
	player.juggleAnim = loadAnimation("img/pl_4.png", "img/pl_11.png");
	player.bounceAnim.frameDelay = 8;
	player.juggleAnim.stop();
}

function setup() {
	createCanvas(256, 256);
	
	// set initial player variables
	player.lastMoveTime = millis();
	player.xOffset = 16;
	player.juggleAnim.changeFrame(4);

	// set initial ball variables
	ball.w = 8;
	ball.x = width/2;
	ball.y = height/2;
	ball.col = color(154,154,154);
}

function draw() {
	gameState[gameState.currentState].draw();
}

function keyPressed() {
	gameState[gameState.currentState].keyPressed();
}
