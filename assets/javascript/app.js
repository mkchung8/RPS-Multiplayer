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
  var choices = ["rock","paper","scissors"];
  var p1Name; 
  var p2Name; 
  var p1Lock = false;
  var p2Lock = false;
  var p1TurnLock = false; 
  var p2TurnLock = true;
  var player1Move = ""; 
  var player2Move = "";
  var p1Wins = 0; 
  var p2Wins = 0;
  var p1Losses = 0; 
  var p2Losses =0; 
  var ties = 0;

    
  $("#player1-entry").on("click", function(){
    let player1 = $("#player1-name").val().trim();
    p1Lock = true;      

    p1Database.set({
        name: player1,
        move: player1Move,
        wins: p1Wins,
        losses: p1Losses, 
        ties: ties,
        turnLock: p1TurnLock,
        playerLock: p1Lock
        });  
     });

  $("#player2-entry").on("click", function(){
    let player2 = $("#player2-name").val().trim();
    p2Lock = true;  
    p2Database.set({
        name: player2,
        move: player2Move,
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
        p1Name = snapshot.val().name;
        p1TurnLock = snapshot.val().turnLock;
        player1Move = snapshot.val().move;
         if ((p1Lock === true) && (p2Lock ===false)) {
            $("#player1-form").remove();
            $("#player1-div").html("<h2>Player 1 is READY</h2>");
            $(".lead").text("Waiting for Player 2...");
             } else if ((p1Lock === true) && (p2Lock ===true)){
                $(".lead").text("READY, SET, BATTLE!");
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
        p2Name = snapshot.val().name;
        p2TurnLock = snapshot.val().turnLock;
        player2Move = snapshot.val().move;
         if ((p2Lock === true) && (p1Lock === false)) {
            $("#player2-form").remove();
            $("#player2-div").html("<h2>Player 2 is READY</h2>");
            $(".lead").text("Waiting for Player 1...");
         } else if ((p1Lock === true) && (p2Lock ===true)){
             $(".lead").text("READY, SET, BATTLE!");
            gameStart();
         };
        };
    }, function(errorObject){
        console.log("The read failed: " + errorObject.code)
    });
    
    
    function gameStart() {
    
        pushButtons();
        gamePlay();
        
    }
 
    function pushButtons() {
        

        $("#player1-div").empty();
        var player1Name = $(`<p>Player 1: </p><br><h1>${p1Name}</h1>`);
        var p1Rock = $('<div class="pick" data-id="rock">').html("<h2>Rock</h2>").css("border-style","solid").css("border-width","10px");
        var p1Paper = $('<div class="pick" data-id="paper">').html("<h2>Paper</h2>").css("border-style","solid").css("border-width","10px");
        var p1Scissors = $('<div class="pick" data-id="scissors">').html("<h2>Scissors</h2>").css("border-style","solid").css("border-width","10px");
        var p1Moves = $('<div id="p1-moves">');
        p1Moves.append(p1Rock).append(p1Paper).append(p1Scissors);
        $("#player1-div").append(player1Name).append(p1Moves);

        $("#player2-div").empty();
        var player2Name = $(`<p>Player 2: </p><br><h1>${p2Name}</h1>`);
        var p2Rock = $('<div class="pick" data-id="rock">').html("<h2>Rock</h2>").css("border-style","solid").css("border-width","10px");
        var p2Paper = $('<div class="pick" data-id="paper">').html("<h2>Paper</h2>").css("border-style","solid").css("border-width","10px");
        var p2Scissors = $('<div class="pick" data-id="scissors">').html("<h2>Scissors</h2>").css("border-style","solid").css("border-width","10px");
        var p2Moves = $('<div id="p2-moves">');
        p2Moves.append(p2Rock).append(p2Paper).append(p2Scissors);
        $("#player2-div").append(player2Name).append(p2Moves);
        
    
    }
        
    function gamePlay() {

        if ((p1TurnLock === false)&&(p2TurnLock === true)){
        $("#player1-div").css("border-color", "green");
        $(".lead").text("Make Your Choice Player 1...")
        $("#p1-moves").one("click", ".pick", function(){
                p1TurnLock = true;
                p2TurnLock = false;
                player1Move = $(this).attr("data-id");
                console.log(player1Move);
                p1Database.update({turnLock:p1TurnLock, move: player1Move});
                p2Database.update({turnLock:p2TurnLock});
            });
        } else if ((p1TurnLock === true)&&(p2TurnLock === false)){
            $("#player2-div").css("border-color", "green");
            $(".lead").text("Player 2 is making a move...")
            $("#p2-moves").one("click", ".pick", function(){
                    p2TurnLock = true;
                    player2Move = $(this).attr("data-id");
                    console.log(player2Move)
                    p2Database.update({turnLock:p2TurnLock, move: player2Move});
                    p1Database.update({turnLock:p1TurnLock})
                });
            } else if ((p1TurnLock === true)&&(p2TurnLock === true)){
                displayResult();
            };
   
    };

    function displayResult(){

       p1Database.once("value",function(snapshot){
         player1Move = snapshot.val().move;
       }, function(errorObject){
           console.log("This read failed: " + errorObject.code);
       });

       p2Database.once("value",function(snapshot){
        player2Move = snapshot.val().move;
      }, function(errorObject){
          console.log("This read failed: " + errorObject.code);
      });
      
      if ((player1Move === "rock")||(player1Move === "paper")||(player1Move === "scissors")){

      if ((player1Move === "rock" && player2Move === "scissors") || 
          (player1Move === "scissors" && player2Move === "paper")||
          (player1Move === "paper" && player2Move ==="rock")) {
              $(".lead").text("Victory to Player 1!")
          }
        }
    };
    
    
});