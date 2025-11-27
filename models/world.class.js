class World {
  character = new Character();
  hpBar = new hpBar();
  coinBar = new coinBar();
  bottleBar = new bottleBar();
  throwableObjects = [];
  collectableObjects = [];

  state = "title";

  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  startGame() {
    this.state = "playing";
    initLevel1();
    this.level = level1;
    this.run();
  }

  exitGame() {
    this.state = "title";
    
    clearInterval(this.gameInterval);
    this.gameInterval = null;

    this.level = null;
    this.throwableObjects = [];
    this.collectableObjects = [];

    this.character = new Character();
    this.setWorld();
    
    this.camera_x = 0;

    this.hpBar.setPercentage(100);
    this.coinBar.setPercentage(0);
    this.bottleBar.setPercentage(0);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.gameInterval = setInterval(() => {
      this.checkCollissions();
      this.checkThrowableObjects();
    }, 100);
  }

  checkCollissions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.isDamaged();
        this.hpBar.setPercentage(this.character.energy);
      }
    });
  }

  checkThrowableObjects() {
    if (this.keyboard.THROW) {
      let bottle = new throwableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === "title") {
      this.drawTitleScreen();
      requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.bgObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // --- SPACE FOR FIXED OBJECTS ---
    this.addBars();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawTitleScreen() {
    titleScreen.draw(this.ctx);
  }

  addBars() {
    this.addToMap(this.hpBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
  }

  addToMap(mO) {
    if (mO.inverted) {
      this.flipImage(mO);
    }
    mO.draw(this.ctx);

    mO.drawBorder(this.ctx);

    if (mO.inverted) {
      this.flipImageBack(mO);
    }
  }

  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
}