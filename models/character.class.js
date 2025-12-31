class Character extends movableObject {
  height = 200;
  width = 120;
  y = 230;
  groundY = 230;
  world;
  speed = 10;
  invincible = false;
  invincibleTime = 200;
  idleTime = 0;
  idleThreshold = 1000;
  sleepThreshold = 5000;
  isSleeping = false;
  dead = false;
  deathAnimationPlayed = false;

  IMGS_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMGS_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMGS_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMGS_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMGS_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMG_IDLE = ["img/2_character_pepe/1_idle/idle/I-1.png"];

  IMGS_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Creates the main player character.
   * Loads all character animations, applies gravity,
   * and starts movement and animation loops.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.hitbox = {
      offsetX: 30,
      offsetY: 90,
      width: this.width - 80,
      height: this.height - 80,
    };
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_JUMPING);
    this.loadImgs(this.IMGS_HURT);
    this.loadImgs(this.IMGS_DEAD);
    this.loadImgs(this.IMGS_IDLE);
    this.loadImgs(this.IMGS_SLEEP);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the main animation and movement logic
   * for the player character.
   */
  animate() {
    this.move();
    this.showImgs();
  }

  /**
   * Handles player movement and jumping based on keyboard input.
   * Updates the camera position relative to the character.
   */
  move() {
    setInterval(() => {
      if (this.dead) return;

      if (!this.world || !this.world.level) return;

      this.updateIdleTime();

      const k = this.world.keyboard;

      if (k.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.inverted = false;
      }

      if (k.LEFT && this.x > 0) {
        this.moveLeft();
        this.inverted = true;
      }

      if (
        (k.UP && !this.IsAboveGround()) ||
        (k.SPACE && !this.IsAboveGround())
      ) {
        this.jump();
      }

      this.world.camera_x = -this.x + 80;
    }, 1000 / 60);
  }

  /**
   * Makes the Player move to left with a restriction when he is in the boss zone.
   */
  moveLeft() {
    this.x -= this.speed;

    const level = this.world.level;

    if (
      level === level3 &&
      level.bossFightActive &&
      this.x < level.bossArenaLeft
    ) {
      this.x = level.bossArenaLeft;
    }
  }

  /**
   * Tracks how long the player has been idle.
   * Resets the idle timer when any movement or action key is pressed.
   */
  updateIdleTime() {
    const k = this.world.keyboard;

    if (k.RIGHT || k.LEFT || k.UP || k.SPACE || k.THROW) {
      this.idleTime = 0;
      this.stopSleepSound();
    } else {
      this.idleTime += 1000 / 60;
    }
  }

  /**
   * Determines the current idle state of the character
   * based on the current idle time.
   * @returns {string} The idle state ("sleep", "idle", or "none").
   */
  getIdleState() {
    if (this.idleTime > this.sleepThreshold) return "sleep";
    if (this.idleTime > this.idleThreshold) return "idle";
    return "none";
  }

  /**
   * Plays idle or sleep animations if the player
   * has been inactive for a certain amount of time.
   * @returns {boolean} True if an idle animation was played.
   */
  handleIdleAnimations() {
    if (this.world.state !== "playing") {
      this.stopSleepSound();
      return false;
    }

    const state = this.getIdleState();

    if (state === "sleep") {
      if (!this.isSleeping) {
        this.isSleeping = true;
        sleep.currentTime = 0;
        sleep.play();
      }

      this.playAnimation(this.IMGS_SLEEP);
      return true;
    }

    if (state === "idle") {
      this.stopSleepSound();
      this.playAnimation(this.IMGS_IDLE);
      return true;
    }

    this.stopSleepSound();
    return false;
  }

  /**
   * Stops and resets the sleep sound.
   */
  stopSleepSound() {
    if (this.isSleeping) {
      sleep.pause();
      sleep.currentTime = 0;
      this.isSleeping = false;
    }
  }

  /**
   * Handles character animation states such as
   * death, hurt, jumping, idle, walking, and default idle.
   */
  showImgs() {
    setInterval(() => {
      if (this.dead) {
        return;
      }

      if (this.isHurt()) {
        this.playAnimation(this.IMGS_HURT);
        return;
      }

      if (this.IsAboveGround()) {
        this.playAnimation(this.IMGS_JUMPING);
        return;
      }

      if (this.handleIdleAnimations()) {
        return;
      }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMGS_WALKING);
        return;
      }

      this.playAnimation(this.IMG_IDLE);
    }, 50);
  }

  /**
   * Updates the object's hitbox based on its current size.
   * The hitbox is intentionally smaller and centered
   * to allow more precise collision detection.
   */
  updateHitbox() {
    this.hitbox.width = this.width - 70;
    this.hitbox.height = this.height - 90;
  }

  /**
   * Calculates and returns the player's foot hitbox.
   * Used for precise collision detection with enemies.
   * @returns {{x:number, y:number, width:number, height:number}} The foot hitbox.
   */
  getFootHitbox() {
    return {
      x: this.x + this.width * 0.3,
      y: this.y + this.height * 0.85,
      width: this.width * 0.4,
      height: this.height * 0.15,
    };
  }

  /**
   * Draws the player's foot hitbox for debugging purposes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFootHitbox(ctx) {
    const hb = this.getFootHitbox();
    ctx.strokeStyle = "blue";
    ctx.strokeRect(hb.x, hb.y, hb.width, hb.height);
  }

  /**
   * Applies damage effects to the player and starts invincibility frames.
   */
  takeDamage() {
    this.isDamaged();
    this.startInvincibility();
  }

  /**
   * Checks whether the player is currently able to take damage.
   * @returns {boolean} True if the player can take damage.
   */
  canTakeDamage() {
    return !this.invincible && !this.dead;
  }

  /**
   * Activates temporary invincibility for the player.
   * Prevents taking damage for a defined duration.
   */
  startInvincibility() {
    this.invincible = true;
    setTimeout(() => {
      this.invincible = false;
    }, this.invincibleTime);
  }

  /**
   * Plays the player's death animation frame by frame.
   * Executes a callback function once the animation is finished.
   * @param {Function} [onFinished] - Optional callback after animation ends.
   */
  playDeathAnimation(onFinished) {
    let index = 0;
    const interval = setInterval(() => {
      this.loadImage(this.IMGS_DEAD[index]);
      index++;

      if (index >= this.IMGS_DEAD.length) {
        clearInterval(interval);
        if (onFinished) onFinished();
      }
    }, 150);
  }

  /**
   * Kills the player and stops all movement.
   */
  die(onDeathFinished) {
    if (this.dead) return;

    this.dead = true;
    this.speed = 0;
    this.speedY = 0;

    this.playDeathAnimation(() => {
      if (onDeathFinished) onDeathFinished();
    });
  }
}
