class worldRenderer {
  constructor(world) {
    this.world = world;
    this.ctx = world.ctx;
    this.canvas = world.canvas;
  }

  /**
   * Main drawing loop for the world.
   * Clears the canvas, handles screens (title, win, lose, level transitions),
   * renders all objects, and updates UI bars.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.handleScreens()) {
      if (this.world.level) {
        this.ctx.translate(this.world.camera_x, 0);
        this.addAllObjects();
        this.ctx.translate(-this.world.camera_x, 0);
        this.addBars();
      }
    }
  }

  /**
   * Handles special screens like title, level transitions, win, and lose.
   * Draws the appropriate screen and returns true if a special screen was displayed.
   * @returns {boolean} True if a special screen was handled, otherwise false.
   */
  handleScreens() {
    switch (this.world.state) {
      case "title":
        this.world.drawTitleScreen();
        return true;
      case "level_transition":
        this.world.drawLevelTransition();
        return true;
      case "lost":
        this.world.drawLooseScreen();
        return true;
      case "won":
        this.world.drawWinScreen();
        return true;
      default:
        return false;
    }
  }

  /**
   * Adds all objects in the current level to the canvas for rendering.
   * Includes background objects, clouds, throwable objects,
   * collectables, enemies, boss bar (if present), and the player character.
   */
  addAllObjects() {
    const w =  this.world;
    this.addObjectsToMap(w.level.bgObjects);
    this.addObjectsToMap(w.level.clouds);
    this.addObjectsToMap(w.throwableObjects);
    this.addObjectsToMap(w.level.collectableObjects);
    this.addObjectsToMap(w.level.enemies);
    this.addToMap(w.character);

    if (w.level.boss && w.bossBar) {
      this.addToMap(w.bossBar);
    }
  }

  /**
   * Adds all UI bars (health, coin, bottle) to the canvas.
   */
  addBars() {
    this.addToMap(this.world.hpBar);
    this.addToMap(this.world.coinBar);
    this.addToMap(this.world.bottleBar);
  }

  /**
   * Adds multiple objects to the canvas.
   * @param {Array} objects - Array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
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

    if (typeof mO.showValue === "function") {
      mO.showValue(this.ctx);
    }

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
}
