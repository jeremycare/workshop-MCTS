const utils = require("./utils");
const clone = require("clone");

class Game {
	start() {
		// TODO
		let state = {
			board: [
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0]
			],
			playerTurn: 2, //utils.getRndInteger(1, 2),
			moves: [0, 1, 2, 3, 4, 5, 6],
			winner: -1,
			turn: 20
		};
		return state;
	}

	legalMoves(state) {
		return state.moves;
	}

	checkWin(state, y, x) {
		if (state.turn < 7 || state.board[y][x] == 0) {
			return false;
		}
		let testAlign = [
			[[-1, -1], [1, 1]],
			[[0, -1], [0, 1]],
			[[-1, 0], [1, 0]],
			[[1, -1], [-1, 1]]
		];

		for (let i = 0; i < testAlign.length; i++) {
			let score = 1;
			for (let j = 0; j < testAlign[i].length; j++) {
				for (let k = 1; k < 4; k++) {
					let offsetX = testAlign[i][j][0] * k + x;
					let offsetY = testAlign[i][j][1] * k + y;
					if (
						offsetY < 0 ||
						offsetY >= state.board.length ||
						offsetX < 0 ||
						offsetX >= state.board[offsetY].length ||
						state.board[offsetY][offsetX] != state.board[y][x]
					) {
						break;
					}
					score++;
				}
			}
			if (score >= 4) {
				state.winner = state.board[y][x];
				return;
			}
		}
	}

	nextState(state, move) {
		if (!state.moves.includes(move)) {
			throw "Invalid move :\n" +
				"\t- moves available : [" +
				state.moves +
				"]\n\t- move : " +
				move;
		}
		let newState = clone(state);
		let i = 0;
		for (; i < newState.board.length; i++) {
			if (newState.board[i][move] != 0) {
				break;
			}
		}
		newState.board[i - 1][move] = newState.playerTurn;
		this.checkWin(newState, i - 1, move);
		newState.playerTurn = (newState.playerTurn % 2) + 1;
		if (i == 1) {
			newState.moves = newState.moves.filter(x => x != move);
		}
		newState.turn++;
		return newState;
	}

	winner(state) {
		return state.winner;
	}

	printBoard(state) {
		console.log("\n");
		let print = state.board.map(x => x.join("-"));
		print.map(x => console.log("|" + x + "|"));
		console.log("\n");
	}
}

module.exports = Game;
