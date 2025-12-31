class Baby extends movableObject {
  y = 370;
  groundY = 370;
  height = 60;
  width = 40;
  speedY = 40;

  IMGS_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMGS_JUMPING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMGS_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new baby enemy instance.
   * Initializes images, random position and speed,
   * applies gravity, and starts animations.
   */
  constructor(enemies, world) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/3_w.png");
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_DEAD);

    this.x = world.getSpawnX(enemies, 600, 6600, 300);
    this.speed = 1.75 + Math.random() * 0.25;

    this.applyGravity();
    this.animate();
  }

  /**
   * Starts movement and animation loops for the baby enemy.
   */
  animate() {
    this.move();
    this.showImgs();
  }

  /**
   * Controls horizontal movement and jumping behavior.
   * Uses intervals to update position and trigger jumps.
   */
  move() {
    setInterval(() => {
      if (!this.dead) {
        if (this.IsAboveGround()) {
          this.x -= this.speed * 2.5;
        } else {
          this.moveLeft();
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.dead) this.jump();
    }, 1000);
  }

  /**
   * Handles animation state changes depending on
   * whether the enemy is walking, jumping, or dead.
   */
  showImgs() {
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMGS_DEAD);
        return;
      }

      if (this.IsAboveGround()) {
        this.playAnimation(this.IMGS_JUMPING);
      } else {
        this.playAnimation(this.IMGS_WALKING);
      }
    }, 100);
  }

  /**
   * Returns the enemy's head collision zone
   */
  getHeadHitbox() {
    return {
      x: this.x + this.width * 0.3,
      y: this.y,
      width: this.width * 0.4,
      height: this.height * 0.2,
    };
  }

  /**
   * Draws the head hitbox from the collision system
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawHeadHitbox(ctx) {
    const hb = this.getHeadHitbox();
    ctx.strokeStyle = "green";
    ctx.strokeRect(hb.x, hb.y, hb.width, hb.height);
  }

  /**
   * Kills the baby enemy.
   * Stops movement, plays death sound,
   * and marks the object for removal.
   */
  die() {
    this.energy = 0;
    this.dead = true;
    this.speed = 0;
    this.speedY = 0;
    this.currentIMG = 0;

    document.getElementById("baby_hurt").play();

    setTimeout(() => {
      this.remove = true;
    }, 500);
  }
}
