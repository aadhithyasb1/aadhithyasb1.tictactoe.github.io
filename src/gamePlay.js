let quit = document.querySelector(".quitYesOrNo");
function closeQuitBox() {
  quit.style.display = "none";
}

function openQuitBox() {
  quit.style.display = "block";
  // quit.classList.add("show");
}

let result = document.querySelector(".result");
let resultContent = document.querySelector(".result-content");
var seconds = 00;
var tens = 00;
var minutes = 00;
var appendMinutes = document.getElementById("minutes");
var appendSeconds = document.getElementById("seconds");
var buttonStop = document.getElementById("stop-game");
var buttonReset = document.getElementById("reset-game");
let stopIcon = document.querySelector(".stop-icon");
var Interval;
let sound = new Audio("./Images/background_sound.mp3");
let soundIcon = document.querySelector(".sound-icon");
var playSound=sessionStorage.getItem("soundOptionn");
var buttonClick = "stop";
soundFunc();
function soundFunc() {
  if (playSound) {
    soundIcon.src = "./Images/sound.png";
    sound.play();
    playSound = false;
  } else {
    soundIcon.src = "./Images/stop_sound.png";
    sound.pause();
    playSound = true;
  }
}
(function () {
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
})();
function startButton() {
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  stopIcon.src = "./Images/pause-solid.svg";
  buttonClick = "stop";
}

buttonStop.onclick = function () {
  if (buttonClick == "stop") {
    clearInterval(Interval);
    stopIcon.src = "./Images/play-solid.svg";
    buttonClick = "start";
  } else {
    startButton();
  }
};

buttonReset.onclick = resetButton;
function resetButton() {
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  minutes = "00";
  appendMinutes.innerHTML = minutes;
  appendSeconds.innerHTML = seconds;
  resetCells();
  startButton();
}
function startTimer() {
  tens++;
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    appendMinutes.innerHTML = minutes;
  }
}

let storeCurrentUserName = sessionStorage.getItem("currentUserName");
let storeOpponentSelected = sessionStorage.getItem("sendOpponentSelected");
let playerName = document.getElementById("player-name");
let character = document.getElementById("character");
let chagePointsUser = document.getElementById("points");
let changePointsOpp = document.getElementById("opponent-points");
let getGameMode = document.querySelector(".game-mode");
let getGameModeText=document.querySelector(".game-mode-text")
let getOpponentType = document.querySelector(".opponent-type");
let opponentName = document.getElementById("opponent-name");
let opponentCharacter = document.getElementById("opponent-character");
var firstPlay = "";
var tempUserDetails = "";
var pointsUser = 0;
var pointsOpponent = 0;
let computerIcon = document.querySelector(".opponent-icon");

(async function () {
  await fetch("../gameDetails.json")
    .then((store) => store.json())
    .then((result) => {
      tempUserDetails = result;
      storeTempUser();
    });
})();

var storeOpponentType = "";
var startFirst = "";
var tempCharacter = "";
var userGameMode = " ";
var opponentChar = "";
var sendOpponentType = " ";
var mediumMode ="";
var easyMode = userGameMode == "Easy" ? true : false;
var hardMode = userGameMode == "Hard" ? true : false;

async function storeTempUser() {
  startFirst = tempUserDetails[storeCurrentUserName].startFirstdata;
  userGameMode = tempUserDetails[storeCurrentUserName].modeSelectedData;
  playerName.innerHTML = sessionStorage.getItem("currentUserName");
  if (storeOpponentSelected == "pvsp") {
    sendOpponentType = "Person";
    computerIcon.src = "./Images/person.jpg";
    getGameMode.style.display = "none";
    getOpponentType.innerHTML = "Person";
    opponentName.innerHTML = sessionStorage.getItem("storeOpponentName");
    userGameMode = "Person";
    getGameModeText.style.visibility="hidden"
  } else {
    getOpponentType.innerHTML = "PC";
    sendOpponentType = "PC";
    computerIcon.src = "./Images/computer.png";
    getGameMode.innerHTML = userGameMode;
    opponentName.innerHTML = "PC";
  }
  tempCharacter = tempUserDetails[storeCurrentUserName].characterData;
  character.innerHTML = tempCharacter;
  if (tempCharacter == "X") {
    opponentCharacter.innerHTML = "O";
    opponentChar = "O";
  } else {
    opponentCharacter.innerHTML = "X";
    opponentChar = "X";
  }
easyMode= userGameMode == "Easy" ? true : false;
mediumMode=  userGameMode == "Medium" ? true : false;
hardMode=  userGameMode == "Hard" ? true : false;
  startGame();
}

let cellSelect = document.querySelectorAll(".cell");
const X_CLASS = "X";
const CIRCLE_CLASS = "O";
var circleTurn;
let displayPoints = document.getElementById("points");
var userInput = [];
let yourTurn = document.querySelector(".your-turn");
let opponentTurn = document.querySelector(".opponent-turn");

function resetCells() {
  cellSelect.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    if (cell.classList.contains("show")) {
      cell.classList.remove("show");
    }
    board.classList.remove("show");
  });
  winOrNot = true;
  startGame();
}
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var winOrNot = true;

function startGame() {
  firstPlay = startFirst;
  once = true;
  if (winOrNot) {
    bool = 0;
    var arrStart = [0, 1, 2, 3, 5, 6, 7, 8];
    if (tempCharacter == "O" && startFirst == "Yes") {
      circleTurn = true;
    } else if (tempCharacter == "O" && startFirst == "No") {
      circleTurn = false;
    } else if (tempCharacter == "X" && startFirst == "Yes") {
      circleTurn = false;
    } else {
      circleTurn = true;
    }

    if (startFirst == "No") {
      checkComputer = true;
      opponent.classList.add("show");
      user.classList.remove("show");
      opponentTurn.style.display = "block";
      yourTurn.style.display = "none";
      setTimeout(() => {
        if (hardMode) {
          currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
          cellSelect[4].classList.add(currentClass);
          circleTurn = !circleTurn;
        } else if (easyMode) {
          arrStart = [1, 2, 3, 5, 7];
          currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
          cellSelect[getRandomItem(arrStart)].classList.add(currentClass);
          circleTurn = !circleTurn;
          bool++;
        } else if (mediumMode) {
          currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
          cellSelect[getRandomItem(arrStart)].classList.add(currentClass);
          circleTurn = !circleTurn;
          firstPlay=false;
        }
        swapTurns();
        funcCheckWin(currentClass);
      }, 1000);
      if (easyMode || mediumMode || hardMode) {
        setTimeout(() => {
          user.classList.add("show");
          opponent.classList.remove("show");
          opponentTurn.style.display = "none";
          yourTurn.style.display = "block";
        }, 2000);
      }
    } else {
      bool++;
      checkComputer = false;
      opponent.classList.remove("show");
      user.classList.add("show");
      opponentTurn.style.display = "none";
      yourTurn.style.display = "block";
    }

    cellSelect.forEach((cell) => {
      cell.removeEventListener("click", checkCell);
      cell.addEventListener("click", checkCell);
    });
    setBoardHoverClass();
  }
}
var currentClass = "";
let user = document.querySelector(".user");
let opponent = document.querySelector(".opponent");
var checkComputer = false;
var once;
function checkCell(e) {

  let cell = e.target;
  if (startFirst && once) {
    handleClick(e);
    once = false;
  }
  if (cell.classList.contains("X") || cell.classList.contains("O")) {
    checkComputer = false;
  } else if (sendOpponentType == "Person") {
    handleClick(e);
  } else {
    checkComputer = true;
  }
  if (checkComputer && currentClass != tempCharacter) {
    checkComputer = false;
    handleClick(e);
  }
}
function handleClick(e) {
  startButton();

  const cell = e.target;
  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  if (sendOpponentType == "Person") {
    if (currentClass == "O") {
      setTimeout(() => {
        opponent.classList.remove("show");
        user.classList.add("show");
        opponentTurn.style.display = "none";
        yourTurn.style.display = "block";
      }, 500);
    } else {
      setTimeout(() => {
        opponent.classList.add("show");
        user.classList.remove("show");
        opponentTurn.style.display = "block";
        yourTurn.style.display = "none";
      }, 500);
    }
  }
  placeMark(cell, currentClass);
  funcCheckWin(currentClass);

  if ((easyMode || mediumMode || hardMode) && winOrNot) {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    setTimeout(() => {
      opponent.classList.add("show");
      user.classList.remove("show");
      opponentTurn.style.display = "block";
      yourTurn.style.display = "none";
    }, 500);
  }
  checkComputer = false;
  if ((easyMode || mediumMode || hardMode) && winOrNot) {
    setTimeout(() => {
      computerClick();
    }, 1500);
  }
}
var bool = 0;

function computerClick() {
  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  let indexNum = 0;

  if (bool == 0 && easyMode) {
   
  } else {
    var count;
    var resultIndex;
    var storeForLoop;
    var combinationArray = [];
    var x;
    let middleArray = [0, 2, 6, 8];
    var mediumLoop = true;
    var iterate;
    var otherClass;
    var hardLoop = true;
    var hardCount;
    let totalCount = 0;
    var combCount = 0;
    var sameCell = 0;
    var sameClass;
    var previousCharacter = currentClass;
    circleTurn = !circleTurn;
    oppositeClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    circleTurn = !circleTurn;
    let index = WINNING_COMBINATIONS.forEach((combination) => {
      sameClass = 0;
      combCount++;
      if (mediumMode && mediumLoop) {
        console.log(combination);
        var removeOccupiedClass = "";
        for (iterate = 0, count = 0; iterate < 3; iterate++) {
          if (
            cellSelect[combination[iterate]].classList.contains(oppositeClass)
          ) {
            sameClass++;
            count++;
          } else if (
            cellSelect[combination[iterate]].classList.contains("X") ||
            cellSelect[combination[iterate]].classList.contains("O")
          ) {
            count++;
            removeOccupiedClass = combination[iterate];
          } else {
            storeForLoop = combination[iterate];
          }
        }
        if (firstPlay) {
          if (
            cellSelect[4].classList.contains("X") ||
            cellSelect[4].classList.contains("O")
          ) {
            mediumArray = [1, 3, 5, 7];
            cellSelect[getRandomItem(mediumArray)].classList.add(currentClass);
          } else {
            mediumArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            mediumArray.splice(removeOccupiedClass, 1);
            cellSelect[getRandomItem(mediumArray)].classList.add(currentClass);
          }
          firstPlay = false;
          mediumLoop = false;
        } else if (mediumLoop) {
          if (sameClass > 1 && storeForLoop) {
            cellSelect[storeForLoop].classList.add(currentClass);
            mediumLoop = false;
          }
          else if (count > 1 && storeForLoop) {
            cellSelect[storeForLoop].classList.add(currentClass);
            mediumLoop=false;
          }
          else if(sameClass==1 && storeForLoop){
            cellSelect[storeForLoop].classList.add(currentClass);
            mediumLoop = false;
          }
           else if(count==1 && storeForLoop) {
              cellSelect[storeForLoop].classList.add(currentClass);
              mediumLoop=false
            }
            else if(combCount==8 && storeForLoop){
              cellSelect[storeForLoop].classList.add(currentClass);
              mediumLoop=false
            }
        }
        var mediumArray;
      } else if (easyMode) {
    
        for (iterate = 0, count = 0; iterate < 3; iterate++) {
          
          if (
            cellSelect[combination[iterate]].classList.contains("X") ||
            cellSelect[combination[iterate]].classList.contains("O")
          ) {
            count++;
            removeOccupiedClass = combination[iterate];
          } else {
            storeForLoop = combination[iterate];
          }
        }

        if (count <= 1) {
          if (
            combinationArray.length > 0 &&
            combinationArray.includes(storeForLoop)
          ) {
          } else {
            combinationArray.push(storeForLoop);
          }
        } else {
          let arrLength = combinationArray.length;
          if (arrLength != 0) {
            const index = combinationArray.indexOf(storeForLoop);
            combinationArray.splice(index, 1);
          }
        }
      } else if (hardMode) {
        if (firstPlay) {
          if (
            cellSelect[4].classList.contains("X") ||
            cellSelect[4].classList.contains("O")
          ) {
            cellSelect[getRandomItem(middleArray)].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          } else if (
            cellSelect[0].classList.contains("X") ||
            cellSelect[0].classList.contains("O") ||
            cellSelect[2].classList.contains("X") ||
            cellSelect[2].classList.contains("O") ||
            cellSelect[6].classList.contains("X") ||
            cellSelect[6].classList.contains("O") ||
            cellSelect[8].classList.contains("X") ||
            cellSelect[8].classList.contains("O")
          ) {
            cellSelect[4].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          } else if (
            cellSelect[1].classList.contains("O") ||
            cellSelect[1].classList.contains("X")
          ) {
            middleArray = [0, 2, 4, 7];
            cellSelect[getRandomItem(middleArray)].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          } else if (
            cellSelect[7].classList.contains("O") ||
            cellSelect[7].classList.contains("X")
          ) {
            middleArray = [1, 4, 6, 8];
            cellSelect[getRandomItem(middleArray)].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          } else if (
            cellSelect[3].classList.contains("O") ||
            cellSelect[3].classList.contains("X")
          ) {
            middleArray = [0, 4, 5, 6];
            cellSelect[getRandomItem(middleArray)].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          } else if (
            cellSelect[5].classList.contains("O") ||
            cellSelect[5].classList.contains("X")
          ) {
            middleArray = [2, 3, 4, 8];
            cellSelect[getRandomItem(middleArray)].classList.add(currentClass);
            hardLoop = false;
            firstPlay = false;
          }
        } else if (!firstPlay) {
          circleTurn = !circleTurn;
          let changeClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
          circleTurn = !circleTurn;
          for (
            iterate = 0, hardCount = 0, otherClass = 0, totalCount = 0;
            iterate < 3;
            iterate++
          ) {
            if (
              cellSelect[combination[iterate]].classList.contains(currentClass)
            ) {
              hardCount++;

              totalCount++;
            } else if (
              cellSelect[combination[iterate]].classList.contains(changeClass)
            ) {
              otherClass++;

              totalCount++;
            } else {
              storeForLoop = combination[iterate];
            }
          }
          if (hardLoop) {
            if (hardCount == 2 && totalCount < 3) {
              cellSelect[storeForLoop].classList.add(currentClass);
              hardLoop = false;
              hardCount = 0;
            } else if (otherClass == 2 && totalCount < 3) {
              cellSelect[storeForLoop].classList.add(currentClass);
              hardLoop = false;
              otherClass = 0;
            }
          }
        }
      }
    });
    if (hardMode && (hardCount <= 1 || otherClass <= 1) && hardLoop) {
      cellSelect[storeForLoop].classList.add(currentClass);
      hardLoop = false;
    }
    if (combinationArray.length > 0 && easyMode) {
      let cellIndex = getRandomItem(combinationArray);
      console.log(combinationArray);
      cellSelect[cellIndex].classList.add(currentClass);
    } else {
      for (let cellSel = 0; cellSel < 9; cellSel++) {
        if (!firstPlay) {
          if (
            !(
              cellSelect[cellSel].classList.contains("X") ||
              cellSelect[cellSel].classList.contains("O")
            )
          ) {
            var tempCount;
            let tempBool = true;
            if (userGameMode == "Easy") {
              let storeResult = WINNING_COMBINATIONS.forEach((combination) => {
                for (let row = 0; row < 3; row++) {
                  if (
                    cellSelect[combination[row]].classList.contains(
                      currentClass
                    )
                  ) {
                    tempCount++;
                  }
                }
                if (tempCount > 1 && combination.includes(cellSel)) {
                  tempBool = false;
                }
              });
              if (tempBool) {
                cellSelect[cellSel].classList.add(currentClass);
                if (easyMode) {
                  break;
                }
              }
            }
            // if (userGameMode == "Medium" && mediumLoop) {
            //   console.log("fvnjsdna");
            //   let storeResult = WINNING_COMBINATIONS.forEach((combination) => {
            //     for (let row = 0; row < 3; row++) {
            //       if (
            //         cellSelect[combination[row]].classList.contains(
            //           currentClass
            //         )
            //       ) {
            //         tempCount++;
            //       }
            //     }
            //     if (tempCount > 1) {
            //       tempBool = true;
            //     }
            //   });
            //   if (tempBool) {
            //     // WINNING_COMBINATIONS.forEach((combination)=>{})
            //     cellSelect[cellSel].classList.add(currentClass);
            //     break;
            //   } 
            // }
          }
        }
      }
    }
    firstPlay = false;
  }
  funcCheckWin(currentClass);
  setTimeout(() => {
    opponent.classList.remove("show");
    user.classList.add("show");
    opponentTurn.style.display = "none";
    yourTurn.style.display = "block";
  }, 500);
  checkComputer = true;
}

function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

var gameFirstPlay = true;

function funcCheckWin(currentClass) {
  for (let key = 0; key < 9; key++) {
    if (
      cellSelect[key].classList.contains("X") ||
      cellSelect[key].classList.contains("O")
    ) {
      if (gameFirstPlay) {
        userInput.push(key);
        gameFirstPlay = false;
        break;
      } else {
        if (!userInput.includes(key)) {
          userInput.push(key);
          break;
        }
      }
    }
  }

  if (checkWin(currentClass)) {
    console.log("checkwin");
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    displayWinning = combination;
    return combination.every((index) => {
      return cellSelect[index].classList.contains(currentClass);
    });
  });
}
var winnerStatus = "";
var displayOpponentName = " ";
let celebrationDivLeft = document.querySelector(".celebration-div-left");
let celebrationDivRight = document.querySelector(".celebration-div-right");
let playBox = document.querySelector(".play-box");
var displayWinning = [];
var winning = 0;
function displayWinningFunc() {
  if (winning < 3) {
    cellSelect[displayWinning[winning]].classList.add("show");
    setTimeout(() => {
      displayWinningFunc();
    }, 600);
    winning++;
  }
}
function endGame(draw) {
  winning = 0;
  winOrNot = false;
  if (draw) {
    resultContent.innerHTML = "Result: Draw";
    result.classList.add("show");
    winnerStatus = "Draw";
  } else {
    if (currentClass == tempCharacter) {
      setTimeout(() => {
        celebrationDivLeft.style.display = "block";
        celebrationDivRight.style.display = "block";
        if (winning == 0) {
          displayWinningFunc();
        }
        playBox.classList.add("show");
      }, 400);
      pointsUser++;
      winnerStatus = "playerwin";
      resultContent.innerHTML = `Result: ${storeCurrentUserName}Wins`;
      chagePointsUser.innerHTML = pointsUser;
    } else {
      setTimeout(() => {
        displayWinningFunc();
        playBox.classList.add("show");
      }, 300);
      winnerStatus = "oppwin";
      pointsOpponent++;
      if(storeOpponentSelected=="pvspc"){
      resultContent.innerHTML = `Result: PC Wins`;}
      else{
        resultContent.innerHTML = `Result:${sessionStorage.getItem("storeOpponentName")}Wins`;
      }
      changePointsOpp.innerHTML = pointsOpponent;
    }
    if (winnerStatus == "playerwin") {
      winnerStatus = "Won";
    } else {
      winnerStatus = "Lost";
    }
    opponent.classList.remove("show");
  user.classList.remove("show");
  opponentTurn.style.display = "none";
  yourTurn.style.display = "none";
  setTimeout(() => {
    result.classList.add("show");
  }, 3500);
  }
  let time = `${minutes}:${seconds}`;

  if (storeOpponentSelected == "pvsp") {
    displayOpponentName = sessionStorage.getItem("storeOpponentName");
  } else if (storeOpponentSelected == "pvspc") {
    displayOpponentName = "PC";
  }
  let resultDetails = {};
  resultDetails[storeCurrentUserName] = {
    time: time,
    winnerStatus: winnerStatus,
    opponentName: displayOpponentName,
    userGameMode: userGameMode,
    userInput: userInput,
    startFirst: startFirst,
    character: tempCharacter,
    currentUserName: storeCurrentUserName,
    pointsUser: pointsUser,
    pointsOpponent: pointsOpponent,
    opponentCharacter: opponentChar,
    opponentType: sendOpponentType,
  };

  sendResultDetails(resultDetails);
  
}

async function sendResultDetails(resultDetails) {
  await fetch("http://localhost:3000/sendResultDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultDetails),
  });
}
function isDraw() {
  return [...cellSelect].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function gameMode() {
  window.location.href = "gameMode.html";
}
function opponentType() {
  celebrationDivLeft.style.display = "none";
  celebrationDivRight.style.display = "none";
  window.location.href = "opponentType.html";
}
function game() {
  window.location.href = "gamePlay.html";
}
function profile() {
  window.location.href = "profile.html";
}
function login() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

function closeResult() {
  celebrationDivLeft.style.display = "none";
  celebrationDivRight.style.display = "none";
  result.classList.remove("show");
  resetButton();
}
