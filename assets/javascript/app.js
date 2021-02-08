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

  var p1StartButton = `<button type="button" id="p1-start-button" class="startButton" >
                         <h3>Player 1</h3> 
                         <br>
                         <h4 class="blink">Press to Start</h4>
                       </button>`;
  $("#player1-div").append(p1StartButton);
  $("#p1-start-button").one("click", function () {
    event.preventDefault();
    p1Select();
  });

  var p2StartButton = `<button type="button" id="p2-start-button" class="startButton">
                          <h3>Player 2</h3> 
                          <br>
                          <h4 class="blink">Press to Start</h4>
                         </button>`;
  $("#player2-div").append(p2StartButton);
  $("#p2-start-button").one("click", function () {
    event.preventDefault();
    p2Select();
  });

  // Tracks changes in key which contains player objects.
  playersRef.on("value",
    // successful callback function
    function (snapshot) {
      // Checking to see if players exist. 
      let playerOneExists = snapshot.child("player1").val();
      let playerTwoExists = snapshot.child("player2").val();
      if (!playerOneExists) {
        console.log('p1 does not exist');
      } else if (playerOneExists) {
        console.log(`player 1 exists`);
        $("#p1-start-button").remove();
      };

      if (!playerTwoExists) {
        console.log('player 2 does not exist');
      } else {
        console.log('player two does exist');
        $("#p2-start-button").remove();
        $("#p2-score").html(`<p2 style="color:green;"> P2 READY </p2>`);
      };

      if (playerTwoExists && playerTwoExists) {
        console.log('both players exist');
        $("#sub-title").text("Ready for Battle!!!"); 
        gamePlay();
      };
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

  function p1Select() {
    $("#p1-start-button").remove();
    $("#p1-title").text("Player 1");
    var p1Input = `<form id="player1-form" class="player-form">
                    <p1>Enter Name: </p1><br><input id="player1-name" type="text">
                    <input id="player1-entry" type="submit" value="Submit">
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
    $("#p1-title").text(p1Name); 
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
    $("#p2-title").text(p2Name); 
  };

  function gamePlay() {
    console.log("gameplay exec 1");

  };

  function resetGame() {
    console.log("reset game exec");
  };

  function busyGame() {
    console.log("sorry this game is already full");
  };

});