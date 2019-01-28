const assert = require('assert')

class MCTSNode {
	constructor(move, state, parent, game) {
		this.move = move
		this.state = move !== null ? game.nextState(state, move) : state

		this.n_plays = 1
		this.n_wins = 0

		this.parent = parent
		this.children = []
		this.legalMoves = game.legalMoves(this.state)
	}

	childNode(move) {
		return this.children.find(x => x.move === move)
	}

	expand(move, game) {
		this.children.push(new MCTSNode(move, this.state, this, game))
	}

	allNodes() {
		return this.legalMoves
	}

	isLeaf() {
		return this.legalMoves.length === 0
	}

	/** Get the UCB1 value for this node. */
	getUCT() {
		return (
			this.n_wins / this.n_plays +
			Math.sqrt(2) * Math.sqrt(Math.log(this.parent.n_plays) / this.n_plays)
		)
	}

	getUCTLog() {
		console.log(
			'Utc',
			Math.round((this.n_wins / this.n_plays) * 100) + '%',
			this.n_plays,
			this.parent.n_plays,
			this.n_wins / this.n_plays,
			Math.sqrt(Math.log(this.parent.n_plays) / this.n_plays)
		)
	}
}

module.exports = MCTSNode
