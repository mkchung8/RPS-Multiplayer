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
  var playerNum = false;
  var playerOneData = null;
  var playerTwoData = null;

  var p1StartButton = `<button type="button" id="p1-start-button" class="startButton" >
                         <h3>Player 1</h3> 
                         <br>
                         <h4 class="blink">Press to Start</h4>
                       </button>`;

  var p2StartButton = `<button type="button" id="p2-start-button" class="startButton">
                          <h3>Player 2</h3> 
                          <br>
                          <h4 class="blink">Press to Start</h4>
                         </button>`;
  $("#player2-div").append(p2StartButton);



  // Tracks changes in key which contains player objects.
  playersRef.on("value",
    // successful callback function
    function (snapshot) {
      currentPlayers = snapshot.numChildren();
      // Checking to see if players exist. 
      let playerOneExists = snapshot.child("player1").val();
      let playerTwoExists = snapshot.child("player2").val();

      // Player Data Objects
      playerOneData = snapshot.child("1").val();
      playerTwoData = snapshot.child("2").val();



      if (playerOneExists) {
        $("#p1-title").html(`<p class="mt-1">PLAYER 1</p></br><h3 class="p-0"><b>${playerOneData.name}</b></h3>`);
        $("#p1-score").html(`<p2>P1: ${playerOneData.wins}</p2>`);
      } else {
        $("#p1-title").html(`<p style="color:red">Waiting for P1...</p>`);
        $("#player1-div").append(p1StartButton);
        $("#p1-score").empty();
        $("#tie-score").empty();
      }
      $(".startButton").on("click", function () {
        event.preventDefault();
        $(this).remove();
        loadPlayerForm();
      });
      // if (!playerOneExists) {
      //   console.log('p1 does not exist');
      // } else if (playerOneExists) {
      //   console.log(`player 1 exists`);
      //   $("#p1-start-button").remove();
      //   $("#p1-score").html(`<p2 style="color:green;"> P1 READY </p2>`);
      // };

      // if (!playerTwoExists) {
      //   console.log('player 2 does not exist');
      // } else {
      //   console.log('player two does exist');
      //   $("#p2-start-button").remove();
      //   $("#p2-score").html(`<p2 style="color:green;"> P2 READY </p2>`);
      // };

      // if (playerTwoExists && playerTwoExists) {
      //   console.log('both players exist' + currentPlayers);
      //   $("#sub-title").text("Ready for Battle!!!"); 
      //   currentTurnRef.set(1); 
      //   gamePlay();
      // };
    },
    // error callback
    function (error) {
      console.error(error);
    });

  function blinkIt() {
    var blinks = document.getElementsByClassName("blink");
    for (var i = 0, l = blinks.length; i < l; i++) {
      var blink = blinks[i];
      var visiblity = blink.style.visibility;
      blink.style.visibility = visiblity == 'visible' ? 'hidden' : 'visible';
    }
  };
  setInterval(blinkIt, 500 /* blinking interval in ms */);

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  function loadPlayerForm() {
    var playerInputForm = `<form class="player-form">
                    <p1>Enter Name: </p1><br><input id="username" type="text">
                    <input id="name-enter" type="submit" value="Submit">
                   </form>`;
    $("#player1-div").append(playerInputForm);
    $("#name-enter").on("click", function () {
      event.preventDefault();
      if ($("#username").val() !== "") {
        username = capitalize($("#username").val());
        console.log("enter name button was pressed");
        playerSet(username);
      }
    });
  };

  function playerSet(username) {
    console.log(username);
  }; 

  function p1Select() {
    $("#p1-start-button").remove();
    $("#p1-title").text("Player 1");
    var p1Input = `<form class="player-form">
                    <p1>Enter Name: </p1><br><input id="username" type="text">
                    <input id="name-enter" type="submit" value="Submit">
                   </form>`;
    $("#player1-div").append(p1Input);
    $("#player1-entry").on("click", function () {
      event.preventDefault();
      if ($("#player1-name").val() !== "") {
        p1Name = capitalize($("#player1-name").val());
        console.log(`p1 name is :${p1Name}`);
        $("#player1-form").remove();
        $("#p1-score").html(`<p2 style="color:red;">P1 Ready!</p2>`);
        p1Set(p1Name);
      } else {
        console.log(`p1 name is: guest`);
        p1Set(p1Name);
      }
    });
  }
  function p1Set(p1Name) {
    console.log("p1 set execute " + p1Name);
    playersRef.child("player1").set({
      p1Name: p1Name,
      wins: 0,
      losses: 0,
      choice: null,
      turnLock: true
    });
    $("#player1-div").html(`<p class="mt-1">PLAYER 1</p></br><h3 class="p-0"><b>${p1Name}</b></h3>`);
  };

  function p2Select() {
    console.log('p2 select exec');
    $("#p2-start-button").remove();
    $("#p2-title").text("Player 2");
    var p2Input = `<form id="player2-form" class="player-form">
                        <p1>Enter Name:</p1><br> <input id="player2-name" type="text">
                        <input id="player2-entry" type="submit" value="Submit">
                       </form>`;
    $("#player2-div").append(p2Input);
    $("#player2-entry").on("click", function () {
      event.preventDefault();
      if ($("#player2-name").val() !== "") {
        p2Name = capitalize($("#player2-name").val());
        console.log(`p2 name is ${p2Name}`);
        $("#player2-form").remove();
        p2Set(p2Name);
      } else {
        p2Name = "Guest";
        p2Set(p2Name);
      }
    });
  };
  function p2Set(p2Name) {
    console.log("p2 set exec");
    playersRef.child("player2").set({
      p2Name: p2Name,
      wins: 0,
      losses: 0,
      choice: null,
      turnLock: true
    });
    $("#player2-div").html(`<p class="mt-1">PLAYER 2</p></br><h3 class="p-0"><b>${p2Name}</b></h3>`);
  };

  currentTurnRef.on("value", function (snapshot) {
    currentTurn = snapshot.val();
    console.log("current turn: " + currentTurn);
  });

  function gamePlay() {
    console.log("gameplay exec 1");
    $("#score-title").html('<h2>SCORE</h2>');
    $("#p1-score").html('<p2>P1: 0</p2>');
    $("#p2-score").html('<p2>P2: 0</p2>');
    $("#tie-score").html('<p2>Ties: 0</p2>');
  };

  function resetGame() {
    console.log("reset game exec");
  };

  function busyGame() {
    console.log("sorry this game is already full");
  };

});