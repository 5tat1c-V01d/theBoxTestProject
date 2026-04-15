"use strict";
import {Board, Space} from './board.js';
import {checkWinHorizontal, checkWinVertical, checkWinDownDiagonal, checkWinUpDiagonal, makeXYCoords} from './gameRules.js';
export class Game {
	constructor() {
		this.activePlayer = "Crosses";
		this.state = "In Progress";
		this.board = "";
		this.numOfMovesPlayed = 0;
		this.gameType = ""; //TODO: make this a changible thing
	}

	initialiseGame() {
		this.board = new Board();

		for (let i = 0; i < 9; i++) {
			let space = new Space(i);
			this.board.spaces.push(space);
		}
		makeXYCoords(this.board);
		return this.board;	
	}


	moveMade(){
		this.numOfMovesPlayed++;
	}

	setGameTypeModel(numPlayers) {
		this.gameType = numPlayers;
	}

	checkWin(spaceId, activePlayer, board) {

		const winCheckers = [
			() => checkWinHorizontal(board, activePlayer),
			() => checkWinVertical(spaceId, board, activePlayer),
			() => checkWinDownDiagonal(spaceId, board, activePlayer),
			() => checkWinUpDiagonal(board, activePlayer),
		];

		for(const check of winCheckers){
			const result = check();
			if(result.hasWon){
				this.board.winningLine = result.winningLine;
				return `${activePlayer} Win`;	
			}
		}
	}

	// async computerSelectSpace(currentBoard){
	// 		// doing timing is probably breaching solid
	// 	await timer();
	// 	// let computersSpaceChoice = this.model.computerSelectSpace(this.model.board.spaces);
	// 	// computersSpaceChoice.takeSpace(this.model.activePlayer);
	// 	// return computersSpaceChoice;

	// 	const availableSpaces = currentBoard.filter(space => space.playerInSpace ==="")
		
	// 	const randomIndex = Math.floor(Math.random() * availableSpaces.length);
	// 	const computerSlectedSpace = availableSpaces[randomIndex];

	// 	return computerSlectedSpace;

	// }

	changeTurn(){
		this.activePlayer = (this.activePlayer === "Crosses") ? "Naughts" : "Crosses";
	}
}

//enum
// const GameState = Object.freeze({
// 	IN_PROGRESS: "In Progress",
// 	CROSSES_WINS: "Crosses Wins",
// 	NAUGHTS_WINS: "Naughts Wins",
// 	DRAW: "Draw"
//   });






//-----------------------CHeck Wins



// function delay(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function timer(){
// 	console.log("Thinking...");

// 	await delay(5000); // wait 2 seconds

// 	console.log("Computer moved!");
// }

