import Util from "./Util.js";
import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";

var game;

window.onload = function() {

	game = new Phaser.Game(
		300 * Util.scaleFactor,
		400 * Util.scaleFactor,
		Phaser.AUTO, "game"
	);

	game.state.add("boot", Boot);
	game.state.add("preload", Preload);
	game.state.add("game", Game);
	game.state.start("boot");
}
