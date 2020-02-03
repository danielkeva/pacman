var gPacman;
var PACMAN = '<img src="img/pacman.gif">';
var deadGhosts = [];
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodCollectedCount++

  } if (nextCell === CHERRY) {
    updateScore(10);
  }
  if (nextCell === SUPER_FOOD) {
    if(gPacman.isSuper)return;
    gPacman.isSuper = true;
    setTimeout(function () {
      for (var i = 0; i < deadGhosts.length; i++) {
        gGhosts.push(deadGhosts[i])
      }
      deadGhosts = []
      gPacman.isSuper = false

    }, 5000)

  }
  else if (nextCell === GHOST) {
    console.log(nextLocation)
    if (gPacman.isSuper) {
      var idx = getCurrIdx(nextLocation)
      var deadGhost = gGhosts.splice(idx, 1)[0]
      deadGhosts.push(deadGhost)

    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);


}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = '<img src="img/pacman.gif" style="transform: rotate(270deg);"/>'
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = '<img src="img/pacman.gif" style="transform:rotate(90deg);"/>'
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = '<img src="img/pacman.gif" style="transform: rotate(180deg);"/>'
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = '<img src="img/pacman.gif" style="transform: rotate(0deg);"/>'
      break;
    default: return null;
  }
  return nextLocation;
}