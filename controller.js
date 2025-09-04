// MVC done?
//Move on to functionality,
// - unit testing
// - AI logic to play against 
// - Touch support (media query)
// - Flexbox/Grid layout (Scales on different screens?)
// - Game State Persistence (If you refersh game continues)
// - Read Me
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
		this.view = view;           // UI layer
		this.model = null;          // Model (Game, Board, etc.)
	}

	init() {
		view.bindButtons(); //Bind event handlers to buttons
		view.buttonClicked = this.resetGame.bind(this); //Link event handlers to function
		let game = new Game();  // instantiate Game
		game.initialiseGame(); //This method instantiates Board
		view.renderBoard(game.board); // render UI 
		view.clickRegistered = this.handleSpaceClick.bind(this); //Assigns call back function in to views scope
		this.model = game; // this can maybe be removed and put in place of let game
	}

	handleSpaceClick(spaceId){
		
		if(this.model.state !== "In Progress"){
			return;
		}

		let board = this.model.board.spaces;
		let spaceClicked = board.find((space) => space.spaceId === spaceId);
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
			view.drawPlayerOnBoard(activePlayer, spaceId)
			
			this.checkGameStatus(spaceId, this.model.activePlayer);
	
			this.model.changeTurn()
		
	}

	checkGameStatus(spaceId, activePlayer){
		let playerHasWon = this.model.checkWin(spaceId, activePlayer, this.model.board);

		if (playerHasWon === `${activePlayer} Win`) {
			this.model.state = `${activePlayer} Win`;
			view.updateWinStateOnScreen(this.model.board.winningLine);
			view.playWinDing();
		}
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