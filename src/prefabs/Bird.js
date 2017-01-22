import Util from "./../Util.js";

const START_X = 94;
const START_Y = 175;

const ALIVE = 0;
const DYING = 1;
const DEAD  = 2;

const MAX_UP_ANGLE   = -22.5;
const MAX_DOWN_ANGLE = 90;

const FLY_ANIMATION_KEY = "fly";

export default class Bird extends Phaser.Sprite {

	constructor(game, scaleFactor, gravity, flapImpulse, maxVelocity) {
		super(
			game,
			Util.localToPhysical(START_X),
			Util.localToPhysical(START_Y),
			"bird"
		);

		this.state = DEAD;
		this.velocity = 0;
		this.scaleFactor = scaleFactor;
		this.gravity = gravity;
		this.flapImpulse = flapImpulse;
		this.maxVelocity = maxVelocity;

		this.flapAudio = game.add.audio("flap");
		this.hitAudio = game.add.audio("hit");

		this.anchor.setTo(0.5, 0.5);
		this.initAnimations();
		this.initCollisionPoints();
	}

	isAlive() {
		return (this.state == ALIVE);
	}

	isDead() {
		return (this.state == DEAD);
	}

	startFlying() {
		this.state = ALIVE;
		this.position.y = Util.localToPhysical(START_Y);
		this.play(FLY_ANIMATION_KEY);
		this.velocity = 0;
		this.flap();
	}

	flap() {
		if (this.state == ALIVE && this.position.y > 0) {
			this.velocity = this.flapImpulse;
			this.flapAudio.play();
		}
	}

	fallFromSky() {
		if (this.state == ALIVE) {
			this.state = DYING;
			this.velocity = 0;
			this.hitAudio.play();
		}
	}

	hitGround() {
		if (this.state == ALIVE) {
			this.hitAudio.play();
		}
		this.state = DEAD;
		this.flyAnimation.stop(false);
	}

	update() {
		if (this.state == ALIVE || this.state == DYING) {
			this.updateVelocity();
			this.updateRotation();
		}
	}

	hitTest(target) {
		if (target.hitTest(this) == true) {
			return this.hitTestDots(target);
		}

		return false;
	}

	hitTestWithGround(ground) {
		if (this.overlap(ground) == true) {
			return this.hitTestGroundWithDots(ground);
		}

		return false;
	}

	hitTestDots(target) {
		for (var i = 0; i < this.dots.length; i++) {
			if (target.hitTest(this.dots[i]) == true) {
				return true;
			}
		}

		return false;
	}

	hitTestGroundWithDots(target) {
		for (var i = 0; i < this.dots.length; i++) {
			if (this.dots[i].overlap(target) == true) {
				return true;
			}
		}

		return false;
	}

	updateVelocity() {
		this.velocity += this.gravity;

		if (this.velocity > this.maxVelocity) {
			this.velocity = this.maxVelocity;
		}

		this.position.y += Util.localToPhysical(this.velocity);
	}

	updateRotation() {
		if (this.velocity > 0) {
			var diff = MAX_DOWN_ANGLE - MAX_UP_ANGLE;
			var norm = this.velocity / this.maxVelocity;
			this.angle = MAX_UP_ANGLE + (diff * norm);
		} else {
			this.angle = MAX_UP_ANGLE;
		}
	}

	initAnimations() {
		this.flyAnimation = this.animations.add(
			FLY_ANIMATION_KEY,
			[], // Play all the frames.
			60,
			true,
			false
		);
		this.play(FLY_ANIMATION_KEY);
	}

	initCollisionPoints() {
		this.dots = [];
		this.createCollisionPoint(0, 0);
		this.createCollisionPoint(10, 0);
		this.createCollisionPoint(-10, 0);
		this.createCollisionPoint(0, 10);
		this.createCollisionPoint(0, -10);
		this.createCollisionPoint(7, 7);
		this.createCollisionPoint(7, -7);
	}

	createCollisionPoint(x, y) {
		var dot = new Phaser.Sprite(this.game, x * this.scaleFactor, y * this.scaleFactor, "dot");
		dot.anchor.setTo(0.5, 0.5);
		dot.alpha = 0;
		this.addChild(dot);

		this.dots.push(dot);
	}
}