class Boss extends movableObject {
  height = 400;
  width = 250;
  energy = 100;
  y = 50;

  state = "alert";
  lastHit = 0;
  movingForward = false;
  movingBackward = false;

  IMGS_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMGS_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMGS_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMGS_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMGS_ALERT[0]);

    this.loadImgs(this.IMGS_ALERT);
    this.loadImgs(this.IMGS_HURT);
    this.loadImgs(this.IMGS_WALK);
    this.loadImgs(this.IMGS_DEAD);

    this.x = 700;
    this.startX = this.x;

    this.animate();
  }

  animate() {
    setInterval(() => {
      switch (this.state) {
        case "alert":
          this.playAnimation(this.IMGS_ALERT);
          break;

        case "hurt":
          this.playAnimation(this.IMGS_HURT);
          break;

        case "walk":
          this.walkLogic();
          this.playAnimation(this.IMGS_WALK);
          break;

        case "dead":
          this.playAnimation(this.IMGS_DEAD, () => {
            this.dead = true;
          });
          break;
      }
    }, 120);
  }

  hit() {
    if (this.state === "dead") return;
    if (this.state === "walk") return;

    this.energy -= 20;
    this.state = "hurt";

    setTimeout(() => {
      if (this.energy > 0) {
        this.startForwardRun();
      } else {
        this.startDeath();
      }
    }, 1000/60);
  }

  walkLogic() {
    if (this.movingForward) {
      this.x -= 30;
      if (this.x <= this.startX - this.width) {
        this.movingForward = false;
        this.startBackwardRun();
      }
    } else if (this.movingBackward) {
      this.x += 30;
      if (this.x >= this.startX) {
        this.movingBackward = false;
        this.inverted = false;
        this.state = "alert";
      }
    }
  }

  startForwardRun() {
    this.state = "walk";
    this.movingForward = true;
    this.inverted = false;
  }

  startBackwardRun() {
    this.state = "walk";
    this.movingBackward = true;
    this.inverted = true;
  }

  startDeath() {
    this.state = "dead";
    this.dead = true;
  }
}
