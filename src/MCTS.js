const MCTSNode = require('./MCTS-node');
const utils = require('./utils');

class MCTS {
	constructor(state, game) {
		this.game = game;
		this.node = new MCTSNode(null, state, null, game);
		this.expand(this.node);
	}

	run() {
		let node = this.select();
		if (node.n_plays !== 1) {
			const moves = this.game.legalMoves(node.state);
			// console.log('>>>> moves.length = ' + moves.length);
			let cnode = this.expand(node);
			// console.log('>>>> node.children.length = ' + node.children.length);
			node = cnode;
		}

		const winner = this.simulate(node);
		this.backpropagate(node, winner);
	}

	selectBestPlay() {
		console.log(
			'>>>> this.node.children.length = ' + this.node.children.length
		);
		this.node.children.forEach(x => {
			x.getUCTLog();
			console.log(x.move, x.n_wins, x.n_plays, x.getUCT(), x.parent.n_plays);
		});
		let i = 0;
		let nbest = this.node.children[i++];
		for (; i < this.node.children.length; i++) {
			let n = this.node.children[i];
			if (nbest.n_wins / nbest.n_plays < n.n_wins / n.n_plays && n.move) {
				nbest = n;
			}
		}
		return nbest.move;
	}

	/** Phase 1, Selection: Select until not fully expanded OR leaf */
	select() {
		let node = this.node;
		while (node.children.length > 0) {
			let imax = 0;
			for (let i = 1; i < node.children.length; i++) {
				if (node.children[imax].getUCT() < node.children[i].getUCT()) {
					imax = i;
				}
			}
			node = node.children[imax];
		}
		return node;
	}

	/** Phase 2, Expansion: Expand a random unexpanded child node */
	expand(node) {
		const moves = this.game.legalMoves(node.state);
		if (moves.length > 0) {
			try {
				moves.map(x => node.expand(x, this.game));
				return node.children[utils.getRndInteger(0, node.children.length - 1)];
			} catch (e) {
				console.log(e);
				throw e;
			}
		}
		return node;
	}

	/** Phase 3, Simulation: Play game to terminal state, return winner */
	simulate(node) {
		let state = node.state;
		while (
			this.game.winner(state) === -1 &&
			this.game.legalMoves(state).length > 0
		) {
			const moves = this.game.legalMoves(state);
			const move = moves[utils.getRndInteger(0, moves.length - 1)];
			try {
				state = this.game.nextState(state, move);
			} catch (e) {
				console.log(e);
				throw e;
			}
		}
		return this.game.winner(state);
	}

	/** Phase 4, Backpropagation: Update ancestor statistics */
	backpropagate(node, winner) {
		while (node !== null) {
			node.n_plays += 1;
			node.n_wins += winner === node.state.playerTurn ? 0 : 1;
			node = node.parent;
		}
	}
}

module.exports = MCTS;
