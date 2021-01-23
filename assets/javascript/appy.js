$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyBypcBm8MJ4Rxq6bnFt_bv5nDc5HczywOQ",
    authDomain: "rps-multiplayer-game-3918b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-game-3918b.firebaseio.com",
    projectId: "rps-multiplayer-game-3918b",
    storageBucket: "rps-multiplayer-game-3918b.appspot.com",
    messagingSenderId: "551952519975",
    appId: "1:551952519975:web:a9aa83262ff84010dccf02"
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  //Declaring Global Variables 
  var database = firebase.database();
  var chatData = database.ref("/chat");
  var playersRef = database.ref("/players");
  var turnCheck = database.ref("turn");
  var username = "Guest";
  var currentPlayers = null;
  var currentTurn = null;
  var playerNum = false;
  var p1Selected = false;
  var p2Selected = false;
  var p1Data = null;
  var p2Data = null;

  $("#player1-entry").on("click", function () {
    event.preventDefault();
    if ($("#player1-name").val() !== "") {
      username = capitalize($("#player1-name").val());
      playersRef.child("player1").set({
        name: username,
        wins: 0,
        losses: 0,
        choice: null,
        turnLock: true
      });
    };
  });

  playersRef.on("value", function (snapshot) {
    p1Selected = snapshot.child("player1").exists();
    p2Selected = snapshot.child("player2").exists();

    p1Data = snapshot.child("player1").val();
    p2Data = snapshot.child("player2").val();

    $(".lead").text("Welcome to the Battledome. Enter your name to Begin.")

    if (p1Selected) {
      let p1Name = capitalize(p1Data.name);
      $(".lead").text("Waiting for Player 2...");
      $("#player1-div").html(`<p class="mt-1">PLAYER 1</p></br><h3 class="p-0"><b>${p1Name}</b></h3>`);
    }

    if (p2Selected) {
      let p2Name = capitalize(p2Data.name);
      $(".lead").text("Waiting for Player 1...");
      $("#player2-div").html(`<p class="mt-1">PLAYER 2</p></br><h3 class="p-0"><b>${p2Name}</b></h3>`);
    }

    if (p1Selected && p2Selected) {
      $(".player-form").remove();
      $(".lead").text("Both Players Ready! PREPARE FOR BATTLE!");
      playersRef.child("player1").child("turnLock").set(false);
      gamePlay();
    };

  });

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  function gamePlay() {

    $(".lead").empty();

    if (p1Data.turnLock === false && p2Data.turnLock === true) {
      console.log(`p1 turn`);
      p1Turn();
    };

    if (p1Data.turnLock === true && p2Data.turnLock === false) {
      console.log(`p2 turn`);
      p2Turn();
    };

    if (p1Data.turnLock === true && p2Data.turnLock === true) {
      logicSort(p1Data.choice, p2Data.choice);
      console.log(`logic sort`);
    };
  };

  function p1Turn() {
    $("#player1-div").append('<ul id="p1-choices"><li>Rocko</li><li>Paper</li><li>Scissors</li></ul>');
    $("#player1-div").css("border", "3px solid green");
    $("#player2-div").css("border", "3px solid red");
    $("#player2-div").html(`<h3>Waiting for Player 1 to finish their turn...</h3>`);

    $("ul").on("click", "li", function () {
      console.log($(this).text())
      let choice = $(this).text();
      playersRef.child("player1").child("choice").set(choice);
      playersRef.child("player1").child("turnLock").set(true);
    });
  };

  function p2Turn() {
    $("#player2-div").append('<ul id="p2-choices"><li>Rock</li><li>Paper</li><li>Scissors</li></ul>');
    $("#player2-div").css("border", "3px solid green");
    $("#player1-div").css("border", "3px solid red");
    $("#player1-div").html(`<h3>Waiting for Player 2 to finish their turn...</h3>`);
  };

  function logicSort() {
    $("#player1-div").css("border", "3px solid blue");
    $("#player2-div").css("border", "3px solid blue");

    // reveal both players choice
    // compare answers 
    // tally scores 
    // 
  };



});