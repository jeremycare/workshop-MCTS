const utils = require("./utils");
const Game = require("./game");

// function AI(state) {
// 	let gameInst = new Game();
// 	let legalMoves = gameInst.legalMoves(state);
// 	console.log(
// 		"AI played on : ",
// 		legalMoves[utils.getRndInteger(0, legalMoves.length - 1)]
// 	);
// 	return legalMoves[utils.getRndInteger(0, legalMoves.length - 1)];
// }

function intervalFunc() {
	console.log("Cant stop me now!");
}

function AI(state) {
	let gameInst = new Game();
	var keepCalling = true;
	setTimeout(function() {
		keepCalling = false;
	}, 60000);
	console.log();
	while (keepCalling) {}
}

module.exports = AI;
