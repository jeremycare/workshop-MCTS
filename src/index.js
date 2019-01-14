const clone = require('clone');
const Game = require('./game');
const playPlayer = require('./player');
const playAi = require('./AI');

const gameInst = new Game();
const state = gameInst.start();

console.log('Game Started !');

while (gameInst.winner(state) == -1) {
	gameInst.printBoard(state);
	const readMove = state.playerTurn == 2 ? playPlayer : playAi;
	state = gameInst.nextState(state, readMove(state));
}

console.log(
	'Winner is : ' + (gameInst.winner(state) == 1 ? 'AI !' : 'PLAYER !')
);
