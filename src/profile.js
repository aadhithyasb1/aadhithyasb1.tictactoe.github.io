let sound = new Audio("./Images/background_sound.mp3");
let soundIcon = document.querySelector(".sound-icon");
var playSound = true;
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

(async function () {
  await fetch("../resultDetails.json")
    .then((store) => store.json())
    .then((result) => {
      tempUserDetails = result;
      storeTempUser();
    });
})();

var loginDetails = " ";
(async function () {
  await fetch("../storeUserDetails.json")
    .then((store) => store.json())
    .then((result) => {
      loginDetails = result;
      storeLoginDetails();
    });
})();

var email = document.querySelector(".email");
var userNameElement = document.querySelector(".user-name");
function storeLoginDetails() {
  email.innerHTML = loginDetails[currentUserName].email;
  userNameElement.innerHTML = currentUserName;
}

var gamePlayed = 0;
var gameWon = 0;
var gameLost = 0;
var gameDraw = 0;
var currentUserName = sessionStorage.getItem("currentUserName");
var getOpponentName = " ";
let gamePlayedElement = document.querySelector(".game-played");
let gameWonElement = document.querySelector(".game-won");
let gameLostElement = document.querySelector(".lost");
let gameDrawElement = document.querySelector(".draw");
let opponentNameElement = document.querySelector(".Opponent-name");
let userGameMode = document.querySelector(".game-mode");
let userGameModeHistory = document.querySelector(".game-mode-history");
let timeTaken = document.querySelector(".time-taken");
let gameStatus = document.querySelector(".won-status");
let playerName = document.getElementById("player-name");
let userCharacter = document.getElementById("character");
let userPoints = document.getElementById("points");
let opponentCharacter = document.getElementById("opponent-character");
let opponentPoints = document.getElementById("opponent-points");
let opponentTypeElement = document.querySelector(".opponent-type");
let userDetails = " ";
var getGameStatus = "";
var getTimeTaken = "";
var getGameMode = "";
var userInput = [];
var startFirst = "";
var character = "";
var currentWinnerStatus = "";
function storeTempUser() {
  userDetails = tempUserDetails[currentUserName];
  gamePlayed = Object.keys(userDetails).length;
  storeValues(gamePlayed);
}

function storeValues(gamePlay) {
  for (let key in userDetails) {
    if (userDetails[key].winnerStatus == "Won") {
      gameWon++;
    } else if (userDetails[key].winnerStatus == "Lost") {
      gameLost++;
    } else if (userDetails[key].winnerStatus == "Draw") {
      gameDraw++;
    }
  }

  var gameCount = gamePlay;
  if (gamePlay == 1) {
    gamePlay = gamePlay - 1;
  }
  getGameStatus = userDetails[gamePlay].winnerStatus;
  getTimeTaken = userDetails[gamePlay].time;
  getGameMode = userDetails[gamePlay].userGameMode;
  getOpponentName = userDetails[gamePlay].opponentName;
  currentUserName = userDetails[gamePlay].currentUserName;
  userInput = userDetails[gamePlay].userInput;
  startFirst = userDetails[gamePlay].startFirst;
  character = userDetails[gamePlay].character;
  gamePlayedElement.innerHTML = gameCount;
  gameLostElement.innerHTML = gameLost;
  gameWonElement.innerHTML = gameWon;
  gameDrawElement.innerHTML = gameDraw;
  opponentNameElement.innerHTML = getOpponentName;
  gameStatus.innerHTML = getGameStatus;
  timeTaken.innerHTML = getTimeTaken;
  userGameMode.innerHTML = getGameMode;
  playerName.innerHTML = `Player Name: ${currentUserName}`;
  userCharacter.innerHTML = `Character: ${userDetails[gamePlay].character}`;
  userPoints.innerHTML = `Points: ${userDetails[gamePlay].pointsUser}`;
  opponentCharacter.innerHTML = `Character:${userDetails[gamePlay].opponentCharacter}`;
  opponentPoints.innerHTML = `Points: ${userDetails[gamePlay].pointsOpponent}`;
  opponentTypeElement.innerHTML = `Opponent Type: ${userDetails[gamePlay].opponentType}`;
  userGameModeHistory.innerHTML = `Game Mode: ${userDetails[gamePlay].userGameMode}`;
  opponentName.innerHTML = `Opponent Name: ${getOpponentName}`;
  if (userDetails[gamePlay].winnerStatus == "Won") {
    currentWinnerStatus = `${currentUserName} Won the Game`;
  } else if (userDetails[gamePlay].winnerStatus == "Lost") {
    currentWinnerStatus = `${getOpponentName} Won the Game`;
  } else {
    currentWinnerStatus = "Draw";
  }
  if (storeOpponentSelected == "pvsp") {
    computerIcon.src = "./Images/person.jpg";
    userGameModeHistory.style.display = "none";
  } else {
    userGameModeHistory.style.display = "block";
    computerIcon.src = "./Images/computer.png";
    getGameMode.innerHTML = `Game Mode: ${userGameMode}`;
  }
}

let lastHistoryElement = document.querySelector(".last-history-text");
let historyElement = document.querySelector(".history-text");
let profileElement = document.querySelector(".middle-section");
let appendHistory = document.querySelector(".full-history-table");
let displayHistory = document.querySelector(".full-history");

function lastHistory() {
  lastHistoryElement.classList.add("show");
  historyElement.classList.remove("show");
}
var tablerow = "";
function history() {
  historyElement.classList.add("show");
  lastHistoryElement.classList.remove("show");
  displayHistory.style.display = "block";
  profileElement.style.display = "none";
  tablerow = `<tr>
  <th>S.No.</th>
<th>Opponent Name</th>
<th>Game Status</th>
<th>Time taken</th>
<th>Game mode</th>
<th>Replay</th>
</tr>`;
  for (let key in userDetails) {
    getGameStatus = userDetails[key].winnerStatus;
    getTimeTaken = userDetails[key].time;
    getGameMode = userDetails[key].userGameMode;
    getOpponentName = userDetails[key].opponentName;
    tablerow += `<tr>
    <td>${key}</td>
  <td>${getOpponentName}</td>
  <td>${getGameStatus}</td>
  <td>${getTimeTaken} sec</td>
  <td>${getGameMode}</td>
  <td><img src="./Images/circle-play-regular.svg" alt="play" onclick="allHistoryReplay(${key})" class="replay-button"></td>
  </tr>`;
  }
  appendHistory.innerHTML = tablerow;
}

function allHistoryReplay(key) {
  storeValues(key);
  replayFunc();
}
var storeOpponentSelected = sessionStorage.getItem("sendOpponentSelected");
let computerIcon = document.querySelector(".opponent-icon");
let opponentName = document.getElementById("opponent-name");
let replay = document.querySelector(".replay-section");
let playArea = document.querySelector(".play-area");
let cellSelect = document.querySelectorAll(".cell");
const X_CLASS = "X";
const CIRCLE_CLASS = "O";
var timer = null;
var index = 0;
var pauseVal = true;
function replayFunc() {
  profileElement.style.display = "none";
  displayHistory.style.display = "none";

  replay.style.display = "block";
  playArea.classList.add("show");

  if (character == "O" && startFirst == "Yes") {
    circleTurn = true;
  } else if (character == "O" && startFirst == "No") {
    circleTurn = false;
  } else if (character == "X" && startFirst == "Yes") {
    circleTurn = false;
  } else {
    circleTurn = true;
  }

  firstPlay = startFirst;
  console.log(firstPlay);
  printValues(index);
}

let resultReplay = document.querySelector(".result-replay");
let yourTurn = document.querySelector(".your-turn");
let opponentTurn = document.querySelector(".opponent-turn");
let user = document.querySelector(".user");
let opponent = document.querySelector(".opponent");
var firstPlay = "";
function printValues(index) {
  setTimeout(() => {
    if (firstPlay == "No") {
      opponent.classList.add("show");
      user.classList.remove("show");
      opponentTurn.style.display = "block";
      yourTurn.style.display = "none";
      firstPlay = "Yes";
    } else {
      opponent.classList.remove("show");
      user.classList.add("show");
      opponentTurn.style.display = "none";
      yourTurn.style.display = "block";
      firstPlay = "No";
    }
  }, 500);
  setTimeout(() => {
    if (index < userInput.length && pauseVal) {
      tempIndex = index;

      currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
      if (cellSelect[userInput[index]].classList.value.includes("O"))
        cellSelect[userInput[index]].classList.remove("O");
      if (cellSelect[userInput[index]].classList.value.includes("X"))
        cellSelect[userInput[index]].classList.remove("X");
      
      cellSelect[userInput[index]].classList.add(currentClass);
     
      circleTurn = !circleTurn;
      index++;
      setTimeout(() => {
        if (firstPlay == "Yes") {
          opponent.classList.remove("show");
          user.classList.add("show");
          opponentTurn.style.display = "none";
          yourTurn.style.display = "block";
          firstPlay = "Yes";
        } else {
          opponent.classList.add("show");
          user.classList.remove("show");
          opponentTurn.style.display = "block";
          yourTurn.style.display = "none";
          firstPlay = "No";
        }
      }, 500);
      printValues(index);
    }
  }, 1500);
  if (!(index < userInput.length)) {
    setTimeout(() => {
      opponent.classList.remove("show");
      user.classList.remove("show");
      opponentTurn.style.display = "none";
      yourTurn.style.display = "none";
      resultReplay.style.display = "block";

      resultReplay.innerHTML = `Result: ${currentWinnerStatus}`;
    }, 500);
  }
}

var tempIndex = 0;
var pauseClicked = true;
let pauseIcon = document.querySelector(".pause");

function pause() {
  if (pauseClicked) {
    pauseVal = false;
    pauseClicked = false;
    pauseIcon.src = "./Images/play-solid.svg";
  } else {
    index = tempIndex + 1;
    pauseVal = true;
    printValues(index);
    pauseClicked = true;
    pauseIcon.src = "./Images/pause-solid.svg";
  }
}
function replayHistory() {
  cellSelect.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
  });

  index = 0;
  tempIndex = 0;
  replayFunc();
}

function login() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
function opponentType() {
  window.location.href = "opponentType.html";
}
function profile() {
  window.location.href = "profile.html";
}
