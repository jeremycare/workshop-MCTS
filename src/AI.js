const utils = require("./utils");
const Game = require("./game");
const MCTS = require("./MCTS");

function playAi(state) {
	const gameInst = new Game();
	const legalMoves = gameInst.legalMoves(state);
	console.log(
		"AI played on : ",
		legalMoves[utils.getRndInteger(0, legalMoves.length - 1)]
	);
	return legalMoves[utils.getRndInteger(0, legalMoves.length - 1)];
}

// function playAi(state) {
// 	const gameInst = new Game();
// 	const mcts = new MCTS(gameInst);
// 	mcts.makeNodes(state);
// 	const startTime = new Date();
// 	while (new Date() - startTime < 3000) {
// 		mcts.run(state);
// 	}
// 	return mcts.selectBestPlay();
// }

module.exports = playAi;
