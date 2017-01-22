export default class Util {

	static localToPhysical(value) {
		return Util.scaleFactor * value;
	}

	static localPointToPhysical(point) {
		return {
			x: Util.scaleFactor * point.x,
			y: Util.scaleFactor * point.y
		}
	}

	static physicalToLocal(value) {
		return value / Util.scaleFactor;
	}

	static physicalPointToLocal(point) {
		return {
			x: point.x / Util.scaleFactor,
			y: point.y / Util.scaleFactor
		}
	}

	static get scaleFactor() {
		if (Util._scaleFactor == null) {
			Util._scaleFactor = Math.floor(window.devicePixelRatio);
		}
		return Util._scaleFactor;
	}

	static get imagePath() {
		var folder = "x1";
		if (Util.scaleFactor >= 3) {
			folder = "x3";
		} else if (Util.scaleFactor >= 2) {
			folder = "x2";
		} else {
			folder = "x1";
		}

		return "assets/images/" + folder + "/";
	}

	static set canvasScaleFactor(value) {
		Util._canvasScaleFactor = value;
	}

	static get canvasScaleFactor() {
		return Util._canvasScaleFactor;
	}

	static set logicalViewportRect(rect) {
		Util._logicalViewportRect = rect;
		Util._physicalViewportRect = new Phaser.Rectangle(
			rect.x * Util.scaleFactor,
			rect.y * Util.scaleFactor,
			rect.width * Util.scaleFactor,
			rect.height * Util.scaleFactor
		);
	}

	static get logicalViewportRect() {
		return Util._logicalViewportRect;
	}

	static set physicalViewportRect(rect) {
		Util._physicalViewportRect = rect;
		Util._logicalViewportRect = new Phaser.Rectangle(
			rect.x / Util.scaleFactor,
			rect.y / Util.scaleFactor,
			rect.width / Util.scaleFactor,
			rect.height / Util.scaleFactor
		);
	}

	static get physicalViewportRect() {
		return Util._physicalViewportRect;
	}

}

Util._scaleFactor = null;