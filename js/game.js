let canvas;
let world;
let keyboard = new Keyboard();
let music = document.getElementById("music");
let over = document.getElementById("game_over");
let win = document.getElementById("you_win");
let bossHit = document.getElementById("boss_idle");

const muteBtn = document.getElementById("muteSound");
const unmuteBtn = document.getElementById("enableSound");

const allAudio = document.querySelectorAll("audio");

bossHit.volume = 0.1;
music.volume = 0.1;
over.volume = 0.3;
win.volume = 0.8;
over.loop = false;
win.loop = false;

/**
 * Initializes the game by setting up the canvas, world, and UI settings.
 * This function is called when the page loads.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  startSettings();
  exitSettings();
  restartSettings();
}

/**
 * Adds a click listener to the start button.
 * Starts the game, plays background music, and updates UI visibility.
 */
function startSettings() {
  document.getElementById("startGame").addEventListener("click", () => {
    world = new World(canvas, keyboard);
    world.startGame();
    music.currentTime = 0;
    music.play();
    document.getElementById("startGame").style.display = "none";
    document.getElementById("exitGame").style.display = "flex";
    document.getElementById("legal").style.display = "none";
  });
}

/**
 * Adds a click listener to the restart button.
 * Restarts the game, plays background music, and updates UI visibility.
 */
function restartSettings() {
  document.getElementById("restartGame").addEventListener("click", () => {
    document.getElementById("restartGame").style.display = "none";

    over.pause();
    win.pause();
    over.currentTime = 0;
    win.currentTime = 0;

    music.currentTime = 0;
    music.play();
    world.restartGame();
  });
}

/**
 * Adds a click listener to the exit button.
 * Stops the game, pauses background music, and restores the menu UI.
 */
function exitSettings() {
  document.getElementById("exitGame").addEventListener("click", () => {
    world.exitGame();
    music.pause();
    document.getElementById("startGame").style.display = "flex";
    document.getElementById("exitGame").style.display = "none";
    document.getElementById("legal").style.display = "flex";
    document.getElementById("restartGame").style.display = "none";
  });
}

/**
 * Draws the title screen using the titleScreen object.
 */
function drawTitleScreen(ctx, titleScreen) {
  titleScreen.draw(ctx);
}

/**
 * Draws the win screen on the canvas.
 */
function drawWinScreen(ctx, canvas, winImg) {
  if (!winImg.complete) return;
  ctx.drawImage(winImg, 0, 0, canvas.width, canvas.height);
  showRestartButton();
}

/**
 * Draws the loose screen on the canvas.
 */
function drawLooseScreen(ctx, canvas, looseImg) {
  if (!looseImg.complete) return;
  ctx.drawImage(looseImg, 0, 0, canvas.width, canvas.height);
  showRestartButton();
}

/**
 * Draws the level transition screen.
 * Displays the level number centered on a black background.
 */
function drawLevelTransition(ctx, canvas, level, level1, level2) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f5b05b";
  ctx.font = "80px rye";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let levelText = "LEVEL ";
  if (level === level1) levelText += "2";
  else if (level === level2) levelText += "3";

  ctx.fillText(levelText, canvas.width / 2, canvas.height / 2);
}

/**
 * shows restart button in the win and lose screen
 */
function showRestartButton() {
  const btn = document.getElementById("restartGame");
  if (btn.style.display !== "flex") {
    btn.style.display = "flex";
  }
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Sets the global mute state for all audio elements.
 * Updates button visibility and persists the state in localStorage.
 *
 * @param {boolean} isMuted - Whether all audio should be muted.
 */
function setMuteState(isMuted) {
  allAudio.forEach((a) => (a.muted = isMuted));

  if (isMuted) {
    muteBtn.style.display = "none";
    unmuteBtn.style.display = "flex";
  } else {
    muteBtn.style.display = "flex";
    unmuteBtn.style.display = "none";
  }

  localStorage.setItem("audioMuted", isMuted);
}

/**
 * Mutes all audio when the mute button is clicked.
 */
muteBtn.addEventListener("click", () => {
  setMuteState(true);
});

/**
 * Unmutes all audio when the unmute button is clicked.
 */
unmuteBtn.addEventListener("click", () => {
  setMuteState(false);
});

/**
 * Restores the saved audio mute state from localStorage
 * when the page is loaded or refreshed.
 */
document.addEventListener("DOMContentLoaded", () => {
  const storedMuteState = localStorage.getItem("audioMuted");
  const isMuted = storedMuteState === "true";
  setMuteState(isMuted);
});

/**
 * Handles keyboard input when a key is pressed.
 * Sets movement and action flags on the keyboard object.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 68) {
    keyboard.THROW = true;
  }
});

/**
 * Handles keyboard input when a key is released.
 * Resets movement and action flags on the keyboard object.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 68) {
    keyboard.THROW = false;
  }
});