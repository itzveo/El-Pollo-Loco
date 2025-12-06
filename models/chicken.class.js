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

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_DEAD);

    this.x = 350 + Math.random() * 1000;
    this.speed = 0.3 + Math.random() * 0.25;

    this.animate();
  }

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
