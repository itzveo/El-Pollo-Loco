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

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/3_w.png");
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_DEAD);

    this.x = 750 + Math.random() * 1000;
    this.speed = 1.75 + Math.random() * 0.25;

    this.applyGravity();
    this.animate();
  }

  animate() {
    this.move();
    this.showImgs();
  }

  move() {
    setInterval(() => {
      if (!this.dead) this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.dead) this.jump();
    }, 1000);
  }

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

  die() {
    this.energy = 0;
    this.dead = true;
    this.speed = 0;
    this.speedY = 0;
    this.currentIMG = 0;

    setTimeout(() => {
      this.remove = true;
    }, 500);
  }
}
