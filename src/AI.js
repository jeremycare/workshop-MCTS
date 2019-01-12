let utils = require("./utils");
let Game = require("./game");

function AI(state) {
	let gameInst = new Game();
	let legalMoves = gameInst.legalMoves(state);
	console.log(
		"AI played on : ",
		legalMoves[utils.getRndInteger(0, legalMoves.length - 1)]
	);
	return legalMoves[utils.getRndInteger(0, legalMoves.length - 1)];
}

module.exports = AI;
