
$(document).ready(function(){

  // Your web app's Firebase configuration
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();
  var playerTurn = database.ref();
  var player1 = database.ref("/player1")
  var player2 = database.ref("/player2"); 
  var player1Score = 0; 
  var player2Score = 0; 
  var roundNumber = 1;
  var p1Lock = false; 
  var p2Lock = false; 
  var start = 0; 

  database.ref().set({
    p1Choice: player1Choice,
    p2Choice: player2Choice,
    p1Score: player1Score,
    p2Score: player2Score,
    round: roundNumber,
  });

  function startscreen() {
    $(".lead").text("Welcome to the Battledome. Press Start to Begin.")

    let startButton1 = $('<button type="button" id="player1-start" class="btn btn-dark">Player 1 Start</button>');
    $("#player1-div").append(startButton1);
    
    let startButton2 = $('<button type="button" id="player2-start" class="btn btn-dark">Player 2 Start</button>');
    $("#player2-div").append(startButton2);
    
    $("#player1-start").on("click", function(){
        $("#player1-start").remove();
        start++;
        if (start === 1) {
        $(".lead").text("Waiting for other player to press start...")
        }
        else if (start === 2) {
            $(".lead").text("BATTLE BEGIN!")
            battleRound();
         }
    });
    
    $("#player2-start").on("click", function(){
        $("#player2-start").remove();
       start++;
       if (start === 1) {
        $(".lead").text("Waiting for other player to press start...")
        }
        else if (start === 2) {
            $(".lead").text("BATTLE BEGIN!")
            battleRound();
         }
    });



  };
  
  startscreen(); 

  

  function battleRound() {
     var p1selectRock = $('<button type="button" data-id="rock" class="btn btn-dark btn-lg">Rock</button>');
     var p1selectPaper = $('<button type="button" data-id="paper" class="btn btn-dark btn-lg">Paper</button>');
     var p1selectScissors = $('<button type="button" data-id="scissors" class="btn btn-dark btn-lg">Scissors</button>');

     $("#player1-div").append(p1selectRock).append(p1selectPaper).append(p1selectScissors);
     
     $("#player1-div").on("click","button", function(){
         player1Choice = $(this).attr("data-id");
         console.log(`player 1 picked ${player1Choice}`)
         database.ref().set({
             p1Choice: player1Choice
            
             });
        
         p1Lock = true; 
         if ((p1Lock === true) && (p2Lock === false)) {
             $("#player1-div button").attr("disabled", true);
             $(".lead").text("Waiting for Player 2.")
             }
        else if ((p1Lock === false) && (p2Lock === false)) {
            $(".lead").text("Select your Move")
        }
        else if ((p1Lock === true) && (p2Lock === true)){
            $("#player1-div").text(`Player 1 has picked ${player1Choice}`)
            $("#player2-div").text(`Player 2 has picked ${player2Choice}`)
            $(".lead").text("the winner is!...")
        }

         });
     
     var p2selectRock = $('<button type="button" data-id="rock" class="btn btn-dark btn-lg">Rock</button>');
     var p2selectPaper = $('<button type="button" data-id="paper" class="btn btn-dark btn-lg">Paper</button>');
     var p2selectScissors = $('<button type="button" data-id="scissors" class="btn btn-dark btn-lg">Scissors</button>');

    $("#player2-div").append(p2selectRock).append(p2selectPaper).append(p2selectScissors);

    $("#player2-div").on("click", "button", function(){
        player2Choice = $(this).attr("data-id")
        console.log(`player 2 picked ${player2Choice}`)
        database.ref().set({
        p2Choice: player2Choice
            });
        p2Lock = true; 
        if ((p1Lock === false) && (p2Lock === true)) {
            $("#player2-div button").attr("disabled", true);
            $(".lead").text("Waiting for Player 1.")
            }
       else if ((p1Lock === false) && (p2Lock === false)) {
           $(".lead").text("Select your Move")
       }
       else if ((p1Lock === true) && (p2Lock === true)){
           $("#player1-div").text(`Player 1 has picked ${player1Choice}`)
           $("#player2-div").text(`Player 2 has picked ${player2Choice}`)
           $(".lead").text("the winner is!...")
       }
    });

    database.ref().on("value", function(snapshot){
        console.log(snapshot.val())
    }, function(errorObject){
        console.log("The read failed: " + errorObject.code)
    });

   if ((player1Choice === "rock") || (player1Choice === "paper") || (player1Choice === "scissors")) {
       if ((player1Choice === "rock" && player2Choice === "scissors") || (player1Choice === "scissors" && player2Choice ))
   } 






   // Publishes Player 1 Data to Firebase 
  player1.on("value", function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val() === null) {
        let waitMessage = $("<p>")
        waitMessage.text("Waiting for Player 1...")
        waitMessage.css("margin-top", "100px")
        $("#player1-div").append(waitMessage)
    } else {
        player1 = snapshot.val().name
    }
  }, function(errorObject) {
    console.log("The read has failed: " + errorObject.code);
  });
    
// Publishes Player 2 Data to Firebase 
  player2.on("value", function(snapshot) {
    
    if (snapshot.val() === null) {
        let waitMessage = $("<p>")
        waitMessage.text("Waiting for Player 2...")
        waitMessage.css("margin-top", "100px")
        $("#player2-div").append(waitMessage)
    }
  }, function(errorObject) {
    console.log("The read has failed: " + errorObject.code);
  });   

  function gamePlay() {
    console.log("game is starting now")
    var buttonRock = $('<button type="button" data-id="rock" class="btn btn-dark btn-lg">Rock</button>');
    var p1selectPaper = $('<button type="button" data-id="paper" class="btn btn-dark btn-lg">Paper</button>');
    var p1selectScissors = $('<button type="button" data-id="scissors" class="btn btn-dark btn-lg">Scissors</button>');

  };
};
}); 


p1Database.on("value",function(snapshot){  
  if (snapshot.val() !== null){
  console.log("p1 data: " + snapshot.val());
  console.log("p1 name: " + snapshot.val().name);
  p1Lock = snapshot.val().playerLock;
  p1Name = snapshot.val().name;
   if ((p1Lock === true) && (p2Lock ===false)) {
      $("#player1-form").remove();
      $("#player1-div").html("<h2>Player 1 is READY</h2>");
      $(".lead").text("Waiting for Player 2...");
       } else if ((p1Lock === true) && (p2Lock ===true)){
          $(".lead").text("READY, SET, BATTLE!");
          setTimeout(gameStart, 1000*3)
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
   if ((p1Lock === false) && (p2Lock ==true)) {
      $("#player2-form").remove();
      $("#player2-div").html("<h2>Player 2 is READY</h2>");
      $(".lead").text("Waiting for Player 1...");
   } else if ((p1Lock === true) && (p2Lock ===true)){
       $(".lead").text("READY, SET, BATTLE!");
      setTimeout(gameStart, 1000*3);
   };
  };
}, function(errorObject){
  console.log("The read failed: " + errorObject.code)
});


// start of cp 11111111111111111111111

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

  if ((p1Lock === false && p2Lock ===true)||(p1Lock === true && p2Lock ===false)) {

      if (p1Lock === true) {
           
      } else {
          $("#player2-form").remove();
           $("#player2-div").html("<h2>Player 2 is READY</h2>");
          $(".lead").text("Waiting for Player 1...");
      };
  } else if ((p1Lock === true) && (p2Lock ===true)) {
      $(".lead").text("READY, SET, BATTLE!");
      setTimeout(gameStart, 1000*3) 
  };   

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

      if ((p1Lock === false && p2Lock ===true)||(p1Lock === true && p2Lock ===false)) {

          if (p1Lock === true) {
              $("#player1-form").remove(); 
              $("#player1-div").html("<h2>Player 1 is READY</h2>");
              $(".lead").text("Waiting for Player 2...");
          } else {
              $("#player2-form").remove();
               $("#player2-div").html("<h2>Player 2 is READY</h2>");
              $(".lead").text("Waiting for Player 1...");
          };
      } else if ((p1Lock === true) && (p2Lock === true)) {
          $(".lead").text("READY, SET, BATTLE!");
          setTimeout(gameStart, 1000*3) 
      };   
   
   });

  
   p1Database.on("value",function(snapshot){  
      if (snapshot.val() !== null){
      console.log("p1 data: " + snapshot.val());
      console.log("p1 name: " + snapshot.val().name);
      p1Lock = snapshot.val().playerLock;
      p1Name = snapshot.val().name;
       if ((p1Lock === true) && (p2Lock ===false)) {
          $("#player1-form").remove();
          $("#player1-div").html("<h2>Player 1 is READY</h2>");
          $(".lead").text("Waiting for Player 2...");
           } else if ((p1Lock === true) && (p2Lock ===true)){
              $(".lead").text("READY, SET, BATTLE!");
              setTimeout(gameStart, 1000*3)
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
       if ((p1Lock === false) && (p2Lock ==true)) {
          $("#player2-form").remove();
          $("#player2-div").html("<h2>Player 2 is READY</h2>");
          $(".lead").text("Waiting for Player 1...");
       } else if ((p1Lock === true) && (p2Lock ===true)){
           $(".lead").text("READY, SET, BATTLE!");
          setTimeout(gameStart, 1000*3);
       };
      };
    }, function(errorObject){
      console.log("The read failed: " + errorObject.code)
    });
    
  
  


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
          $("#player2-div").css("border-color", "black");
          $(".lead").text("Make Your Move Player 1...");
          $("#p1-moves").one("click", ".pick", function(){
              p1TurnLock = true;
              p2TurnLock = false;
              player1Move = $(this).attr("data-id");
              console.log(player1Move);
              p1Database.update({turnLock:p1TurnLock, move: player1Move});
              p2Database.update({turnLock:p2TurnLock});
              });
          } else if ((p1TurnLock === true)&&(p2TurnLock === false)){
          $("#player1-div").css("border-color","black");
          $("#player2-div").css("border-color", "green");
          $(".lead").text("Make Your Move Player 2...");
          $("#p2-moves").one("click", ".pick", function(){
                  p2TurnLock = true;
                  player2Move = $(this).attr("data-id");
                  console.log(player2Move)
                  p2Database.update({turnLock:p2TurnLock, move: player2Move});
                  p1Database.update({turnLock:p1TurnLock});
                  console.log("p1 turn lock" + p1TurnLock);
                  console.log("p2 turn lock" + p2TurnLock);
              });
          } else if ((p1TurnLock === true)&&(p2TurnLock === true)){
              displayResult();
              console.log("display results function trigger");
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
    
    console.log("play1move" + player1Move);
    console.log("play2move" + player2Move);
    if ((player1Move === "rock")||(player1Move === "paper")||(player1Move === "scissors")){

    if ((player1Move === "rock" && player2Move === "scissors") || 
        (player1Move === "scissors" && player2Move === "paper")||
        (player1Move === "paper" && player2Move ==="rock")) {
            $(".lead").text("Victory to Player 1!");
        }
      };
  };
  
  