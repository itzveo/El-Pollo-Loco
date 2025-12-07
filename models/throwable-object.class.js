class throwableObject extends movableObject { 
  IMGS_BREAK = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
  ];

  IMGS_FLY = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();

    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");

    // Images im Cache laden
    this.IMGS_BREAK.forEach(path => { 
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
    this.IMGS_FLY.forEach(path => { 
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });

    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 80;

    this.isBreaking = false;
    this.remove = false;

    this.groundY = 370;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();

    this.throwInterval = setInterval(() => {
      if (!this.isBreaking) this.x += 20;
    }, 25);

    this.startFlyAnimation();
  }

  startFlyAnimation() {
    let i = 0;
    this.flyInterval = setInterval(() => {
      if (this.isBreaking) return;
      this.img = this.imgCache[this.IMGS_FLY[i]];
      i++;
      if (i >= this.IMGS_FLY.length) i = 0;
    }, 80);
  }

  break() {
    if (this.isBreaking) return;

    this.isBreaking = true;

    clearInterval(this.throwInterval);
    clearInterval(this.flyInterval);

    this.speed = 0;
    this.speedY = 0;

    let i = 0;
    this.breakInterval = setInterval(() => {
      this.img = this.imgCache[this.IMGS_BREAK[i]];
      i++;
      if (i >= this.IMGS_BREAK.length) {
        clearInterval(this.breakInterval);
        this.remove = true; 
      }
    }, 80); 
  }
}