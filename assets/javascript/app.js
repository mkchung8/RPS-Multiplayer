$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBypcBm8MJ4Rxq6bnFt_bv5nDc5HczywOQ",
    authDomain: "rps-multiplayer-game-3918b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-game-3918b.firebaseio.com",
    projectId: "rps-multiplayer-game-3918b",
    storageBucket: "rps-multiplayer-game-3918b.appspot.com",
    messagingSenderId: "551952519975",
    appId: "1:551952519975:web:a9aa83262ff84010dccf02"
  };

  firebase.initializeApp(config);

  // Declaring Variables 
  var database = firebase.database();
  var playersRef = database.ref("players");
  var currentTurnRef = database.ref("turn");
  var currentPlayers = null;
  var currentTurn = null;
  var playerNum = false;
  var playerOneData = null;
  var playerTwoData = null;
  var playerOneExists = false;
  var playerTwoExists = false;

  // START BUTTONS  
  var p1StartButton = `<button type="button" data-player-number=1 id="p1-start-button" class="startButton" >
                         <h3>Player 1</h3> 
                         <br>
                         <h4 class="blink">Press to Start</h4>
                       </button>`;

  var p2StartButton = `<button type="button" data-player-number=2 id="p2-start-button" class="startButton">
                          <h3>Player 2</h3> 
                          <br>
                          <h4 class="blink">Press to Start</h4>
                         </button>`;

  $("#player2-div").append(p2StartButton);
  $("#player1-div").append(p1StartButton);

  // Start Button Event Listener: Goes to Load Player Input Form. 
  $(".startButton").one("click", function () {
    pNum = $(this).data("player-number");
    loadPlayerForm(pNum);
    $(this).remove();
  });

  // Click events for dynamically added <li> elements
  $(document).on("click", "li", function(){

    // Grabs text from <li> choice selected by user. 
    var clickChoice = $(this).text(); 

    // Sets choice in current player's object in firebase. 
    playerRef.child("choice").set(clickChoice); 

    // Increments turn. Turn goes from:
    // 1 - player 1
    // 2 - player 2
    // 3 - determine winner
    currentTurnRef.transaction(function(turn){
      return turn + 1;
    });
  }); 

  // Tracks changes in key which contains player objects.
  playersRef.on("value",
    // successful callback function
    function (snapshot) {
      // Length of Players Array
      currentPlayers = snapshot.numChildren();
      console.log(`current players: ${currentPlayers}`)

      // Checking to see if players exist. 
      playerOneExists = snapshot.child("1").val();
      playerTwoExists = snapshot.child("2").val();

      // Player Data Objects
      playerOneData = snapshot.child("1").val();
      playerTwoData = snapshot.child("2").val();

      // If there is a Player 1, fill in name and score data.
      if (playerOneExists) {
        $("#p1-title").html(`<p class="mt-1">PLAYER 1</p></br><h3 class="p-0"><b>${playerOneData.name}</b></h3>`);
        $("#p1-score").html(`<p2>P1: ${playerOneData.wins}</p2>`);
        $("#p1-start-button").remove();
      } else {
        // If there is no Player 1, clear score and show waiting. 
        $("#p1-title").html(`<h2 style="color:red">Waiting for P1...</h2>`);
        $("#p1-score").empty();
        $("#tie-score").empty();
      }

      // If there is a Player 2, fill in name and score data. 
      if (playerTwoExists) {
        $("#p2-title").html(`<p class="mt-1">PLAYER 2</p></br><h3 class="p=0"><b>${playerTwoData.name}</b></h3>`);
        $("#p2-score").html(`<p2>P2: ${playerTwoData.wins}</p2>`);
        $("#p2-start-button").remove();
      } else {
        // If there is no Player 2, clear score and show waiting. 
        $("#p2-title").html(`<h2 style="color:red">Waiting for P2...</h2>`);

        $("#p2-score").empty();
        $("#tie-score").empty();
      }
    },
    // error callback
    function (error) {
      console.error(error);
    });

  // Function to make text blink. 
  function blinkIt() {
    var blinks = document.getElementsByClassName("blink");
    for (var i = 0, l = blinks.length; i < l; i++) {
      var blink = blinks[i];
      var visiblity = blink.style.visibility;
      blink.style.visibility = visiblity == 'visible' ? 'hidden' : 'visible';
    }
  };
  setInterval(blinkIt, 500 /* blinking interval in ms */);

  // Function to capitalize user name. 
  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Function that loads player form to user's div. 
  function loadPlayerForm(pNum) {
    var playerInputForm = `<form id="p${pNum}-form">
                             <p1>Enter Name: </p1><br><input id="p${pNum}-username" type="text">
                             <input class="name-enter" type="submit" value="Submit">
                           </form>`;
    $(`#player${pNum}-div`).append(playerInputForm);
    $(".name-enter").on("click", function () {
      event.preventDefault();
      if ($(`#p${pNum}-username`).val() !== "") {
        username = capitalize($(`#p${pNum}-username`).val());
        console.log("enter name button was pressed" + username);
        playerSet(username, pNum);
        $(`#p${pNum}-form`).remove();
      }
    });
  };

  // When a player joins, checks to see if there is two players. If yes, game will start. 
  playersRef.on("child_added", function (snapshot) {
    if (currentPlayers === 1) {
      // Sets Turn Ref Counter to 1, which will trigger the game to start. 
      currentTurnRef.set(1);
    }
  });

  // Function to get user into the game. 
  function playerSet(username, pNum) {

    // Checks for Current Players: If there is a P1 Connected, then player becomes P2. 
    // If there is no P1, then user becomes P1. 
    if (currentPlayers < 2) {
      if (playerOneExists) {
        playerNum = 2;
        console.log("p" + playerNum);
      } else {
        playerNum = 1;
        console.log("p" + playerNum);
      }
      // Creates key based on player's number. 
      playerRef = database.ref("/players/" + pNum);

      // Creates Player's Object and pushes it to Firebase. 
      playerRef.set({
        name: username,
        wins: 0,
        losses: 0,
        choice: null
      });

    } else {
      // Sends and alert if another player tries to get in the game when theres already two players. 
      alert("Sorry! This Game is Full. Please Try Again Later!");
    }

    // Turns Current Turn Ref to null on disconnect, which will discontinue the game. 
    currentTurnRef.onDisconnect().remove();

    // Removes Player's Object on Disconnect. 
    playerRef.onDisconnect().remove();
  };

  // Tracks changes in Current Turn Key Ref. 
  currentTurnRef.on("value", function (snapshot) {
    // Gets current turn value from snapshot
    currentTurn = snapshot.val();

    // Do not execute if not player is not connected. 
    if (playerNum) {
      // For the first turn: 
      if (currentTurn === 1) {
        if (currentTurn === playerNum) {
          $("#sub-title").text("It's Your Turn!"); 
          $(`#player${playerNum}-div`).append(`<ul id="${playerNum}-choices"><li>Rock</li><li>Paper</li><li>Scissors</li></ul>`);
        } else {
          $("#sub-title").text("Waiting for " + playerOneData.name + " to choose");
        }
        $("#player1-div").css("border", "3px solid green");
        $("#player2-div").css("border", "3px solid red"); 
      }
    }
  });

});