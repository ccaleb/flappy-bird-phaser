const MAX_SLICES = 3;
const GROUND_KEY = "ground";

export default class Ground extends Phaser.Group {

	constructor(game, scaleFactor, scrollSpeed) {
		super(game);

		this.scrolling = false;
		this.slices = [];
		this.scrollSpeed = scrollSpeed * scaleFactor;
		this.sliceWidth = this.getGroundSliceWidth();
		this.leftBounds = 0 - this.sliceWidth;

		for (var i = 0; i < MAX_SLICES; i++) {
			this.slices.push(this.create(this.sliceWidth * i, 0, GROUND_KEY))
		}
	}

	update() {
		if (this.scrolling == true) {
			this.updateSlicePositions();
			this.checkLeftSliceIsOutsideScreen();
		}
	}

	startScrolling() {
		this.scrolling = true;
	}

	stopScrolling() {
		this.scrolling = false;
	}

	getGroundSliceWidth() {
		var ground = this.game.cache.getItem(GROUND_KEY, Phaser.Cache.IMAGE);
		return ground.data.width;
	}

	isBirdTouchingGround(bird) {
		for (var i = 0; i < this.slices.length; i++) {
			if (bird.overlap(this.slices[i])) {
				return true;
			}
		}

		return false;
	}

	updateSlicePositions() {
		for (var i = 0; i < this.slices.length; i++) {
			var slice = this.slices[i];
			slice.x -= this.scrollSpeed;
		}
	}

	checkLeftSliceIsOutsideScreen() {
		const firstSlice = this.slices[0];
		const lastSlice = this.slices[MAX_SLICES - 1];
		if (firstSlice.x < this.leftBounds) {
			firstSlice.x = lastSlice.x + this.sliceWidth;
			this.slices.shift();
			this.slices.push(firstSlice);
		}
	}

}