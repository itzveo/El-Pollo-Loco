class movableObject extends drawableObject {
  currentIMG = 0;
  speed = 0.25;
  inverted = false;
  speedY = 0;
  boost = 2.5;
  energy = 100;
  lastHit = 0;
  groundY = 230;

  hitbox = {
    offsetX: 10,
    offsetY: 10,
    width: 0,
    height: 0,
  };

  /**
   * Applies gravity to the object.
   * Updates vertical position (y) and vertical speed (speedY)
   * over time, simulating falling and landing on the ground.
   */
  applyGravity() {
    setInterval(() => {
      if (this.y < this.groundY || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.boost;
      } else {
        this.y = this.groundY;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * Updates the object's hitbox based on its current size.
   * The hitbox is intentionally smaller and centered
   * to allow more precise collision detection.
   */
  updateHitbox() {
    this.hitbox.width = this.width - 20;
    this.hitbox.height = this.height - 20;
  }

  /**
   * Returns the absolute hitbox rectangle in world coordinates.
   * @returns {{x: number, y: number, width: number, height: number}}
   * An object representing the hitbox position and size.
   */
  getHitbox() {
    return {
      x: this.x + this.hitbox.offsetX,
      y: this.y + this.hitbox.offsetY,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  /**
   * Checks if the object is currently above the ground.
   * @returns {boolean} True if the object is above ground, else false.
   */
  IsAboveGround() {
    return this.y < this.groundY;
  }

  /**
   * Checks for collision with another movable object.
   * @param {Object} mO - Another object with x, y, width, height properties.
   * @returns {boolean} True if a collision is detected.
   */
  isColliding(mO) {
    return (
      this.x + this.width > mO.x &&
      this.y + this.height > mO.y &&
      this.x < mO.x &&
      this.y < mO.y + mO.height
    );
  }

  /**
   * Checks whether this object's hitbox is touching another object's hitbox.
   * Uses a tolerance value to avoid false positives caused by minimal overlap.
   * @param {movableObject} mO - The other movable object to check collision with.
   * @param {number} [tolerance=5] - Allowed overlap in pixels before a collision is detected.
   * @returns {boolean} True if the hitboxes are touching, otherwise false.
   */
  isHitboxTouching(mO, tolerance = 5) {
    const a = this.getHitbox();
    const b = mO.getHitbox();

    return (
      a.x + a.width - tolerance >= b.x &&
      a.x + tolerance <= b.x + b.width &&
      a.y + a.height - tolerance >= b.y &&
      a.y + tolerance <= b.y + b.height
    );
  }

  static hitboxesOverlap(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Draws the object's hitbox on the canvas.
   * Intended for debugging purposes to visualize
   * collision boundaries during development.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawHitbox(ctx) {
    const hb = this.getHitbox();
    ctx.strokeStyle = "red";
    ctx.strokeRect(hb.x, hb.y, hb.width, hb.height);
  }

  /**
   * Applies damage to the object, reducing its energy by 20.
   * Updates lastHit timestamp if still alive.
   */
  isDamaged() {
    this.energy -= 10;

    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was hurt recently.
   * @returns {boolean} True if the object was hit within the last second.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object has no energy left.
   * @returns {boolean} True if energy is zero, else false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays a looped animation using a given array of images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentIMG % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentIMG++;
  }

  /**
   * Initiates a jump by setting the vertical speed.
   */
  jump() {
    if (this.dead) return;
    this.speedY = 35;
  }
}
