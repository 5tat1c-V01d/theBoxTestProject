// MVC done?
//Move on to functionality,
// - unit testing
// - AI logic to play against 
// - Touch support (media query)
// - Flexbox/Grid layout (Scales on different screens?)
// - Game State Persistence (If you refersh game continues)
// - Read Me UPDATE
// - Documentation / Comments
// Clearly explain:
//  MVC decisions
//  How AI works
// Even a dev who doesn’t read JS should grasp what’s going on.

import { Game } from './model.js';
import { view } from './view.js';

window.onload = () => {
    const controller = new GameController(view);
    controller.init();
}

class GameController{
	constructor(view) {
		this.view = view; // UI layer
		this.model = null; // Model (Game, Board, etc.)
	}

	init() {
		view.bindButtons(); //Bind event handlers to buttons
		view.buttonClicked = this.resetGame.bind(this); //Link event handlers to function

		view.gameSelected = this.selectGameType.bind(this);
		let game = new Game();  // instantiate Game
		//^^^ should this be const
		game.initialiseGame(); //This method instantiates Board

		//game.setGameType();// This has nothing passed to it yet or binded to it

		view.renderBoard(game.board); // render UI 
		view.clickRegistered = this.handleSpaceClick.bind(this); //Assigns call back function in to views scope
		this.model = game; // this can maybe be removed and put in place of let game
	}
		//async 
		handleSpaceClick(userClickedSpaceId){
		
		if(this.model.state !== "In Progress" || this.model.state === "Draw"){
			//Dont Register the click
			return;
		}

		let board = this.model.board.spaces;
		let spaceClicked = board.find((space) => space.spaceId === userClickedSpaceId);
		let activePlayer = this.model.activePlayer;

		//Send info to takeSpace
			let successfulMoveMade = spaceClicked.takeSpace(this.model.activePlayer);

			if(!successfulMoveMade){
				//stop code from changing player
				view.informUserSpaceTaken(spaceClicked);
				view.resetErrorAnimation(spaceClicked);
				console.log("Space Taken (from handleCLick)")
				return;
			}
			//Draw player on board
			view.drawPlayerOnBoard(activePlayer, userClickedSpaceId)
			//Inform game to count a move being made
			this.model.moveMade();
			
			this.checkGameStatus(userClickedSpaceId, this.model.activePlayer);
	
			this.model.changeTurn()
			//Computer move

			// if(this.model.gameType === "1 Player"){
				
			// 	// let computerSelectedSpace = await this.computerMove();
			// 	view.drawPlayerOnBoard(computerSelectedSpace.playerInSpace, computerSelectedSpace.spaceId)
			// 	this.model.moveMade();
			// 	this.checkGameStatus(computerSelectedSpace.spaceId, this.model.activePlayer);
			// 	this.model.changeTurn()
			// }
	}

	checkGameStatus(spaceId, activePlayer){
		let playerHasWon = this.model.checkWin(spaceId, activePlayer, this.model.board);

		if (playerHasWon === `${activePlayer} Win`) {
			this.model.state = `${activePlayer} Win`;
			view.updateWinStateOnScreen(this.model.board.winningLine);
			view.playWinDing();
		}

		else if(this.model.numOfMovesPlayed === 9){
			this.model.state = "Draw";
			view.updateDrawStateOnScreen(this.model.board.spaces);
		}
	}

	// async computerMove(){
	// 	let computersSpaceChoice = await this.model.computerSelectSpace(this.model.board.spaces);

	// 	computersSpaceChoice.takeSpace(this.model.activePlayer);

	// 	return computersSpaceChoice;
	// }

	selectGameType(typeSelected)
	{	//This method should be within game.
		this.model.gameType = typeSelected;
	}

	resetGame(){
		//Clear Dom
		document.getElementById('board').innerHTML = '';
		//Destory instance of game
		this.model = null;
		//Start a new game
		this.init();
	}
}