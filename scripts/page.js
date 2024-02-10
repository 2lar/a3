/* ------------- Winter 2024 EECS 493 Assignment 3 Starter Code ------------ */

/* ------------------------ GLOBAL HELPER VARAIBLES ------------------------ */
// Difficulty Helpers
let astProjectileSpeed = 3;            // easy: 1, norm: 3, hard: 5

// Game Object Helpers
let currentAsteroid = 1;
const AST_OBJECT_REFRESH_RATE = 15;
const maxPersonPosX = 1218;
const maxPersonPosY = 658;
const PERSON_SPEED = 5;                // #pixels each time player moves by
const portalOccurrence = 15000;        // portal spawns every 15 seconds
const portalGone = 5000;               // portal disappears in 5 seconds
const shieldOccurrence = 10000;        // shield spawns every 10 seconds
const shieldGone = 5000;               // shield disappears in 5 seconds

// Movement Helpers
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;

// TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)
var EASY = false;
var NORMAL = true;
var HARD = false;

let spawnrate = 800;
let rocketspeed = 10;
let score = 0;
let currentShield = 1;

/* --------------------------------- MAIN ---------------------------------- */
$(document).ready(function () {
  // jQuery selectors
  game_window = $('.game-window');
  game_screen = $("#actual-game");
  asteroid_section = $('.asteroidSection');
  // hide all other pages initially except landing page
  game_screen.hide();

  /* -------------------- ASSIGNMENT 2 SELECTORS BEGIN -------------------- */
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
    // $('#tutorial').show();
    // document.getElementById('first').style.visibility = "hidden";
    document.getElementById('tutorial').style.visibility = "visible";
  }
  /* --------------------- ASSIGNMENT 2 SELECTORS END --------------------- */

  // TODO: DEFINE YOUR JQUERY SELECTORS (FOR ASSIGNMENT 3) HERE
  scoreboard = $("#scoreboard");
  readypage = $("#getready");
  rocket = $("#rocket");
  scoreval = $("#score-value");
  dangerval = $("#danger-value");
  levelval = $("#level-value");
  tutorial = $("#tutorial");
  shield = $(".shield");

  // Example: Spawn an asteroid that travels from one border to another
  // spawn(); // Uncomment me to test out the effect!
});


/* ---------------------------- EVENT HANDLERS ----------------------------- */
var movementInterval;
// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;

  if (!movementInterval) {
    movementInterval = setInterval(moveRocketShip, 30); // Adjust the interval as needed
  }
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
  if (!LEFT && !RIGHT && !UP && !DOWN) {
    clearInterval(movementInterval);
    movementInterval = null;
    $(rocket).attr("src", "./src/player/player.gif");
  }
}

/* ------------------ ASSIGNMENT 2 EVENT HANDLERS BEGIN ------------------ */
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

/* ------------------- ASSIGNMENT 2 EVENT HANDLERS END ------------------- */

// TODO: ADD MORE FUNCTIONS OR EVENT HANDLERS (FOR ASSIGNMENT 3) HERE

$("#tutstart").on("click", Ready);
function Ready(){
  // scoreboard.show();
  // getready.show();
  tutorial.hide();
  game_screen.show();
  // document.getElementById("actual-game").style.visibility = "visible";
  // document.getElementById("tutorial").style.visibility = "hidden"
  document.getElementById("scoreboard").style.visibility = "visible";
  document.getElementById("getready").style.visibility = "visible";
  play();
  setTimeout(function() {
    document.getElementById("getready").style.visibility = "hidden";
    readypage.hide();
    document.getElementById("actual-game").style.visibility = "visible";
    score_interval = setInterval(function () {
      score += 40;
      scoreval.html(score);
    }, 500);
  },3000);
  setTimeout(function () {
    setInterval(spawn, spawnrate);
    setInterval(spawnShield, 15000);
    setInterval(spawnPortal, 20000);
  }, 3000);
}

function moveRocketShip() {
  var newXPos = parseInt(rocket.css("left"));
  var newYPos = parseInt(rocket.css("top"));

  if (LEFT) {
    newXPos -= rocketspeed;
    // newXPos = max(0, newXPos);
    $(rocket).attr("src", "./src/player/player_left.gif");
  }
  if (RIGHT) {
    newXPos += rocketspeed;
    // newXPos = min(newXPos, maxPersonPosX);
    $(rocket).attr("src", "./src/player/player_right.gif");
  }
  if (UP) {
    newYPos -= rocketspeed;
    // newYPos = max(0, newYPos);
    $(rocket).attr("src", "./src/player/player_up.gif");
  }
  if (DOWN) {
    newYPos += rocketspeed;
    // newYPos = min(newYPos, maxPersonPosY);
    $(rocket).attr("src", "./src/player/player_down.gif");
  }

  newXPos = Math.max(0, Math.min(newXPos, maxPersonPosX));
  newYPos = Math.max(0, Math.min(newYPos, maxPersonPosY));

  // Update the rocket ship position
  rocket.css({
    "left": newXPos,
    "top": newYPos
  });

  // Check for collisions with asteroids
  $(".curAsteroid").each(function() {
    if (isColliding(rocket, $(this))) {
      console.log('Collision with asteroid');
      // Handle collision with asteroid here
    }
  });

  // Check for collisions with portals
  let portalExists = document.getElementById('currentPortal');
  if (portalExists !== null && isColliding(rocket, $('#currentPortal'))) {
    console.log('Collision with portal');
    // Handle collision with portal here
  }

 // Check for collisions with Shield
 let shieldExists = document.getElementById('currentShield');
 if (shieldExists !== null && isColliding(rocket, $('#currentShield'))) {
   console.log('Collision with shield');
   // Handle collision with shield here
 }
  // // Check for collisions with shield and portal elements
  // let shieldExists = document.getElementById('shieldimg');
  // let portalExists = document.getElementById('portalimg');
  
  // if (shieldExists !== null && isColliding(rocketship, $('#shieldimg'))) {
  //   console.log('Shield');
  //   removeElement(document.getElementById('shieldimg'));
  //   shielded = true;
  //   Play_Collect();
  // }
  
  // if (portalExists !== null && isColliding(rocketship, $('#portalimg'))) {
  //   console.log('Portal');
  //   removeElement(document.getElementById('portalimg'));
  //   level_num++;
  //   danger_num += 2;
  //   astProjectileSpeed *= 1.2;
  //   $('#danger_num2').html(danger_num);
  //   $('#level_num2').html(level_num);
  //   Play_Collect();
  // }
}

// function spawnShield() {
//   let x = getRandomNumber(0, maxPersonPosX);
//   let y = getRandomNumber(0, maxPersonPosY);
//   console.log(x, y);

//   let objectString = "<div id = 's-" + currentShield + "' class = 'curShield' > <img src = './src/shield.gif'/></div>";
//   shield.append(objectString);
//   // Save the shield element in a variable
//   let currentShieldElement = $('#s-' + currentShield);
//   setTimeout(function () {
//     currentShieldElement.remove();
//   }, 5000);
//   this.id = $('#s-' + currentShield);
//   currentShield++; // ensure each Shield has its own id

//   // show this Shield's initial position on screen
//   this.id.css("top", y);
//   this.id.css("left", x);
// }
function spawnShield() {
  let x = getRandomNumber(0, maxPersonPosX);
  let y = getRandomNumber(0, maxPersonPosY);

  let shield = document.createElement('img');
  shield.id = "currentShield";
  shield.src = "src/shield.gif";
  shield.style.height = "62px";
  shield.style.width = "62px";
  shield.style.position = "absolute";
  shield.style.left = x;
  shield.style.top = y;

  document.getElementById('actual-game').appendChild(shield);
  // setTimeout('removeElement(document.getElementById("currentShield"))', 5000);
  setTimeout(function () {
    shield.remove();
  }, 5000);
}

function spawnPortal() {
  let x = getRandomNumber(0, maxPersonPosX);
  let y = getRandomNumber(0, maxPersonPosY);

  let portal = document.createElement('img');
  portal.id = "currentPortal";
  portal.src = "src/port.gif";
  portal.style.height = "62px";
  portal.style.width = "62px";
  portal.style.position = "absolute";
  portal.style.left = x;
  portal.style.top = y;

  document.getElementById('actual-game').appendChild(portal);
  // setTimeout('removeElement(document.getElementById("currentPortal"))', 5000);
  setTimeout(function () {
    portal.remove();
  }, 5000);
}

// function spawnPortal() {
//   let x = getRandomNumber(0, maxPersonPosX);
//   let y = getRandomNumber(0, maxPersonPosY);
//   console.log(x, y);

//   let objectString = "<div id = 's-" + currentPortal + "' class = 'curPortal' > <img src = './src/portal.gif'/></div>";
//   shield.append(objectString);
//   // Save the shield element in a variable
//   let currentPortalElement = $('#s-' + currentPortal);
//   setTimeout(function () {
//     currentPortalElement.remove();
//   }, 5000);
//   this.id = $('#s-' + currentPortal);
//   currentPortal++; // ensure each Shield has its own id

//   // show this Shield's initial position on screen
//   this.id.css("top", y);
//   this.id.css("left", x);
// }

function play(){
  game_screen.show();
  scoreboard.show();
  // rocket.hide();
  readypage.show();
  if (EASY){
    console.log("easy");
    dangerval.html(10);
    astProjectileSpeed = 1;
    spawnrate = 1000;

  } else if (NORMAL){
    console.log("jprm,");
    dangerval.html(20);
    astProjectileSpeed = 3;
    spawnrate = 800;
  } else {
    console.log("jard");
    dangerval.html(30);
    astProjectileSpeed = 5;
    spawnrate = 600;
  }
  
}

/* ---------------------------- GAME FUNCTIONS ----------------------------- */
// Starter Code for randomly generating and moving an asteroid on screen
class Asteroid {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAsteroid' > <img src = 'src/asteroid.png'/></div>";
    asteroid_section.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update Asteroid position on screen
    asteroid.updatePosition();
    // determine whether Asteroid has reached its end position
    if (asteroid.hasReachedEnd()) { // i.e. outside the game boarder
      asteroid.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

/* --------------------- Additional Utility Functions  --------------------- */
// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
