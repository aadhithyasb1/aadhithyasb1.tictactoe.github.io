// game mode

// start
let startFirstYes = document.querySelector(".yes");
let startFirstNo = document.querySelector(".no");
let errorDisplay = document.querySelector(".gameModeerror");
var startFirst = "";
let storeCurrentUserName = sessionStorage.getItem("currentUserName");
let userName = document.querySelector(".userName-text");
let storeOpponentSelected = sessionStorage.getItem("sendOpponentSelected");
userName.innerHTML = storeCurrentUserName;
let displayGameMode = document.querySelector(".game-mode");
let gameModeContainer = document.querySelector(".game-mode-container");
let opponentName = document.querySelector(".opponent-name");
let eventOpponentName = document.getElementById("oppt-name");
var storeOpponentName="";

let sound=new Audio("./Images/background_sound.mp3");
let soundIcon=document.querySelector(".sound-icon");
var playSound=sessionStorage.getItem("soundOptionn");

// if(!playSound){
//   soundIcon.src="./Images/stop_sound.png"
// }
// else{
//   soundIcon.src="./Images/sound.png"
// }
soundFunc()
function soundFunc(){
  if(playSound){
    soundIcon.src="./Images/sound.png"
    sound.play();
    sessionStorage.setItem("soundOptionn", playSound);
    playSound=false;
  }
  else{
    soundIcon.src="./Images/stop_sound.png"
    sound.pause();
    sessionStorage.setItem("soundOptionn", playSound);
    playSound=true;
  }
}
eventOpponentName.addEventListener("change",(e)=>{storeOpponentName=eventOpponentName.value;
e.preventDefault()
  if(storeOpponentName.length>0){
    eventOpponentName.style.backgroundColor="#00ff80"
  }
  else{
    eventOpponentName.style.backgroundColor="white"
  }
});
if (storeOpponentSelected === "pvsp") {
  displayGameMode.style.display = "none";
  gameModeContainer.classList.add("show");
  opponentName.style.display = "block";
  
}
else{
  displayGameMode.style.display = "block";
  gameModeContainer.classList.add("show");
}
function yes() {
  startFirst = "Yes";
  startFirstYes.style.backgroundColor = "#00ff80";
  startFirstNo.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}
function no() {
  startFirst = "No";
  startFirstYes.style.backgroundColor = "";
  startFirstNo.style.backgroundColor = "#00ff80";
  errorDisplay.style.display = "none";
}

// X-O-icon

let xIcon = document.querySelector(".x-icon");
let oIcon = document.querySelector(".o-icon");
var character = "";
function xIconClick() {
  character = "X";
  xIcon.style.backgroundColor = "#00ff80";
  oIcon.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}
function oIconClick() {
  character = "O";
  oIcon.style.backgroundColor = "#00ff80";
  xIcon.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}

// mode

let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");
let modeSelected = "";
function easyClick() {
  modeSelected = "Easy";
  easy.style.backgroundColor = "#00ff80";
  medium.style.backgroundColor = "white";
  hard.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}
function mediumClick() {
  modeSelected = "Medium";
  medium.style.backgroundColor = "#00ff80";
  easy.style.backgroundColor = "white";
  hard.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}
function hardClick() {
  modeSelected = "Hard";
  hard.style.backgroundColor = "#00ff80";
  easy.style.backgroundColor = "white";
  medium.style.backgroundColor = "white";
  errorDisplay.style.display = "none";
}
var storeGameDetails = {};
var storeGameDetail = {};

function nextGamePage() {
  if (storeOpponentSelected == "pvsp") {
    storeOpponentName=eventOpponentName.value;
    sessionStorage.setItem("storeOpponentName",storeOpponentName)
    if (startFirst && character && storeOpponentName) {
      sendGameDetails();
      game();
    }
    else {
      errorDisplay.style.display = "block";
    }
  } else if (startFirst && character && modeSelected) {
    sendGameDetails();
    game();
  } else {
    errorDisplay.style.display = "block";
  }
}

async function sendGameDetails() {
  if(storeOpponentName=="pvsp"){
    modeSelected="Person"
  }
  storeGameDetail = {
    opponentSelectedData: storeOpponentSelected,
    startFirstdata: startFirst,
    characterData: character,
    modeSelectedData: modeSelected,
  };
  storeGameDetails[storeCurrentUserName] = storeGameDetail;
  console.log(storeGameDetails);
  await fetch("http://localhost:3000/sendGameDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeGameDetails),
  });
}

function gameMode() {
  window.location.href = "gameMode.html";
}
function opponentType() {
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
