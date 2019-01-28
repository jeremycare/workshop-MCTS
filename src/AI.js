const utils = require('./utils')
const Game = require('./game')
const MCTS = require('./MCTS')

const RANDOM = true

if (RANDOM) {
	function playAi(state) {
		const gameInst = new Game()
		const legalMoves = gameInst.legalMoves(state)
		console.log(
			'AI played on : ',
			legalMoves[utils.getRndInteger(0, legalMoves.length - 1)]
		)
		return legalMoves[utils.getRndInteger(0, legalMoves.length - 1)]
	}
} else {
	function playAi(state) {
		const gameInst = new Game()
		const mcts = new MCTS(state, gameInst)
		const startTime = new Date()
		let i = 0
		while (new Date() - startTime < 1000) {
			mcts.run(state)
			i++
		}
		console.log('Ai simulated :', i)
		return mcts.selectBestPlay()
	}
}

module.exports = playAi
