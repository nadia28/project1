
var game = {
  player1: {
    name: "p1", score: 0
  },
  player2: {
    name: "p2", score: 0
  }
}
var currentPlayer = game.player1

var currentScore = 0;
$('#score-board').text(currentPlayer.score);

var timeLimit = 10;
 $('#clock').text(timeLimit);// sets the timer in the beginning of the game

var score = 0;
var scoreBoard = document.getElementById('score-board');
var myArray = ['cheese', 'cheese', 'cheese', 'cheese', 'cheese','cheese','cheese',   'cheese', 'cheese', 'cheese', 'cheese', 'cheese', 'cheese', 'clock', 'clock', 'cheese', 'tomjerry', 'tomjerry','tomjerry','tomjerry',
'tomjerry', 'tomjerry', 'tomjerry', 'tomjerry', 'tomjerry', 'tomjerry', 'tom', 'tom', 'tom', 'tom', 'tom', 'tom'];

var $myInterval;

$('#audio').attr('src', 'audio/start.mp3');


function initializeGame() {// initializes the game
  // prompt("What is your name?");
  $('#clock').text(timeLimit);
  $('#score-board').text(currentScore);
  shuffle(myArray)
  $('.Board').empty()

  for(var i = 0; i < myArray.length; i += 1) {// loop to append divs with classes and images
    $('.Board').append('<div class="mySquare ' + myArray[i] + '"><img src="./images/' + myArray[i] + '.png"></div>')
  }

  $('.mySquare img').hide(); //hide all pictures of the board

  $('#Button').one('click', function() {

    $('#audio')[0].play();
    $('.mySquare img').fadeIn(3000).delay(2000).fadeOut(2000);
    setTimeout(function() {
      startTimerFunction()
    }, 7000)
  })


  function startTimerFunction () {
    $myInterval = setInterval(moveTime, 1000);
  }

  $('.mySquare').one('click', handleImageClick)// to click every box on board only once
}

function moveTime() { // start timer counting down
  var $timeChange = $('#clock');
  $timeChange.text($timeChange.text()-1);
  console.log($timeChange.text(), '--', $timeChange.text() === "0")
  if ($timeChange.text() === "0") {
    console.log($myInterval)
     clearInterval($myInterval)
     gameOver();
  }
}

 function handleImageClick(evt) {
    console.log("somebody clicked");

   $(this).children().show();// flip picture when clicked

  if($(this).hasClass('cheese')) {

    updateMessageBox("YaYYY, You Score 1 Point!"); //console.logs YaYY in a message-box, for "cheese"
     score = score + 1;
     currentPlayer.score = currentPlayer.score + 1;
     scoreBoard.innerText = 'Score: ' + currentPlayer.score; //add 1 score when finds cheese
  }  else if ($(this).hasClass('tomjerry')) {
      updateMessageBox("Great job, keep looking!");//message-box for "castle"

  }  else if ($(this).hasClass('clock')) {
      updateMessageBox("Cool, you have extra time!");//message-box for "clock"
        $('#clock').text(parseInt($('#clock').text()) + 2);

   } else if ($(this).hasClass('tom')) {
      console.log("Sorry, no more cheese for you!")//show score
      clearInterval($myInterval);
      gameOver();
      // game.switchPlayer();
    } //the game is over when hit Tom, alert pops up with the player's score
    //
  }

 function updateMessageBox(text) { //message-box for printing the messages for player when hit on a particular image
   $('#message-box').text(text);
}

 function gameOver() {
   alert("Sorry, no more cheese for you! The GAME is OVER!" + currentPlayer.score);
   $('.mySquare').off('click', handleImageClick);
   $('#audio')[0].pause()
   $('#audio')[0].currentTime = 0

  //  $('#audio').attr('src', 'audio/start.mp3');
  //  $('#audio')[0].load();
   game.switchPlayer();


}



 function shuffle(array) {
   var m = array.length, t, i;

   // While there remain elements to shuffle…
   while (m) {

     // Pick a remaining element…
     i = Math.floor(Math.random() * m--);

     // And swap it with the current element.
     t = array[m];
     array[m] = array[i];
     array[i] = t;
   }

   return array;
 }//shuffle array, sets pictures randomly on the board


  initializeGame();



  game.switchPlayer = function() {
    clearInterval($myInterval)
      initializeGame();
        if(currentPlayer == game.player2) {
          currentPlayer = game.player1
        } else {
          currentPlayer = game.player2
        }
      }


 function checkWinner() {
   if (game.player1.score > game.player2.score) {
     alert("Player1 Wins");
   } else if (game.player1.score < game.player2.score) {
     alert("Player2 Wins");
   } else {
     alert("Yayyyy, it's a tie!")
   }
 }


 $('#Winner').on('click', function() {
   checkWinner();
 })
