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
  var players = database.ref();
  var p1Database = database.ref("player1");
  var p2Database = database.ref("player2");
  var playerTurn = database.ref("turn-track");
  var playerChat = database.ref("chat"); 
  var player1; 
  var player2;
  var p1Name; 
  var p2Name; 
  var p1Lock = false;
  var p2Lock = false;
  var p1TurnLock = false; 
  var p2TurnLock = false;
  var player1Move; 
  var player2Move;
  var p1Wins = 0; 
  var p2Wins = 0;
  var p1Losses = 0; 
  var p2Losses =0; 
  var ties = 0;

    
  $("#player1-entry").on("click", function(){
    p1Name = $("#player1-name").val().trim();
    p1Lock = true;      

    p1Database.set({
        name: p1Name,
        wins: p1Wins,
        losses: p1Losses, 
        ties: ties,
        turnLock: p1TurnLock,
        playerLock: p1Lock
        });  
     });

  $("#player2-entry").on("click", function(){
    p2Name = $("#player2-name").val().trim();
    p2Lock = true;  
    p2Database.set({
        name: p2Name,
        wins: p2Wins,
        losses: p2Losses, 
        ties: ties,
        turnLock: p2TurnLock,
        playerLock: p2Lock
        }); 
     });

    p1Database.on("value",function(snapshot){  
        if (snapshot.val() !== null){
        console.log("p1 data: " + snapshot.val());
        console.log("p1 name: " + snapshot.val().name);
        p1Lock = snapshot.val().playerLock;
         if (p1Lock === true) {
            $("#player1-form").remove();
            $("#player1-div").text("Player 1 is READY");
            $(".lead").text("Waiting for Player 2...");
            gameStart();
             };  
            };
    }, function(errorObject){
        console.log("The read failed: " + errorObject.code)
     });

    p2Database.on("value",function(snapshot){  
        if (snapshot.val() !== null){
        console.log("p2 data: " + snapshot.val());
        console.log("p2 name: " + snapshot.val().name);
        p2Lock = snapshot.val().playerLock;
         if (p2Lock === true) {
            $("#player2-form").remove();
            $("#player2-div").text("Player 2 is READY");
            $(".lead").text("Waiting for Player 1...");
            gameStart();
         };
        };
    }, function(errorObject){
        console.log("The read failed: " + errorObject.code)
    });
    
    
    function gameStart() {
        if ((p1Lock === true) && (p2Lock === true)){
            $(".lead").text("READY, SET, BATTLE!")
            setTimeout(gamePlay, 1000*5)
        }
    }
 
    function gamePlay() {
        console.log("game begin")
    }
        
    
   
   


    
    
});