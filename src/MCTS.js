const MCTSNode = require('./MCTS-node')
const utils = require('./utils')

class MCTS {
	constructor(state, game) {
		this.game = game
		this.node = new MCTSNode(null, state, null, game)
		this.expand(this.node)
	}

	run() {
		let node = this.select()
		if (node.n_plays !== 1) {
			let cnode = this.expand(node)
			node = cnode
		}

		const winner = this.simulate(node)
		this.backpropagate(node, winner)
	}

	selectBestPlay() {
		let i = 0
		let nbest = this.node.children[i++]
		this.logPossibleMoves()
		for (; i < this.node.children.length; i++) {
			let n = this.node.children[i]
			if (nbest.n_wins / nbest.n_plays < n.n_wins / n.n_plays) {
				nbest = n
			}
		}
		return nbest.move
	}

	logPossibleMoves() {
		console.log('Playerturn', this.node.state.playerTurn)
		this.node.children.forEach(x => {
			// x.getUCTLog()
			console.log(
				'move',
				x.move,
				'n_wins',
				x.n_wins,
				'n_plays',
				x.n_plays,
				'uct',
				x.getUCT(),
				'parent n_plays',
				x.parent.n_plays
			)
		})
	}

	/** Phase 1, Selection: Select until not fully expanded OR leaf */
	select() {}

	/** Phase 2, Expansion: Expand a random unexpanded child node */
	expand(node) {}

	/** Phase 3, Simulation: Play game to terminal state, return winner */
	simulate(node) {}

	/** Phase 4, Backpropagation: Update ancestor statistics */
	backpropagate(node, winner) {}
}

module.exports = MCTS
