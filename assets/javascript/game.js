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

  var player1Choice = "Rock";
  var player2Choice = "Paper"; 
  var player1Score = 0; 
  var player2Score = 0; 
  var roundNumber = 0;

  database.ref().set({
    p1Choice: player1Choice,
    p2Choice: player2Choice,
    p1Score: player1Score,
    p2Score: player2Score,
    round: roundNumber,
  });
  

  
});