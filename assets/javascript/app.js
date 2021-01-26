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
  var playerLock = false;
  var p1Name = "";
  var p2Name = "";

  // Tracks changes in key which contains player objects.
  playersRef.on("value",
    // successful callback function
    function (snapshot) {
      // Checking to see if players exist. 
      let playerOneExists = snapshot.child("player1").val();
      let playerTwoExists = snapshot.child("player2").val();
      console.log(`p1: ${playerOneExists}`);
      console.log(`p2: ${playerTwoExists}`);
      if (!playerOneExists && !playerTwoExists) {
        console.log("no players");
        p1Name="Guest"; 
        p2Name="Guest"; 
        // var p1StartButton = `<button type="button" id="p1-start-button" class="startButton" >
        //                       <h3>Player 1</h3> 
        //                       <br>
        //                       <h4 class="blink">Press to Start</h4>
        //                    </button>`;
        // var p2StartButton = `<button type="button" id="p2-start-button" class="startButton">
        //                       <h3>Player 2</h3> 
        //                       <br>
        //                       <h4 class="blink">Press to Start</h4>
        //                    </button>`;
        // // $("#player1-div").append(p1StartButton);
        // $("#player2-div").append(p2StartButton);

        // setTimeout(function () {
        //   $("#sub-title").html("<p3>Players Press Start!</p3>");
        //   $("#p1-score").html(`<p2 style="color:red;">Waiting for P1...</p2>`);
        //   $("#p2-score").html(`<p2 style="color:red;">Waiting for P2...</p2>`);
        // }, 2000);

        // $("#p1-start-button").one("click", function () {
        //   console.log("p1 button has been presssed");
        //   p1Select();
        // });
        p1Select();
        p2Select();
        // $("#p2-start-button").one("click", function () {
        //   console.log("p2 button has been pressed");
        //   p2Select();
        // });
      } else if (playerOneExists && !playerTwoExists) {
        console.log("waiting for player 2");
        // $("#p1-title").html(`<p2>Player 1 Ready</p2>`);
        // $("#player1-form").remove();
        p2Select(); 

      } else if (!playerOneExists && playerTwoExists) {
        console.log("waiting for player 1");
      } else if (playerOneExists && playerTwoExists) {
        console.log("start play");
        playerLock=true; 
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
    console.log('p1 select exec');

    var p1StartButton = `<button type="button" id="p1-start-button" class="startButton" >
                           <h3>Player 1</h3> 
                           <br>
                           <h4 class="blink">Press to Start</h4>
                         </button>`;
    $("#player1-div").append(p1StartButton);

    $("#p1-start-button").one("click", function () {
      event.preventDefault();
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
          $("#p1-score").html(`<p2 style="color:red;">P1 Ready!</p2>`);
          p1Set(p1Name);
        } else {
          console.log(`p1 name is: guest`);
          p1Set(p1Name);
        }
      });
    });
  };

  function p1Set(p1Name) {
    console.log("p1 set execute " + p1Name);
    playersRef.child("player1").set({
      p1Name: p1Name,
      wins: 0,
      losses: 0,
      choice: null,
      turnLock: true
    });
  };

  function p2Select() {
    console.log('p2 select exec');

    var p2StartButton = `<button type="button" id="p2-start-button" class="startButton">
                          <h3>Player 2</h3> 
                          <br>
                          <h4 class="blink">Press to Start</h4>
                        </button>`;
    $("#player2-div").append(p2StartButton);

    $("#p2-start-button").one("click", function () {
      event.preventDefault();
      $("#p2-start-button").remove();
      $("#p2-title").text("Player 2");
      var p2Input = `<form id="player2-form" class="player-form">
                        <p1>Enter Name:</p1><br> <input id="player2-name" type="text">
                        <input id="player2-entry" type="submit" value="Submit">
                       </form>`;
      $("#player2-div").append(p2Input);
      $("#player2-entry").on("click", function(){
        event.preventDefault(); 
        if ($("#player2-name").val() !== "") {
          p2Name = capitalize($("#player2-name").val());
          console.log(`p2 name is ${p2Name}`); 
          p2Set(p2Name); 
        } else {
          p2Name="Guest";
          p2Set(p2Name);
        }
      });
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
  };

  function gamePlay() {
    console.log("gameplay exec");
  };

  function resetGame() {
    console.log("reset game exec");
  };

  function busyGame() {
    console.log("sorry this game is already full");
  };

});