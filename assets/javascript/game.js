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

  var player1Choice = "";
  var player2Choice = ""; 
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
     
     
     var p2selectRock = $('<button type="button" data-id="rock" class="btn btn-dark btn-lg">Rock</button>');
     var p2selectPaper = $('<button type="button" data-id="paper" class="btn btn-dark btn-lg">Paper</button>');
     var p2selectScissors = $('<button type="button" data-id="scissors" class="btn btn-dark btn-lg">Scissors</button>');
     
    $("#player2-div").append(p2selectRock).append(p2selectPaper).append(p2selectScissors);
};
  
  $("#p1rock").on("click",function(){
      player1Choice = "Rock";
      console.log("click")
      database.ref().set({
        p1Choice: player1Choice,
      })
  })
  
});