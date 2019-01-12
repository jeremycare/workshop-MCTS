let clone = require("clone");
let Game = require("./game");
let Player = require("./player");
let AI = require("./AI");

let gameInst = new Game();
let state = gameInst.start();

console.log("Game Started !");

while (gameInst.winner(state) == -1) {
	gameInst.printBoard(state);
	if (state.playerTurn == 1) {
		state = gameInst.nextState(state, AI(state));
	} else {
		state = gameInst.nextState(state, Player(state));
	}
}

console.log(state);
console.log(
	"Winner is : " + (gameInst.winner(state) == 1 ? "AI !" : "PLAYER !")
);
