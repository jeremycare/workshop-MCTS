const readline = require('readline-sync');
const Game = require('./game');
const MCTS = require('./MCTS');

function playPlayer(state) {
	const gameInst = new Game();
	const mcts = new MCTS(state, gameInst);
	const startTime = new Date();
	let i = 0;
	while (new Date() - startTime < 1000) {
		mcts.run(state);
		i++;
	}
	console.log(i);
	return mcts.selectBestPlay();
}
// 	console.log("player start");
// 	const gameInst = new Game();
// 	const lm = gameInst.legalMoves(state);
// 	let move = -1;
// 	while (!lm.includes(move)) {
// 		if (move != -1 && !lm.includes(move))
// 			console.log("\x1b[31m%s\x1b[0m", "Invalid Move !");
// 		move = parseInt(
// 			readline.question(
// 				"Your turn ! \nWhere do you wanna Play ? (moves available : [" +
// 					lm +
// 					"]) :\n"
// 			)
// 		);
// 	}
// 	console.log("player end");
// 	return move;
// }

module.exports = playPlayer;
