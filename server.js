const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("./src"));
const port = process.env.PORT || 3000;
app.post("/sendUserDetails", (req, res) => {
  let userDetails = req.body;
  serverUserDetails(userDetails);
});
app.post("/sendGameDetails", (req, res) => {
  let gameDetails = req.body;
  serverGameDetails(gameDetails);
});
app.post("/sendResultDetails", (req, res) => {
  let resultDetails = req.body;
  serverResultDetails(resultDetails);
});
function serverUserDetails(userDetails) {
  let data = fs.readFileSync("./src/storeUserDetails.json");
  let words = JSON.parse(data);
  let storeObj = Object.keys(userDetails);
  words[storeObj] = userDetails[storeObj];
  let storedDetails = JSON.stringify(words, null, 2);
  fs.writeFileSync("./src/storeUserDetails.json", storedDetails, (error) => {
    console.log("error");
  });
}
function serverGameDetails(gameDetails) {
  let data = fs.readFileSync("./src/gameDetails.json");
  let words = JSON.parse(data);
  let storeObj = Object.keys(gameDetails);
  words[storeObj] = gameDetails[storeObj];
  let storedDetails = JSON.stringify(words, null, 2);
  fs.writeFileSync("./src/gameDetails.json", storedDetails, (error) => {
    console.log("error");
  });
}
function serverResultDetails(resultDetails) {
  let userdetails = resultDetails;
  let userdetailkey = Object.keys(userdetails);
  let data = fs.readFileSync("./src/resultDetails.json");
  let words = JSON.parse(data);
  var userdata="";
  var id =""
  var index =0;
  var data1 = {};
  var data_user={};
if(words[userdetailkey]){
  userdata=words[userdetailkey]
   id = Object.keys(words[userdetailkey]);
  index = id.length + 1;
  data1[String(index)] = userdetails[userdetailkey];
  data_user = { ...userdata, ...data1 };
  words[userdetailkey] = data_user;
}
else{
  userdata=words;
  index=0;
  data1[String(index)] = userdetails[userdetailkey]
  data_user[userdetailkey]={...data1}
  words={...words,...data_user};
}
 
 
  let storedDetails = JSON.stringify(words, null, 2);
  fs.writeFileSync("./src/resultDetails.json", storedDetails, (error) => {
    console.log("error");
  });
}
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});
