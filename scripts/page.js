// ============== Winter 2024 EECS 493 Assignment 2 Starter Code ==============

// Main
$(document).ready(function () {
  // ====== Startup ======
  // TODO: DEFINE YOUR JQUERY SELECTORS HERE
  game_window = $('.game-window');
  game_screen = $("#actual_game");
  onScreenAsteroid = $(".asteroidSection");

});

// TODO: ADD YOUR EVENT HANDLERS HERE
$("#Setting").on("click", OpenSettings);
function OpenSettings() {
  console.log("here");
  document.getElementById('settings').style.visibility = "visible";

  var slider = document.getElementById("volrange");
  var output = document.getElementById("volumeValue");
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
    vol = this.value;
  }
}

$("#close").on("click", closeSettings);
function closeSettings() {
  document.getElementById('settings').style.visibility = "hidden";
}

$(".diff").on("click", function() {
  // Handle difficulty selection here
  var difficulty = $(this).attr('id');
  setDifficulty(difficulty);
});
function setDifficulty(difficulty) {
  console.log("Selected difficulty: " + difficulty);
}

$("#easy").click(SelectEasy);
function SelectEasy() {
  document.getElementById('easy').style.border = "2px solid yellow";
  document.getElementById('norm').style.border = "2px solid darkgray";
  document.getElementById('hard').style.border = "2px solid darkgray";
  EASY = true;
  NORMAL = false;
  HARD = false;
}

$("#norm").click(SelectNorm);
function SelectNorm() {
  document.getElementById('easy').style.border = "2px solid darkgray";
  document.getElementById('norm').style.border = "2px solid yellow";
  document.getElementById('hard').style.border = "2px solid darkgray";
  EASY = false;
  NORMAL = true;
  HARD = false;
}

$("#hard").click(SelectHard);
function SelectHard() {
  document.getElementById('easy').style.border = "2px solid darkgray";
  document.getElementById('norm').style.border = "2px solid darkgray";
  document.getElementById('hard').style.border = "2px solid yellow";
  EASY = false;
  NORMAL = false;
  HARD = true;
}

$("#Play").on("click", openTutorial);
function openTutorial() {
  $("#first").hide();
  document.getElementById('tutorial').style.visibility = "visible";
}