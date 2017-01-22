import Util from "./../Util.js";

export default class UI extends Phaser.Group {

	constructor(game, scaleFactor, logicalViewportRect) {
		super(game);

		this.logicalViewportRect = logicalViewportRect;
		this.scaleFactor = scaleFactor;

		const fontSize = 23 * scaleFactor;
		const style = {
			font:  (fontSize + "px Arial"),
			align: "center",
			fill:  "#fff",
			fontWeight: "bold"
		};

		const halfWidth = Util.physicalToLocal(this.game.width / 2);
		const halfHeight = Util.physicalToLocal(this.game.height / 2);

		this.scoreLabel = new Phaser.Text(
			game,
			0,
			Util.localToPhysical(-halfHeight + 7),
			0,
			style
		);
		this.add(this.scoreLabel);
		
		this.gameOverPrompt = this.create(
			0,
			Util.localToPhysical(-halfHeight + 95),
			"gameOver"
		);
		this.gameOverPrompt.anchor.setTo(0.5, 0.5);

		this.getReadyPrompt = this.create(
			0,
			Util.localToPhysical(-halfHeight + 95),
			"getReady"
		);
		this.getReadyPrompt.anchor.setTo(0.5, 0.5);

		this.startPrompt = this.create(
			0,
			Util.localToPhysical(-halfHeight + 243),
			"startPrompt"
		);
		this.startPrompt.anchor.setTo(0.5, 0.5);

		this.screenFlash = this.create(
			0,
			0,
			"screenFlash"
		);
		this.screenFlash.anchor.setTo(0.5, 0.5);

		this.flashTween = this.game.add.tween(this.screenFlash).to({alpha: 0}, 200, Phaser.Easing.Cubic.Out);

		this.getReady();

		this.resize(logicalViewportRect, scaleFactor);
	}

	updateScore(score) {
		this.scoreLabel.text = score.toString();
	}

	getReady() {
		this.gameOverPrompt.visible = false;
		this.getReadyPrompt.visible = true;
		this.startPrompt.visible = true;
		this.screenFlash.visible = false;
	}

	gameStart() {
		this.gameOverPrompt.visible = false;
		this.getReadyPrompt.visible = false;
		this.startPrompt.visible = false;
		this.screenFlash.visible = false;
		this.updateScore(0);
	}

	gameOver() {
		this.gameOverPrompt.visible = true;
		this.getReadyPrompt.visible = false;
		this.startPrompt.visible = true;
	}

	triggerScreenFlash() {
		this.screenFlash.visible = true;
		this.screenFlash.alpha = 1;
		this.flashTween.start();
	}

	resize(logicalViewportRect, scaleFactor) {
		const availableWidth = logicalViewportRect.width * scaleFactor;
		const gameWidth = this.game.width;
		const availableHeight = logicalViewportRect.height * scaleFactor;
		const gameHeight = this.game.height;
		const uiScaleFactor = Math.min(availableWidth / gameWidth, availableHeight / gameHeight);
		this.scale.setTo(uiScaleFactor, uiScaleFactor);

		if (uiScaleFactor < 1) {
			var newScaleFactor = Math.max(availableWidth / gameWidth, availableHeight / gameHeight);
			newScaleFactor = 1 / uiScaleFactor;
			this.screenFlash.scale.setTo(newScaleFactor, newScaleFactor);
		} else {
			this.screenFlash.scale.setTo(1, 1)
		}
	}
}
