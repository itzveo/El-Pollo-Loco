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

  IMGS_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/3_w.png");
    this.loadImgs(this.IMGS_WALKING);

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
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.jump();
    }, 1000)
  }

  showImgs() {
    setInterval(() => {
      this.playAnimation(this.IMGS_WALKING);
      if (this.isHurt()) {
        this.playAnimation(this.IMGS_DEAD);
      } else if (this.IsAboveGround()) {
        this.playAnimation(this.IMGS_JUMPING);
      } 
    }, 50);
  }
}