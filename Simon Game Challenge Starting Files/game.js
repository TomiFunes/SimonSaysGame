var gamePattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var contador = 1;

$(document).one("keypress", nextSequence);

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  soundandAnimation(randomChosenColor);

  $("h1").html("Level " + contador);
  contador++;
}

function soundandAnimation(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  $("#" + randomChosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $("h1").html("Wrong !, press any key to restart");
    $("body").addClass("game-over");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  contador = 1;
  gamePattern = [];
  userClickedPattern = [];
  $(document).one("keypress", nextSequence);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  soundandAnimation(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
