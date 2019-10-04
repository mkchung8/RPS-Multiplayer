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


  var playerList = database.ref("/player-list");
  var player1 = database.ref("/player-list/player1"); 
  var player2 = database.ref("/player-list/player2"); 
  var playerChat = database.ref("/chat") 
  var currentPlayer;
  var p1Name; 
  var p2Name;
  var p1Lock = false;
  var p2Lock = false;
  var p1Snapshot;
  var p2Snapshot;
  var p1Wins = 0; 
  var p2Wins = 0;
  var p1Losses = 0; 
  var p2Losses =0; 
  var ties = 0;
  

  $("#player1-entry").on("click", function(){
      p1Name = $("#player1-name").val().trim();
      p1Lock = true;
      player1.set({
          name: p1Name,
          wins: p1Wins,
          losses: p1Losses, 
          ties: ties,
          lock: p1Lock
      }); 

      
  });

  $("#player2-entry").on("click", function(){
    p2Name = $("#player2-name").val().trim();
    p2Lock = true;
    $("#player2-div").empty();
    $("#player2-div").html(`<h2>Player 2 is ${p2Name}</h2><br><br><h1>READY</h1>`);
    $("#player2-form").remove();
    
    
    database.ref("/player-list/player2").set({
        name: p2Name,
        wins: p2Wins,
        losses: p2Losses, 
        ties: ties,
        lock: p2Lock
        }); 

     if ((p1Lock === true) && (p2Lock===true)){
            gamePlay();
        }

    });
   
    

 database.ref().on("value", function(snapshot){
      if 
 }, function(errorObject){
    console.log("The read failed " + errorObject.code)
 });







});