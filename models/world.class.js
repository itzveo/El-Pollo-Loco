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

  gameOverPlayed = false;
  winPlayed = false;

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
    this.gameOverPlayed = false;
    this.winPlayed = false;
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
   * Exits the current game.
   * Stops the game loop, clears objects, resets character and UI bars.
   */
  exitGame() {
    this.state = "title";
    this.gameOverPlayed = false;
    this.winPlayed = false;

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
    this.gameInterval = setInterval(() => {
      if (this.state !== "playing") return;

      this.checkCollissions();
      this.checkBottleCollisions();
      this.checkCoins();
      this.checkBottles();
      this.checkThrowableObjects();
      this.checkLevelEnd();
    }, 100);
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
   * If a collision occurs, the player takes damage and the health bar is updated.
   * If energy reaches 0, sets state to "lost".
   */
  checkCollissions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.dead) {
        this.character.isDamaged();
        document.getElementById("player_hurt").play();
        this.hpBar.setPercentage(this.character.energy);

        if (this.character.energy === 0) {
          setTimeout(() => {
            this.state = "lost";
            if (!this.gameOverPlayed) {
              music.pause();
              over.currentTime = 0;
              over.play();
              this.gameOverPlayed = true;
            }
          }, 2000);
        }
      }
    });
  }

  /**
   * Checks collisions for throwable bottles.
   * Handles breaking bottles, hitting enemies or boss,
   * updating boss health bar, and marking bottles for removal.
   */
  checkBottleCollisions() {
    this.throwableObjects = this.throwableObjects.filter((bottle) => {
      if (!bottle.IsAboveGround() && !bottle.isBreaking) {
        bottle.break();
        document.getElementById("bottle_breaking").play();
        return true;
      }

      if (bottle.isBreaking) {
        document.getElementById("bottle_breaking").play();
        return !bottle.remove;
      }

      let hitEnemy = false;

      this.level.enemies.forEach((enemy) => {
        if (!(enemy instanceof Chicken) && !(enemy instanceof Baby)) return;

        if (!enemy.dead && bottle.isColliding(enemy)) {
          if (enemy.die) enemy.die();
          bottle.break();
          document.getElementById("bottle_breaking").play();
          hitEnemy = true;
        }
      });

      let boss = this.level.boss;
      if (boss && !boss.dead && bottle.isColliding(boss)) {
        boss.hit();
        this.bossBar.setPercentage(boss.energy);
        bottle.break();
        hitEnemy = true;

        if (boss.energy <= 0) {
          setTimeout(() => {
            this.state = "won";
            if (!this.winPlayed) {
              music.pause();
              win.currentTime = 0;
              win.play();
              this.winPlayed = true;
            }
          }, 2000);
        }
      }

      if (hitEnemy) return true;

      return true;
    });

    this.level.enemies = this.level.enemies.filter((e) => !e.remove);
  }

  /**
   * Checks if the character collects any coins.
   * Removes collected coins and updates coin bar based on total coins collected.
   */
  checkCoins() {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => {
        if (obj instanceof coin && this.character.isColliding(obj)) {
          this.collectCoin();
          return false;
        }
        return true;
      }
    );
  }

  /**
   * Handles collecting a coin.
   * Plays sound, increments coin count, and updates coin bar.
   */
  collectCoin() {
    if (!this.coinCount) this.coinCount = 0;

    document.getElementById("coin_collect").play();
    this.coinCount++;

    if ([5, 10, 15, 20, 25].includes(this.coinCount)) {
      let percentage = (this.coinCount / 25) * 100;
      this.coinBar.setPercentage(percentage);
    }
  }

  /**
   * Checks if the player throws a bottle.
   * Creates a new throwable object if the player presses the THROW key
   * and has bottles available.
   * Updates the bottle bar percentage accordingly.
   */
  checkThrowableObjects() {
    if (this.keyboard.THROW && this.bottleCount > 0) {
      let bottle = new throwableObject(
        this.character.x + 100,
        this.character.y + 100
      );

      this.throwableObjects.push(bottle);

      this.bottleCount--;

      let percentage = (this.bottleCount / 5) * 100;
      this.bottleBar.setPercentage(percentage);
    }
  }

  /**
   * Checks if the character collects any salsa bottles.
   * Removes collected bottles and updates the bottle bar.
   */
  checkBottles() {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => {
        if (obj instanceof salsaBottle && this.character.isColliding(obj)) {
          this.collectBottle();
          return false;
        }
        return true;
      }
    );
  }

  /**
   * Handles collecting a bottle.
   * Plays collection sound, increments bottle count,
   * and updates the bottle bar percentage.
   */
  collectBottle() {
    if (!this.bottleCount) this.bottleCount = 0;

    document.getElementById("bottle_collect").play();
    this.bottleCount++;

    let percentage = Math.min((this.bottleCount / 5) * 100, 100);
    this.bottleBar.setPercentage(percentage);
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

    if (!this.character.dead) {
      this.addToMap(this.character);
    }

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

    if (this.handleScreens()) return;

    if (!this.level) {
      requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.translate(this.camera_x, 0);
    this.addAllObjects();
    this.ctx.translate(-this.camera_x, 0);

    this.addBars();

    requestAnimationFrame(() => this.draw());
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
        break;
      case "level_transition":
        this.drawLevelTransition();
        break;
      case "lost":
        this.drawLooseScreen();
        break;
      case "won":
        this.drawWinScreen();
        break;
      default:
        return false;
    }

    requestAnimationFrame(() => this.draw());
    return true;
  }

  /**
   * Draws the level transition screen.
   * Displays the level number centered on a black background.
   */
  drawLevelTransition() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#f5b05b";
    this.ctx.font = "80px rye";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    let levelText = "LEVEL ";
    if (this.level === level1) levelText += "2";
    else if (this.level === level2) levelText += "3";

    this.ctx.fillText(levelText, this.canvas.width / 2, this.canvas.height / 2);
  }

  /**
   * Draws the title screen using the titleScreen object.
   */
  drawTitleScreen() {
    titleScreen.draw(this.ctx);
  }

  /**
   * Draws the win screen on the canvas.
   */
  drawWinScreen() {
    let img = new Image();
    img.src = "img/You won, you lost/You Win A.png";

    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

    document.getElementById("restartGame").style.display = "flex";
  }

  /**
   * Draws the loose screen on the canvas.
   */
  drawLooseScreen() {
    let img = new Image();
    img.src = "img/You won, you lost/Game over A.png";

    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

    document.getElementById("restartGame").style.display = "flex";
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
    mO.draw(this.ctx);
    mO.drawBorder(this.ctx);
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
