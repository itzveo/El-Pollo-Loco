class Chicken extends movableObject {
  y = 370;
  groundY = 370;
  height = 60;
  width = 40;

  IMGS_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMGS_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new chicken enemy.
   * Loads walking and death animations,
   * sets a random start position and speed,
   * and starts the animation loops.
   */
  constructor(enemies, world) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_DEAD);

    this.x = world.getSpawnX(enemies, 600, 6600, 300);
    this.speed = 0.5 + Math.random() * 0.25;

    this.animate();
  }

  /**
   * Starts movement and animation intervals for the enemy.
   * Handles continuous walking and switches animations
   * depending on whether the enemy is alive or dead.
   */
  animate() {
    this.walkInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMGS_DEAD);
      } else {
        this.playAnimation(this.IMGS_WALKING);
      }
    }, 180);
  }

  /**
   * Kills the enemy.
   * Stops all movement, plays the death sound,
   * and marks the enemy for removal after a short delay.
   */
  die() {
    this.energy = 0;
    this.dead = true;
    this.speed = 0;
    this.speedY = 0;
    this.currentIMG = 0;

    document.getElementById("chicken_hurt").play();

    setTimeout(() => {
      this.remove = true;
    }, 500);
  }
}