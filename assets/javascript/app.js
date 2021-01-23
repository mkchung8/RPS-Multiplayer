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
  var username = "Guest";
  var playerLock = false;

  // Tracks changes in key which contains player objects.
  playersRef.on("value", function (snapshot) {
    // Checking to see if players exist. 
    let playerOneExists = snapshot.child("1").val();
    let playerTwoExists = snapshot.child("2").val();
    console.log(`p1: ${playerOneExists}`);
    console.log(`p2: ${playerTwoExists}`);
    if (!playerOneExists && !playerTwoExists) {
      console.log("no players");
      var p1StartButton = `<button type="button" id="p1-start-button" class="startButton" >
                              <h3>Player 1</h3> 
                              <br>
                              <h4 class="blink">Press to Start</h4>
                           </button>`;
      var p2StartButton = `<button type="button" id="p2-start-button" class="startButton">
                              <h3>Player 2</h3> 
                              <br>
                              <h4 class="blink">Press to Start</h4>
                           </button>`
      $("#player1-div").append(p1StartButton);
      $("#player2-div").append(p2StartButton);

      setTimeout(function () {
        $("#sub-title").html("<p3>Players Press Start!</p3>");
      }, 2000);

      $("#p1-start-button").one("click", function () {
        console.log("p1 button has been presssed");
        p1Select();
      });
      $("#p2-start-button").one("click", function () {
        console.log("p2 button has been pressed");
        p2Select();
      });
    } else if (playerOneExists && !playerTwoExists) {
      console.log("waiting for player 2")
    } else if (!playerOneExists && playerTwoExists) {
      console.log("waiting for player 1")
    } else if (playerOneExists && playerTwoExists) {
      console.log("start play");
      playerLock = true;
      gamePlay();
    };
  });

  function blinkIt() {
    var blinks = document.getElementsByClassName("blink");
    for (var i = 0, l = blinks.length; i < l; i++) {
      var blink = blinks[i];
      var visiblity = blink.style.visibility;
      blink.style.visibility = visiblity == 'visible' ? 'hidden' : 'visible';
    }
  }
  setInterval(blinkIt, 500 /* blinking interval in ms */);

  function p1Select() {
    console.log('p1 select exec');
    var p1Input = `<form id="player1-form" class="player-form">
                        <p1>Enter Name: </p1><br><input id="player1-name" type="text">
                        <input id="player1-entry" type="submit" value="Submit">
                       </form>`;
    $("#p1-title").text("Player 1");
    $("#p1-start-button").remove();
    $("#player1-div").append(p1Input);
    $("#player1-entry").one("click", function () {
      event.preventDefault();

      playersRef.child("player1").set({

      });
      console.log(`player 1 exists as: ${username}`)
    });
  };

  function p2Select() {
    console.log('p2 select exec');
    $("#p2-title").text("Player 2");
    var p2Input = `<form id="player2-form" class="player-form">
                        <p1>Player 2 :</p1><br> <input id="player2-name" type="text">
                        <input id="player2-entry" type="submit" value="Submit">
                       </form>`;
    $("#player2-div").html(p2Input);

    $("#player2-entry").on("click", function () {
      event.preventDefault();
      if ($("#player2-name").val() !== "") {
        username = capitalize($("#player2-name").val());
        playersRef.child("player2").set({
          name: username,
          wins: 0,
          losses: 0,
          choice: null,
          turnLock: true
        });
      };
    });
  };

  function gamePlay() {
    console.log("gameplay exec");
  };

  function resetGame() {
    console.log("reset game exec");
  };

});