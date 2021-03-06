const clone = require('clone')
const Game = require('./game')
const playPlayer = require('./player')
const playAi = require('./AI')

const gameInst = new Game()
state = gameInst.start()

console.log('Game Started !')

while (gameInst.winner(state) == -1 && gameInst.legalMoves(state).length > 0) {
	gameInst.printBoard(state)
	const readMove = state.playerTurn == 2 ? playPlayer : playAi
	const move = readMove(state)
	console.log('Move -> ', move)
	state = gameInst.nextState(state, move)
}
gameInst.printBoard(state)
console.log(gameInst.winner(state))
gameInst.winner(state) !== -1
	? console.log(
			'Winner is : ' + (gameInst.winner(state) == 1 ? 'AI !' : 'PLAYER !')
	  )
	: console.log('DRAW !')
