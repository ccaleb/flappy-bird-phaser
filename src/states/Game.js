import Util from "./../Util.js";
import Ground from "./../Prefabs/Ground.js";
import Pipes from "./../Prefabs/Pipes.js";
import Pipe from "./../Prefabs/Pipe.js";
import Bird from "./../Prefabs/Bird.js";
import UI from "./../Prefabs/UI.js";

export default class Game {

	constructor() {
		this.held = false;
		this.score = 0;
		this.gracePeriod = 3;
	}

	preload() {
		var background = this.add.sprite(this.game.width / 2, this.game.height / 2, "background");
		background.anchor.setTo(0.5, 0.5);

		this.game.input.keyboard.onDownCallback = this.keyDown.bind(this);
		this.game.input.keyboard.onUpCallback = this.keyUp.bind(this);

		const scrollSpeed = 3;
		this.pipes = new Pipes(this.game, Util.scaleFactor, scrollSpeed);

		this.ground = new Ground(this.game, Util.scaleFactor, scrollSpeed);
		this.ground.startScrolling();
		this.ground.position.y = this.game.height - this.ground.height;

		this.pipes.position.y = (this.game.height - this.ground.height);


		this.game.add.existing(this.ground);

		this.bird = new Bird(this.game, Util.scaleFactor, 0.55, -8.15, 15);
		this.game.add.existing(this.bird);

		this.ui = new UI(this.game, Util.scaleFactor, Util.logicalViewportRect);
		this.ui.position.x = this.game.width / 2;
		this.ui.position.y = this.game.height / 2;
		this.game.add.existing(this.ui);

		this.pointAudio = this.game.add.audio("point");
	}

	update() {
		if (this.game.input.pointer1.justPressed() == true) {
			this.keyDown();
		} else {
			this.keyUp();
		}

		if (this.bird.isDead() == false && this.gracePeriod == 0) {
			this.checkForBirdCollidingWithGround();
			this.checkForBirdCollidingWithPipes();
			this.checkForBirdPassingPipe();
		} else {
			this.gracePeriod--;
		}
	}

	startGame() {
		this.gracePeriod = 3;
		this.score = 0;
		this.pipes.startScrolling();
		this.ground.startScrolling();
		this.bird.startFlying();
		this.ui.gameStart();
	}

	birdHitGround() {
		this.bird.hitGround();
		this.ground.stopScrolling();
		this.pipes.stopScrolling();
		this.ui.gameOver();
	}

	birdHitPipe() {
		this.bird.fallFromSky();
		this.ground.stopScrolling();
		this.pipes.stopScrolling();
		this.ui.triggerScreenFlash();
	}

	checkForBirdCollidingWithGround() {
		if (this.bird.isDead() == false) {
			if (this.bird.hitTestWithGround(this.ground) == true) {
				this.birdHitGround();
			}
		}
	}

	checkForBirdCollidingWithPipes() {
		if (this.bird.isAlive() == true) {
			if (this.pipes.isBirdTouchingAPipe(this.bird)) {
				this.birdHitPipe();
			}
		}
	}

	checkForBirdPassingPipe() {
		if (this.bird.isAlive() == true) {
			if (this.pipes.hasBirdPassedApproachingPipe(this.bird)) {
				this.pipes.setNextApproachingPipe();
				this.scoredPoint();
			}
		}
	}

	scoredPoint() {
		this.pointAudio.play();
		this.score++;
		this.ui.updateScore(this.score);
	}

	keyDown() {
		if (this.held == false) {
			this.held = true;
			this.userAction();
		}
	}

	keyUp() {
		this.held = false
	}

	userAction() {
		if (this.bird.isDead() == true) {
			this.startGame();
		} else {
			this.bird.flap();
		}
	}

	resize(logicalViewportRect, scaleFactor) {
		this.ui.resize(logicalViewportRect, scaleFactor);
	}

}