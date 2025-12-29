class World {
  character = new Character();
  hpBar = new hpBar();
  coinBar = new coinBar();
  bottleBar = new bottleBar();
  bossBar = new bossBar();
  throwableObjects = [];
  collectableObjects = [];

  state = "title";
  level = null;
  throwCooldown = false;

  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  /**
   * Creates a new World instance.
   * Sets up the canvas context, keyboard, and initializes the world.
   * @param {HTMLCanvasElement} canvas - Canvas element to draw on.
   * @param {Keyboard} keyboard - Keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.winImg = new Image();
    this.winImg.src = "img/You won, you lost/You Win A.png";

    this.looseImg = new Image();
    this.looseImg.src = "img/You won, you lost/Game over A.png";

    this.setWorld();
    this.draw();
  }

  /**
   * Starts the game.
   * Initializes the first level, positions the character,
   * sets up the boss bar if a boss exists, and starts the game loop.
   */
  startGame() {
    this.state = "playing";
    initLevel1();
    this.level = level1;
    this.character.x = 100;
    this.character.y = 180;

    if (this.level.boss) {
      this.bossBar = new bossBar(this.level.boss);
    } else {
      this.bossBar = null;
    }

    this.run();
  }

  /**
   * Restarts the game.
   * Initializes the first level, positions the character,
   * sets up the boss bar if a boss exists, and starts the game loop.
   */
  restartGame() {
    this.clearAllIntervals();
    this.character.stopSleepSound();

    this.gameOverPlayed = false;
    this.winPlayed = false;

    this.state = "resetting";

    clearInterval(this.gameInterval);
    this.gameInterval = null;

    this.restartRequest();
  }

  /**
   * Requests an AnimationFrame and sets properties for the game
   */
  restartRequest() {
    requestAnimationFrame(() => {
      this.state = "playing";

      this.restartRequestSettings();
      initLevel1();
      this.level = level1;

      this.character.x = 100;
      this.character.y = 180;

      if (this.level.boss) {
        this.bossBar = new bossBar(this.level.boss);
      } else {
        this.bossBar = null;
      }

      this.run();
    });
  }

  /**
   * Sets the properties for the game to start.
   */
  restartRequestSettings() {
    this.throwableObjects = [];
    this.collectableObjects = [];
    this.camera_x = 0;

    this.coinCount = 0;
    this.bottleCount = 0;

    this.hpBar.setPercentage(100);
    this.coinBar.setPercentage(0);
    this.bottleBar.setPercentage(0);

    this.character = new Character();
    this.setWorld();
  }

  /**
   * Exits the current game.
   * Stops the game loop, clears objects, resets character and UI bars.
   */
  exitGame() {
    this.clearAllIntervals();
    this.character.stopSleepSound();
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

  /**
   * Binds the character to the world
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop.
   * Checks collisions, collectables, throwable objects, and level end periodically.
   */
  run() {
    if (this.gameInterval) return;

    this.gameInterval = setInterval(() => {
      if (this.state !== "playing") return;

      this.checkCollissions();
      this.checkBottleCollisions();
      this.checkCoins();
      this.checkBottles();
      this.checkThrowableObjects();
      this.checkLevelEnd();
    }, 1000 / 60);
  }

  /**
   * Calculates a safe horizontal spawn position for a new enemy.
   * Generates a random x-coordinate within a specified range and ensures
   * it is at least a minimum distance away from all existing enemies.
   * The function keeps retrying until a valid, safe position is found.
   * @param {Array<{ x: number }>} existingEnemies - A list of existing enemies, each containing an `x` position.
   * @param {number} [startX=600] - The starting x-coordinate from which the spawn range begins.
   * @param {number} [range=6600] - The width of the range within which the enemy can spawn.
   * @param {number} [minDistance=300] - The minimum allowed horizontal distance from any existing enemy.
   * @returns {number} - A valid x-coordinate that is safely spaced from all existing enemies.
   */
  getSpawnX(existingEnemies, startX = 600, range = 6600, minDistance = 300) {
    let x;
    let safe = false;

    while (!safe) {
      x = startX + Math.random() * range;
      safe = true;

      for (let enemy of existingEnemies) {
        if (Math.abs(enemy.x - x) < minDistance) {
          safe = false;
          break;
        }
      }
    }

    return x;
  }

  /**
   * Checks collisions between the player and enemies.
   */
  checkCollissions() {
    CollisionHandler.checkCollisions(this);
  }

  /**
   * Checks and handles all bottle collisions with ground, enemies, and boss.
   * Removes bottles that should be destroyed and filters out dead enemies.
   */
  checkBottleCollisions() {
    CollisionHandler.checkBottleCollisions(this);
  }

  /**
   * Checks if the character collects any coins.
   * Removes collected coins and updates coin bar based on total coins collected.
   */
  checkCoins() {
    CollectableHandler.checkCoins(this);
  }

  /**
   * Checks if the character collects any salsa bottles.
   * Removes collected bottles and updates the bottle bar.
   */
  checkBottles() {
    CollectableHandler.checkBottles(this);
  }

  /**
   * Checks if the player throws a bottle.
   * Creates a new throwable object if the player presses the THROW key
   * and has bottles available.
   * Updates the bottle bar percentage accordingly.
   */
  checkThrowableObjects() {
    if (this.keyboard.THROW && this.bottleCount > 0 && !this.throwCooldown) {
      this.throwCooldown = true;

      let bottle = new throwableObject(
        this.character.x + 100,
        this.character.y + 100
      );

      this.throwableObjects.push(bottle);
      this.bottleCount--;

      let percentage = (this.bottleCount / 5) * 100;
      this.bottleBar.setPercentage(percentage);
    }

    if (!this.keyboard.THROW) {
      this.throwCooldown = false;
    }
  }

  /**
   * Checks if the character has reached the end of the level.
   * If so, starts a level transition to the next level.
   */
  checkLevelEnd() {
    if (this.level.level_end_x && this.character.x >= this.level.level_end_x) {
      if (this.level === level3) {
        return;
      }

      this.state = "level_transition";
      this.startLevelTransition();
    }
  }

  /**
   * Handles transitioning between levels.
   * Stops the game loop, waits 3 seconds, then initializes the next level
   * and resets the character position and camera.
   */
  startLevelTransition() {
    clearInterval(this.gameInterval);
    this.gameInterval = null;
    this.state = "level_transition";
    setTimeout(() => {
      if (this.level === level1) {
        initLevel2();
        this.level = level2;
      } else if (this.level === level2) {
        initLevel3();
        this.level = level3;
      }
      this.character.x = 100;
      this.character.y = 180;
      this.camera_x = 0;
      this.state = "playing";

      if (this.level.boss) {
        this.bossBar = new bossBar(this.level.boss);
      } else {
        this.bossBar = null;
      }
      this.run();
    }, 3000);
  }

  setLevelTimeout() {}

  /**
   * Adds all objects in the current level to the canvas for rendering.
   * Includes background objects, clouds, throwable objects,
   * collectables, enemies, boss bar (if present), and the player character.
   */
  addAllObjects() {
    this.addObjectsToMap(this.level.bgObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    if (this.level.boss && this.bossBar) {
      this.addToMap(this.bossBar);
    }
  }

  /**
   * Main drawing loop for the world.
   * Clears the canvas, handles screens (title, win, lose, level transitions),
   * renders all objects, and updates UI bars.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.handleScreens()) {
      if (this.level) {
        this.ctx.translate(this.camera_x, 0);
        this.addAllObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addBars();
      }
    }

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws the level transition screen.
   * Displays the level number centered on a black background.
   */
  drawLevelTransition() {
    drawLevelTransition(this.ctx, this.canvas, this.level, level1, level2);
  }

  /**
   * Draws the title screen using the titleScreen object.
   */
  drawTitleScreen() {
    drawTitleScreen(this.ctx, titleScreen);
  }

  /**
   * Draws the win screen on the canvas.
   */
  drawWinScreen() {
    drawWinScreen(this.ctx, this.canvas, this.winImg);
    this.character.stopSleepSound();
  }

  /**
   * Draws the loose screen on the canvas.
   */
  drawLooseScreen() {
    drawLooseScreen(this.ctx, this.canvas, this.looseImg);
    this.character.stopSleepSound();
  }

  /**
   * Shows restart button in the win and lose screen.
   */
  showRestartButton() {
    showRestartButton();
  }

  /**
   * Clears all intervals.
   */
  clearAllIntervals() {
    clearAllIntervals();
  }

  /**
   * Handles special screens like title, level transitions, win, and lose.
   * Draws the appropriate screen and returns true if a special screen was displayed.
   * @returns {boolean} True if a special screen was handled, otherwise false.
   */
  handleScreens() {
    switch (this.state) {
      case "title":
        this.drawTitleScreen();
        return true;
      case "level_transition":
        this.drawLevelTransition();
        return true;
      case "lost":
        this.drawLooseScreen();
        return true;
      case "won":
        this.drawWinScreen();
        return true;
      default:
        return false;
    }
  }

  /**
   * Adds all UI bars (health, coin, bottle) to the canvas.
   */
  addBars() {
    this.addToMap(this.hpBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

  /**
   * Adds a single object to the canvas.
   * Handles flipping of images if the object is inverted,
   * draws the object and its border, and restores context.
   * @param {Object} mO - The movable object to add.
   */
  addToMap(mO) {
    if (mO.inverted) this.flipImage(mO);
    if (typeof mO.updateHitbox === "function") {
      mO.updateHitbox();
    }
    mO.draw(this.ctx);

    if (typeof mO.drawHitbox === "function") {
      mO.drawHitbox(this.ctx);
    }
    if (typeof mO.drawFootHitbox === "function") {
      mO.drawFootHitbox(this.ctx);
    }
    if (typeof mO.drawHeadHitbox === "function") {
      mO.drawHeadHitbox(this.ctx);
    }

    if (mO.inverted) this.flipImageBack(mO);
  }

  /**
   * Flips an object's image horizontally for inverted rendering.
   * @param {Object} mO - The object to flip.
   */
  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  /**
   * Restores an object's image after horizontal flipping.
   * @param {Object} mO - The object to restore.
   */
  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }

  /**
   * Adds multiple objects to the canvas.
   * @param {Array} objects - Array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }
}
