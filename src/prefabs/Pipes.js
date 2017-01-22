import Util from "./../Util.js";
import Pipe from "./Pipe.js";

const MAX_PIPES = 3;
const MAX_PIPE_Y = 150;
const MIN_PIPE_Y = 0;
const DISTANCE_BETWEEN_PIPES = 180;

export default class Pipes extends Phaser.Group {

	constructor(game, scaleFactor, scrollSpeed) {
		super(game);

		this.scrollSpeed = scrollSpeed * scaleFactor;
		this.scaleFactor = scaleFactor;
		this.scrolling = false;
		this.approachingPipe = null;
		this.createPipes();
		this.leftBound = (this.game.width / 2) - Util.localToPhysical(DISTANCE_BETWEEN_PIPES);
	}

	startScrolling() {
		this.scrolling = true;
		this.setupStartPositions();
		this.approachingPipe = this.pipes[0];
	}

	stopScrolling() {
		this.scrolling = false;
	}

	update() {
		if (this.scrolling == true) {
			this.updatePipePositions();
			this.checkLeftPipeIsOutsideScreen();
		}
	}

	setNextApproachingPipe() {
		for (var i = 0; i < this.pipes.length; i++) {
			if (this.pipes[i] == this.approachingPipe) {
				this.approachingPipe = this.pipes[i + 1];
				return;
			}
		}
	}

	isBirdTouchingAPipe(bird) {
		for (var i = 0; i < this.pipes.length; i++) {
			if (bird.hitTest(this.pipes[i])) {
				return true;
			}
		}

		return false;
	}

	hasBirdPassedApproachingPipe(bird) {
		var birdXPosition = bird.x;
		if (birdXPosition > this.approachingPipe.x) {
			return true;
		}

		return false;
	}

	createPipes() {
		this.pipes = [];

		for (var i = 0; i < MAX_PIPES; i++) {
			var pipe = new Pipe(this.game, Util.scaleFactor);
			this.add(pipe);
			this.pipes.push(pipe);
		}

		this.setupStartPositions();
	}

	setupStartPositions() {
		for (var i = 0; i < this.pipes.length; i++) {
			var pipe = this.pipes[i];
			pipe.position.x = (this.game.width * 1.5) + Util.localToPhysical(i * DISTANCE_BETWEEN_PIPES);
			this.setRandomYPosition(pipe);
		}
	}

	setRandomYPosition(pipe) {
		const delta = MAX_PIPE_Y - MIN_PIPE_Y;
		pipe.position.y = Util.localToPhysical(MIN_PIPE_Y + Math.round(Math.random() * delta));
	}

	updatePipePositions() {
		for (var i = 0; i < this.pipes.length; i++) {
			var pipe = this.pipes[i];
			pipe.x -= this.scrollSpeed;
		}
	}

	checkLeftPipeIsOutsideScreen() {
		const leftMostPipe = this.pipes[0];
		const rightMostPipe = this.pipes[this.pipes.length- 1];
		if (leftMostPipe.x < this.leftBound) {
			leftMostPipe.x = rightMostPipe.x + Util.localToPhysical(DISTANCE_BETWEEN_PIPES);
			this.setRandomYPosition(leftMostPipe);
			this.pipes.shift();
			this.pipes.push(leftMostPipe);
		}
	}
}