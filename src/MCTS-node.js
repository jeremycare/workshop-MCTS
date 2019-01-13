class MCTSNode {
	constructor(move, state, parent, game) {
		this.move = move;
		this.state = game.nextState(state, move);

		this.n_plays = 0;
		this.n_wins = 0;

		this.parent = parent;
		this.children = [];
		this.legalMoves = game.legalMoves(this.state);
	}

	childNode(move) {
		return this.children.find(x => x.move === move);
	}

	expand(move, game) {
		this.children.push(new MCTSNode(move, this.state, this, game));
	}

	allNodes() {
		return this.legalMoves;
	}

	isLeaf() {
		return this.legalMoves.length === 0;
	}

	/** Get the UCB1 value for this node. */
	getUCT() {
		// TODO
		// return number
	}
}

module.exports = MCTSNode;
