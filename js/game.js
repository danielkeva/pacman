'use strict';
var WALL = '◽';
var FOOD = '▫';
var EMPTY = ' ';
var SUPER_FOOD = '🥑';
var CHERRY = '🍒'
var gFoodCount;
var gFoodCollectedCount;
var gBoard;
var gIntervalCherry;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gGame.score = 0
  gIntervalCherry = setInterval(addCherry, 5000)
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  gFoodCount = getFoodCount()
  gFoodCollectedCount = 0
  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  document.querySelector('.loss').hidden = true;
  document.querySelector('.win').hidden = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === SIZE - 2 && j === SIZE - 2 || i === 1 && j === SIZE - 2 || i === SIZE - 2 && j === 1) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  if (isVictory()) {
    gameWon()
  }
}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  document.querySelector('.loss').hidden = false;
  clearInterval(gIntervalCherry)
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}

function isVictory() {
  return (gFoodCount === gFoodCollectedCount)
}


function getFoodCount() {
  var foodCount = 0;
  for (var i = 1; i < gBoard.length - 1; i++) {
    for (var j = 1; j < gBoard[0].length - 1; j++)
      if (gBoard[i][j] === FOOD) {
        foodCount++
      }
  }
  return foodCount;
}

function gameWon() {
  document.querySelector('.win').hidden = false;
  gGame.isOn = false;
  clearInterval(gIntervalCherry);
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}




function addCherry() {
  var emptyCells = getEmptyCells();
  var rndIdx = getRandomIntInclusive(0, emptyCells.length - 1);
  var emptyCell = emptyCells.splice(rndIdx, 1)[0];
  gBoard[emptyCell.i][emptyCell.j] = CHERRY;
  renderCell(emptyCell, CHERRY)
}




function getEmptyCells() {
  var emptyCells = [];
  for (var i = 1; i < gBoard.length - 1; i++) {
    for (var j = 1; j < gBoard[0].length - 1; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({ i: i, j: j });
      }
    }
  }
  return emptyCells;
}

