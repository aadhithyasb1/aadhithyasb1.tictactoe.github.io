var tempUserDetails = {};
let signupErrordiv = document.querySelector(".signup-error");
let signupErrorMsg = document.getElementById("signup-error-msg");
var userDetails = {};

let sound = new Audio("./Images/background_sound.mp3");
let soundIcon = document.querySelector(".sound-icon");
var playSound = true;



function soundFunc() {
  if (playSound) {
    soundIcon.src = "./Images/sound.png";
    sound.play();
    sessionStorage.setItem("soundOptionn", playSound);
    playSound = false;
  } else {
    soundIcon.src = "./Images/stop_sound.png";
    sound.pause();
    sessionStorage.setItem("soundOptionn", playSound);
    playSound = true;
  }
}

var password = document.getElementById("id-login-password");
var signupPassword = document.getElementById("signup-password-input");
var signupConfirmPassword = document.getElementById(
  "signup-confirm-password-input"
);
var visibleLogo = document.getElementById("not-visible-logo");
var visibleLogoConfirm = document.getElementById("not-visible-logo-confirm");
function showPassword() {
  if (password.type == "password") {
    visibleLogo.src = "./Images/not_visible_eye.png";
    password.type = "text";
  } else {
    visibleLogo.src = "./Images/visible.png";
    password.type = "password";
  }
}

function showSignupPassword() {
  if (signupPassword.type == "password") {
    visibleLogo.src = "./Images/not_visible_eye.png";

    signupPassword.type = "text";
  } else {
    visibleLogo.src = "./Images/visible.png";

    signupPassword.type = "password";
  }
}
function showSignupConfirmPassword() {
  if (signupConfirmPassword.type == "password") {
    visibleLogoConfirm.src = "./Images/not_visible_eye.png";
    signupConfirmPassword.type = "text";
  } else {
    visibleLogoConfirm.src = "./Images/visible.png";
    signupConfirmPassword.type = "password";
  }
}

function signupClose() {
  signupErrordiv.style.display = "none";
}

async function fetchUserDetails() {
  await fetch("../storeUserDetails.json")
    .then((store) => store.json())
    .then((result) => {
      tempUserDetails = result;
    });
}
async function submitSignup(e) {
  e.preventDefault();
  let signUpUserName = document.getElementById("signup-username-input").value;
  let signUpEmail = document.getElementById("signup-email-input").value;
  let enterPassword = document.getElementById("signup-password-input").value;
  let confirmPassword = document.getElementById(
    "signup-confirm-password-input"
  ).value;
  await fetchUserDetails();
  let signupObjUser = Object.keys(tempUserDetails);
  let length = signupObjUser.length;
  for (let key = 0; key < length; key++) {
    if (signUpUserName == signupObjUser[key]) {
      signupErrorMsg.innerHTML = "Username already exists";
      signupErrordiv.style.display = "block";
      break;
    } else if (signUpEmail == tempUserDetails[signupObjUser[key]].email) {
      signupErrorMsg.innerHTML = "Email id already used";
      signupErrordiv.style.display = "block";

      break;
    } else {
      if (enterPassword != confirmPassword) {
        signupErrorMsg.innerHTML = "Passwords did not match";
        signupErrordiv.style.display = "block";
        break;
      }

      else{
        let userDetail = {
          userName: signUpUserName,
          email: signUpEmail,
          password: enterPassword,
        };
        userDetails[userDetail.userName] = {
          userName: userDetail.userName,
          email: userDetail.email,
          password: userDetail.password,
        };
        signupErrorMsg.innerHTML="Account created Successfully";
        signupErrordiv.style.display = "block";
        signupErrordiv.classList.add("show")
        sendUserData(userDetails);
       setTimeout(()=>{
        window.location.href = "login.html";
       },1000)
        break;
      }
    }
  }
}
let displayError = document.querySelector(".divError");
let displayErrorShow=document.querySelector(".error");
function displayNone() {
  displayError.style.display = "none";
}
async function submitLogin(e) {
  e.preventDefault();
  await fetchUserDetails();
  let loginUserName = document.getElementById("id-login-username").value;
  let loginPassword = document.getElementById("id-login-password").value;
  sessionStorage.setItem("currentUserName", loginUserName);
  let tempObjUser = Object.keys(tempUserDetails);
  let bool = "false";
  for (let key = 0; key < tempObjUser.length; key++) {
    if (
      (loginUserName === tempObjUser[key] ||
        loginUserName === tempUserDetails[tempObjUser[key]].email) &&
      loginPassword === tempUserDetails[tempObjUser[key]].password
    ) {
      bool = false;
      break;
    } else {
      bool = true;
    }
  }
  if (bool) {
    displayError.style.display = "block";
  } else {
    displayErrorShow.innerHTML="Authenticated Successfully";
    displayError.style.display = "block";
    displayErrorShow.classList.add("show");
    
       setTimeout(()=>{
        window.location.href = "opponentType.html";
       },1000)  
  }
}
async function sendUserData(userDetails) {
  await fetch("http://localhost:3000/sendUserDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  document.querySelector(".signup-form").reset();
}

// opponent select
let uToU = document.querySelector(".person-person");
let uToPc = document.querySelector(".person-computer");
let chooseOpponentText = document.querySelector(".opponent-type-text");
let chooseOpponentDiv = document.querySelector(".opponent-type");
let welcomeDisplayText = document.querySelector(".welcome-display-text");
let storeCurrentUserName = sessionStorage.getItem("currentUserName");
var opponentClicked=0;
let middleSection=document.querySelector(".middle-section")
welcomeDisplayText.innerHTML = storeCurrentUserName;
var opponentSelected = "";
function userToUser() {
  opponentClicked=0;
  opponentSelected = "pvsp";
  uToU.classList.add("show");
  uToU.style.boxShadow="10px 20px 30px purple";
  uToPc.classList.remove("show");
  uToPc.style.boxShadow="0px 0px 0px white";
  opponentClicked++;
}
function userToPc() {
  opponentClicked=0;
  opponentSelected = "pvspc";
  uToPc.classList.add("show");
  uToPc.style.boxShadow="10px 20px 30px purple";
  uToU.classList.remove("show");
  uToU.style.boxShadow="0px 0px 0px white";
  opponentClicked++;
}
middleSection.addEventListener("click",()=>{
  if(opponentClicked==1){
    opponentClicked++;
  }
  else if(opponentClicked>1){
    uToPc.classList.remove("show");
    uToU.classList.remove("show");
    uToPc.style.boxShadow="0px 0px 0px white";
    uToU.style.boxShadow="0px 0px 0px white";
    opponentClicked=0;
    opponentSelected="";
  }
})
let nextOpponentPage = document.querySelector(".next");
function next() {
  if (!opponentSelected) {
    chooseOpponentText.innerHTML = "! Choose your opponent type";
    chooseOpponentText.style.backgroundColor = "red";
    chooseOpponentText.style.color = "white";
    chooseOpponentText.style.padding = "10px";
  } else {
    sessionStorage.setItem("sendOpponentSelected", opponentSelected);
    gameMode();
  }
}

// page change
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
