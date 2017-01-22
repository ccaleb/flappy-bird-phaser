import Util from "./../Util.js";

const NO_SCALE    = "no_scale";
const ASPECT_FILL = "aspect_fill"; // Part of the scene may be cropped.
const ASPECT_FIT  = "aspect_fit";  // There may be a border.

export default class Boot {

	preload() {
		this.load.image("background", Util.imagePath + "background.png");
		this.load.image("ground", Util.imagePath + "ground.png");
		this.initSize();
	}

	create() {
		this.game.input.maxPointers = 1;
		this.game.state.start("preload");
	}

	initSize() {
		this.resize();
		$(window).resize(this.performDelayedResize.bind(this));
	}

	resize() {
		this.stopSetInterval();
		this.resizeCanvas();
		this.resizeCurrentState();
	}

	performDelayedResize() {
		this.stopSetInterval();
		this.intervalId = setInterval(this.resize.bind(this), 50);
	}

	stopSetInterval() {
		if (this.intervalId != null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	resizeCanvas() {
		if (this.game.device.desktop == true) {
    		/*this.resizeCanvasUsingMode(NO_SCALE);
    		this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;*/
			if (this.game.scale.isPortrait) {
				this.resizeCanvasUsingMode(ASPECT_FILL);
			} else {
				this.resizeCanvasUsingMode(ASPECT_FIT);
			}
		} else {
			if (this.game.scale.isPortrait) {
				this.resizeCanvasUsingMode(ASPECT_FILL);
			} else {
				this.resizeCanvasUsingMode(ASPECT_FIT);
			}
		}
	}

	resizeCanvasUsingMode(mode) {

		if (mode == NO_SCALE) {
			this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
			return;
		}

		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

		// Get the game dimensions and the browser dimensions.
		var gameWidth = this.game.width;
		var gameHeight = this.game.height;
		var screenWidth = window.innerWidth;
		var screenHeight = window.innerHeight;

		// Determine the scale factor based on those dimensions.
		var scaleFactor = 1;
		if (mode == ASPECT_FILL) {
			scaleFactor = Math.max(screenWidth / gameWidth, screenHeight / gameHeight);
		} else if (mode == ASPECT_FIT) {
			scaleFactor = Math.min(screenWidth / gameWidth, screenHeight / gameHeight);
		}
		
		// Scale the canvas to fit the screen.
		Util.canvasScaleFactor = scaleFactor;
		this.game.scale.setUserScale(scaleFactor, scaleFactor, 0, 0);

		// Position the canvas on the screen so that it is centred horiontally.
		var scaledGameWidth = gameWidth * scaleFactor;
		var deltaX = ((screenWidth - scaledGameWidth) / 2);
		$("canvas").css("position", "relative");
		$("canvas").css("left", (deltaX + "px"));

		// Position the canvas on the screen so that it is centred vertically.
		var scaledGameHeight = gameHeight * scaleFactor;
		var deltaY = ((screenHeight - scaledGameHeight) / 2);
		$("canvas").css("top", (deltaY + "px"));

		Util.logicalViewportRect = this.createViewportRect(deltaX, deltaY, gameWidth, gameHeight, Util.scaleFactor);
	}

	resizeCurrentState() {
		var currentStateKey = this.game.state.current;
		var currentState = this.game.state.states[currentStateKey];
		if (currentStateKey != "boot" && currentState.resize != null) {
			currentState.resize(Util.logicalViewportRect, Util.scaleFactor);
		}
	}

	createViewportRect(canvasX, canvasY, gameWidth, gameHeight, scaleFactor) {
		if (scaleFactor == null) {
			scaleFactor = 1;
		}
		if (canvasX > 0) {
			canvasX = 0;
		}

		if (canvasY > 0) {
			canvasY = 0;
		}

		canvasX /= scaleFactor;
		canvasY /= scaleFactor;
		gameWidth /= scaleFactor;
		gameHeight /= scaleFactor;

		return new Phaser.Rectangle(-canvasX, -canvasY, gameWidth + (canvasX * 2), gameHeight + (canvasY * 2));
	}
}