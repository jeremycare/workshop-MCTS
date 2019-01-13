const MCTSNode = require("./MCTS-node");

class MCTS {
	constructor(game) {
		this.game = game;
		this.nodes = [];
	}

	run(state) {
		// TODO
	}

	selectBestPlay() {
		// TODO
	}

	/** Phase 1, Selection: Select until not fully expanded OR leaf */
	select(state) {
		// TODO
		// return node
	}

	/** Phase 2, Expansion: Expand a random unexpanded child node */
	expand(node) {
		// TODO
		// return childNode
	}

	/** Phase 3, Simulation: Play game to terminal state, return winner */
	simulate(node) {
		// TODO
		// return winner
	}

	/** Phase 4, Backpropagation: Update ancestor statistics */
	backpropagate(node, winner) {
		// TODO
	}

	makeNodes(state) {
		this.nodes = this.game
			.legalMoves(state)
			.map(x => new MCTSNode(x, state, null, this.game));
	}
}

module.exports = MCTS;
