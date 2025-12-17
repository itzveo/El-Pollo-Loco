class movableObject extends drawableObject {
  currentIMG = 0;
  speed = 0.25;
  inverted = false;
  speedY = 0;
  boost = 2.5;
  energy = 100;
  lastHit = 0;
  groundY = 230;

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
   * Applies damage to the object, reducing its energy by 20.
   * Updates lastHit timestamp if still alive.
   */
  isDamaged() {
    this.energy -= 20;
    if (this.energy < 0) {
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
    this.speedY = 35;
  }
}