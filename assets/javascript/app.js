$(document).ready(function(){
 
// Firebase Web App Configuration 
var firebaseConfig = {
    apiKey: "AIzaSyDTTmCkJ3mXMd21Da8D4TmFWAI5kuLXnRc",
    authDomain: "rps-multiplayer-e5058.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-e5058.firebaseio.com",
    projectId: "rps-multiplayer-e5058",
    storageBucket: "",
    messagingSenderId: "30279139656",
    appId: "1:30279139656:web:9b7442a7b42e36eed6737d",
    measurementId: "G-S2TPXH5RZQ"
  };

  // Initializing Firebase 
  firebase.initializeApp(firebaseConfig);

  //Declaring Global Variables 

  var database = firebase.database();


  var playerList = database.ref();
  var player1 = database.ref("/player1"); 
  var player2 = database.ref("/player2"); 
  var playerChat = database.ref("/chat") 
  var p1Score = 0; 
  var p2Score = 0;
  var p1Wins = 0; 
  var p2Wins = 0;
  var p1Losses = 0; 
  var p2Losses =0; 
  var ties = 0;


  player1.on("value", function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val() === null) {
        let waitMessage = $("<p>")
        waitMessage.text("Waiting for Player 1...")
        $("#player1-div").append(waitMessage)
    }
  }, function(errorObject) {
    console.log("The read has failed: " + errorObject.code);
  });
    

  player2.on("value", function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val() === null) {
        let waitMessage = $("<p>")
        waitMessage.text("Waiting for Player 2...")
        $("#player2-div").append(waitMessage)
    }
  }, function(errorObject) {
    console.log("The read has failed: " + errorObject.code);
  });   








});