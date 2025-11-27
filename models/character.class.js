class Character extends movableObject {
  height = 200;
  width = 120;
  y = 230;
  groundY = 230;
  world;
  speed = 10;

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

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImgs(this.IMGS_WALKING);
    this.loadImgs(this.IMGS_JUMPING);
    this.loadImgs(this.IMGS_HURT);
    this.loadImgs(this.IMGS_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.move();
    this.showImgs();
  }

  move() {
  setInterval(() => {

    if (!this.world || !this.world.level) return;

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.inverted = false;
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.inverted = true;
    }

    if (
      (this.world.keyboard.UP && !this.IsAboveGround()) ||
      (this.world.keyboard.SPACE && !this.IsAboveGround())
    ) {
      this.jump();
    }

    this.world.camera_x = -this.x + 80;

  }, 1000 / 60);
}

  showImgs() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMGS_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMGS_HURT);
      } else if (this.IsAboveGround()) {
        this.playAnimation(this.IMGS_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMGS_WALKING);
        }
      }
    }, 50);
  }
}