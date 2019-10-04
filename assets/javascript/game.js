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

   /*if ((player1Choice === "rock") || (player1Choice === "paper") || (player1Choice === "scissors")) {
       if ((player1Choice === "rock" && player2Choice === "scissors") || (player1Choice === "scissors" && player2Choice ))
   } */






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