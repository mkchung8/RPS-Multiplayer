// Tracks changes in key which contains player objects.
playersRef.on("value",
// successful callback function
function (snapshot) {
  currentPlayers = snapshot.numChildren();
  // Checking to see if players exist. 
  let playerOneExists = snapshot.child("player1").val();
  let playerTwoExists = snapshot.child("player2").val();

  // Player Data Objects
  
  if (!playerOneExists) {
    console.log('p1 does not exist');
  } else if (playerOneExists) {
    console.log(`player 1 exists`);
    $("#p1-start-button").remove();
    $("#p1-score").html(`<p2 style="color:green;"> P1 READY </p2>`);
  };

  if (!playerTwoExists) {
    console.log('player 2 does not exist');
  } else {
    console.log('player two does exist');
    $("#p2-start-button").remove();
    $("#p2-score").html(`<p2 style="color:green;"> P2 READY </p2>`);
  };

  if (playerTwoExists && playerTwoExists) {
    console.log('both players exist' + currentPlayers);
    $("#sub-title").text("Ready for Battle!!!"); 
    currentTurnRef.set(1); 
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

currentTurnRef.on("value", function(snapshot){
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