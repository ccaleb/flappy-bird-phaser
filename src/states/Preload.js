import Util from "./../Util.js";
import Ground from "./../Prefabs/Ground.js";

export default class Preload {

	preload() {
		var background = this.add.sprite(this.game.width / 2, this.game.height / 2, "background");
		background.anchor.setTo(0.5, 0.5);

		var ground = new Ground(this.game, Util.scaleFactor, 0);
		ground.position.y = this.game.height - ground.height;
		this.game.add.existing(ground);

		this.load.atlasXML("bird", Util.imagePath + "flappy.png", Util.imagePath + "flappy.xml");
		this.load.image("pipeBottom", Util.imagePath + "pipe-bottom.png");
		this.load.image("pipeTop", Util.imagePath + "pipe-top.png");
		this.load.image("dot", Util.imagePath + "dot.png");
		this.load.image("gameOver", Util.imagePath + "game-over.png");
		this.load.image("getReady", Util.imagePath + "get-ready.png");
		this.load.image("screenFlash", Util.imagePath + "screen-flash.png");
		this.load.image("startPrompt", Util.imagePath + "start-prompt.png");
		this.load.audio("flap", ["assets/audio/wav/flap.wav", "assets/audio/wav/flap.mp3"]);
		this.load.audio("hit", ["assets/audio/wav/hit.wav", "assets/audio/wav/hit.mp3"]);
		this.load.audio("point", ["assets/audio/wav/point.wav", "assets/audio/wav/point.mp3"]);
	}

	create() {
		this.game.state.start("game");
	}

}