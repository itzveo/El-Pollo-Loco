class movableObject extends drawableObject {
  currentIMG = 0;
  speed = 0.25;
  inverted = false;
  speedY = 0;
  boost = 2.5;
  energy = 100;
  lastHit = 0;
  groundY = 230;

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

  IsAboveGround() {
    return this.y < this.groundY;
  }

  isColliding(mO) {
    return (
      this.x + this.width > mO.x &&
      this.y + this.height > mO.y &&
      this.x < mO.x &&
      this.y < mO.y + mO.height
    );
  }

  isDamaged() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentIMG % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentIMG++;
  }

  jump() {
    this.speedY = 35;
  }
}
