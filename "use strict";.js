"use strict";

// Game class to manage the game state and actions
class Game {
  constructor() {
    this.activePlayer = "Crosses";
    this.state = "In Progress";
    this.board = new Board();
  }

  initializeGame() {
    this.board.buildBoard();
  }

  changePlayer() {
    this.activePlayer = this.activePlayer === "Crosses" ? "Naughts" : "Crosses";
  }

  updateWinState() {
    document.getElementById("rightSide").innerHTML = `${this.activePlayer} Wins`;
  }
}

class Board {
  constructor() {
    this.spaces = [];
  }

  buildBoard() {
    const container = document.getElementById("container");
    for (let i = 0; i < 9; i++) {
      const space = new Space(i);
      this.spaces.push(space);
      this.createSpaceHTML(i, container);
    }
    makeXYCoords(this);
  }

  createSpaceHTML(i, container) {
    const space = this.spaces[i];
    const htmlString = `
      <div id="space${i}" class="blackBackground" onclick="game.board.spaces[${i}].takeSpace()">
        <div id="spaceForeground${i}">
          <div id="spaceForegroundTwo${i}"></div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML(i === 0 ? "afterbegin" : "beforeend", htmlString);
  }
}

class Space {
  constructor(spaceNumber) {
    this.spaceId = spaceNumber;
    this.x = 0;
    this.y = 0;
    this.playerInSpace = "";
  }

  takeSpace() {
    if (this.playerInSpace === "") {
      addPlayerSymbol(this.spaceId);
      this.playerInSpace = game.activePlayer;
      checkWin(this.spaceId, game.activePlayer);
      game.changePlayer();
    } else {
      console.log("Space already taken!");
    }
  }
}

function addPlayerSymbol(spaceId) {
  const space = document.getElementById(`spaceForeground${spaceId}`);
  const spaceTwo = document.getElementById(`spaceForegroundTwo${spaceId}`);
  if (game.activePlayer === "Crosses") {
    toggleClass(space, 'cross');
  } else {
    toggleClass(space, 'naughtOuter');
    toggleClass(spaceTwo, 'naughtInner');
  }
}

//This is good
function toggleClass(element, className) {
  const classList = element.classList;
  if (classList.contains(className)) {
    classList.remove(className);
  } else {
    classList.add(className);
  }
}

function checkWin(spaceId, activePlayer) {
  if (checkWinHorizontal(spaceId, activePlayer) ||
    checkWinVertical(spaceId, game.board, activePlayer) ||
    checkWinDiagonal(spaceId, game.board, activePlayer)) {
    game.state = `${activePlayer} Win`;
    game.updateWinState();
  }
}

function checkWinHorizontal(spaceId, activePlayer) {
  const row = game.board.spaces.filter(space => space.y === game.board.spaces[spaceId].y);
  return row.every(space => space.playerInSpace === activePlayer);
}

function checkWinVertical(spaceId, currentBoard, activePlayer) {
  const col = currentBoard.spaces.filter(space => space.x === currentBoard.spaces[spaceId].x);
  return col.every(space => space.playerInSpace === activePlayer);
}

function checkWinDiagonal(spaceId, currentBoard, activePlayer) {
  const diagonals = [
    [0, 4, 8],
    [2, 4, 6]
  ];
  return diagonals.some(diagonal => diagonal.includes(spaceId) &&
    diagonal.every(index => currentBoard.spaces[index].playerInSpace === activePlayer));
}

function makeXYCoords(board) {
  let num = 0;
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      board.spaces[num].x = i;
      board.spaces[num].y = j;
      num++;
    }
  }
}

// Game setup
let game = new Game();
window.onload = () => game.initializeGame();
