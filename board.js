"use strict";

export class Board{
	constructor(){
		this.spaces = [];
		this.winningLine = [];
		//this.full = false;
	}
}

export class Space{
	constructor(spaceNumber){
		this.spaceId = spaceNumber;
		this.x = 0;
		this.y = 0;
		this.playerInSpace = "";
	}

	takeSpace (activePlayer){

		if(this.playerInSpace !== ""){
			return false;
		}
		this.playerInSpace = activePlayer;
		return true;
		};
}