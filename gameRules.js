"use strict";


export function checkWinHorizontal(board, activePlayer){

	let currentBoard = board.spaces;

	//find whereis the same as active player player
	let playerPostions = currentBoard.filter(space => space.playerInSpace === activePlayer);
	//check all x values are the same (could maybe refactor to get rid of helper method)
	let playerAndHorizontal = playerPostions.filter(findHorizontal);

	const hasWon = playerAndHorizontal.length === 3;
	const winningLine = hasWon ? playerAndHorizontal : [];

	return {hasWon, winningLine};
}

function findHorizontal(space, index, playerPostions){

	//This method checks if it has a space with a matching x value on EITHER SIDE
	
		//
		let xRight = playerPostions[index + 1];
		let xLeft = playerPostions[index - 1];
		let hasPlayerRight = false;
		let hasPlayerLeft = false;
	
		if (xRight != undefined) {
			if (xRight.x === space.x) {
				hasPlayerRight = true;
			}	
		}
		if (xLeft != undefined) {
			if (xLeft.x === space.x) {
				hasPlayerLeft = true;
			}	
		}
		return hasPlayerLeft || hasPlayerRight;
	}

export function checkWinDownDiagonal(spaceId, currentBoard, activePlayer){
	let verticalLine = [];
	let hasWon = false;
	let selectedSpace;	
	let winningLine = [];
///////////DIAGONAL!!!!!!
	//Grab currently selected space for var making
	currentBoard.spaces.forEach(spaceElement => {
			if (spaceElement.spaceId  === spaceId) {
				//This makes a variable from the currently selected Space
				selectedSpace = spaceElement;
			}
	});
//This is checking for the vertical shape but also the active player
	currentBoard.spaces.forEach(spaceElement => {
		if (spaceElement.y === spaceElement.x  
			&& spaceElement.playerInSpace  === `${activePlayer}`) {
			verticalLine.push(spaceElement);		
		}
	});

	if (verticalLine.length === 3) {
		hasWon = true;
		winningLine = verticalLine;

	}
	return {hasWon, winningLine};
}

export function checkWinUpDiagonal(currentBoard, activePlayer){

	let verticalLine = [];
	let hasWon = false;
	let winningLine = [];
	
//This is checking for the vertical shape but also the active player
	currentBoard.spaces.forEach(spaceElement => {
		if (spaceElement.y + spaceElement.x === 4 
			&& spaceElement.playerInSpace  === `${activePlayer}`) {
			verticalLine.push(spaceElement);		
		}
	});

	if (verticalLine.length === 3) {
		hasWon = true;
		winningLine = verticalLine;
	}

	return {hasWon, winningLine};
}



export function checkWinVertical(spaceId, currentBoard, activePlayer){

	let verticalLine = [];
	let hasWon = false;
	let winningLine = [];
	const selectedSpace = currentBoard.spaces.find(space => space.spaceId === spaceId);
	console.log("FromCheckWinVertical", selectedSpace);
	
	//This is checking for the vertical shape but also the active player
	currentBoard.spaces.forEach(spaceElement => {
		if (spaceElement.y === selectedSpace.y && spaceElement.playerInSpace  === `${activePlayer}`) {
			verticalLine.push(spaceElement);		
		}
	});

	if (verticalLine.length === 3) {
		hasWon = true;
		winningLine = verticalLine;
	}

	return {hasWon, winningLine};
}

export function makeXYCoords(board) {
	let num = 0;

	for (let i = 1; i < 4; i++) {
		for (let j = 1; j < 4; j++) {
		  board.spaces[num].x = i;
		  board.spaces[num].y = j;
		  num++;
		}
	  }
}