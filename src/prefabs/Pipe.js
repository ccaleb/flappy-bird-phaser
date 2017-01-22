const TOP_KEY = "pipeTop";
const BOTTOM_KEY = "pipeBottom";
const V_GAP = 98;

export default class Pipe extends Phaser.Group {

	constructor(game, scaleFactor) {
		super(game);

		var height = this.getPipeHeight();
		
		var gap = V_GAP * scaleFactor;
		
		this.topPipe = this.create(0, -(height + gap), TOP_KEY);
		this.topPipe.anchor.setTo(0.5, 1);

		this.bottomPipe = this.create(0, 0, BOTTOM_KEY);
		this.bottomPipe.anchor.setTo(0.5, 1);
	}

	getPipeHeight() {
		var ground = this.game.cache.getItem(BOTTOM_KEY, Phaser.Cache.IMAGE);
		return ground.data.height;
	}

	hitTest(bird) {
		return (this.topPipe.overlap(bird) || this.bottomPipe.overlap(bird));
	}

}