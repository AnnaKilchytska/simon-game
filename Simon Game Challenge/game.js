let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;



$(document).keypress(function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];


    }
  } else {
      console.log("wrong");

      startOver();

      let audio = new Audio('sounds/wrong.mp3');
      audio.play();

      $('body').addClass("game-over");

      setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text("Game Over, Press Any Key to Restart");


  }
}

function animatePress(currentColour) {
  // currentColour = userClickedPattern[userClickedPattern.length - 1];
  $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
      $('#' + currentColour).removeClass('pressed');
  }, 100);
}


function playSound(name) {
  // name = userClickedPattern[userClickedPattern.length - 1];
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}



function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  setTimeout(function() {

    let chosenButton = $("#" + randomChosenColor);
    chosenButton.delay(100).fadeIn(50).fadeOut(100).fadeIn(50);

    playSound(randomChosenColor);
  }, 1000);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  $("#level-title").text("Press A Key To Restart");
  userClickedPattern = [];
}
