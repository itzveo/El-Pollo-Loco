let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  startSettings();
  exitSettings();
}

function startSettings() {
  document.getElementById("startGame").addEventListener("click", () => {
    world.startGame();
    document.getElementById("startGame").style.display = "none";
    document.getElementById("exitGame").style.display = "flex";
    document.getElementById("legal").style.display = "none";
  });
}

function exitSettings() {
  document.getElementById("exitGame").addEventListener("click", () => {
    world.exitGame();
    document.getElementById("startGame").style.display = "flex";
    document.getElementById("exitGame").style.display = "none";
    document.getElementById("legal").style.display = "flex";
  });
}

const muteBtn = document.getElementById("muteSound");
const unmuteBtn = document.getElementById("enableSound");

const allAudio = document.querySelectorAll("audio");

muteBtn.addEventListener("click", () => {
    allAudio.forEach(a => a.muted = true);
    muteBtn.style.display = "none";
    unmuteBtn.style.display = "flex";
});

unmuteBtn.addEventListener("click", () => {
    allAudio.forEach(a => a.muted = false);
    muteBtn.style.display = "flex";
    unmuteBtn.style.display = "none";
});

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
