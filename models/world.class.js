class World {
  character = new Character();
  hpBar = new hpBar();
  coinBar = new coinBar();
  bottleBar = new bottleBar();
  bossBar = new bossBar();
  throwableObjects = [];
  collectableObjects = [];

  state = "title";
  level = null;

  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  startGame() {
    this.state = "playing";
    initLevel1();
    this.level = level1;
    this.character.x = 100;
    this.character.y = 180;

    if (this.level.boss) {
      this.bossBar = new bossBar(this.level.boss);
    }

    this.run();
  }

  exitGame() {
    this.state = "title";

    clearInterval(this.gameInterval);
    this.gameInterval = null;

    this.level = null;
    this.throwableObjects = [];
    this.collectableObjects = [];

    this.character = new Character();
    this.setWorld();

    this.camera_x = 0;
    this.hpBar.setPercentage(100);
    this.coinBar.setPercentage(0);
    this.bottleBar.setPercentage(0);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.gameInterval = setInterval(() => {
      if (this.state !== "playing") return;

      this.checkCollissions();
      this.checkBottleCollisions();
      this.checkCoins();
      this.checkBottles();
      this.checkThrowableObjects();
      this.checkLevelEnd();
    }, 100);
  }

  checkCollissions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.isDamaged();
        this.hpBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBottleCollisions() {
  this.throwableObjects = this.throwableObjects.filter((bottle) => {
    if (!bottle.IsAboveGround() && !bottle.isBreaking) {
      bottle.break();
      return true; 
    }

    if (bottle.isBreaking) {
      return !bottle.remove; 
    }

    let hitEnemy = false;

    this.level.enemies.forEach((enemy) => {
      if (!(enemy instanceof Chicken) && !(enemy instanceof Baby)) return;

      if (!enemy.dead && bottle.isColliding(enemy)) {
        if (enemy.die) enemy.die();
        bottle.break();
        hitEnemy = true;
      }
    });

    let boss = this.level.boss;
    if (boss && !boss.dead && bottle.isColliding(boss)) {
      boss.hit();
      this.bossBar.setPercentage(boss.energy);

      bottle.break();
      hitEnemy = true;

      if (boss.energy <= 0) {
        setTimeout(() => {
          this.state = "won";
        }, 2000);
      }
    }

    if (hitEnemy) return true;

    return true; 
  });

  this.level.enemies = this.level.enemies.filter((e) => !e.remove);
}

  checkCoins() {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => {
        if (obj instanceof coin && this.character.isColliding(obj)) {
          this.collectCoin();
          return false;
        }
        return true;
      }
    );
  }

  collectCoin() {
    if (!this.coinCount) this.coinCount = 0;

    this.coinCount++;
    console.log("Coins:", this.coinCount);

    if ([5, 10, 15, 20, 25].includes(this.coinCount)) {
      let percentage = (this.coinCount / 25) * 100;
      this.coinBar.setPercentage(percentage);
    }
  }

  checkThrowableObjects() {
    if (this.keyboard.THROW && this.bottleCount > 0) {
      let bottle = new throwableObject(
        this.character.x + 100,
        this.character.y + 100
      );

      this.throwableObjects.push(bottle);

      this.bottleCount--;
      console.log("Bottle used → remaining:", this.bottleCount);

      let percentage = (this.bottleCount / 5) * 100;
      this.bottleBar.setPercentage(percentage);
    }
  }

  checkBottles() {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => {
        if (obj instanceof salsaBottle && this.character.isColliding(obj)) {
          this.collectBottle();
          return false;
        }
        return true;
      }
    );
  }

  collectBottle() {
    if (!this.bottleCount) this.bottleCount = 0;

    this.bottleCount++;
    console.log("Bottles:", this.bottleCount);

    let percentage = Math.min((this.bottleCount / 5) * 100, 100);
    this.bottleBar.setPercentage(percentage);
  }

  checkLevelEnd() {
    if (this.level.level_end_x && this.character.x >= this.level.level_end_x) {
      if (this.level === level3) {
        return;
      }

      this.state = "level_transition";
      this.startLevelTransition();
    }
  }

  startLevelTransition() {
    clearInterval(this.gameInterval);
    this.state = "level_transition";

    setTimeout(() => {
      if (this.level === level1) {
        initLevel2();
        this.level = level2;
      } else if (this.level === level2) {
        initLevel3();
        this.level = level3;
      }

      this.character.x = 100;
      this.character.y = 180;
      this.camera_x = 0;
      this.state = "playing";

      if (this.level.boss) {
        this.bossBar = new bossBar(this.level.boss);
      }

      this.run();
    }, 3000);
  }

  addAllObjects() {
    this.addObjectsToMap(this.level.bgObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.enemies);

    if (this.bossBar) this.addToMap(this.bossBar);

    this.addToMap(this.character);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.handleScreens()) return;

    if (!this.level) {
      requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.translate(this.camera_x, 0);
    this.addAllObjects();
    this.ctx.translate(-this.camera_x, 0);

    this.addBars();

    requestAnimationFrame(() => this.draw());
  }

  handleScreens() {
    switch (this.state) {
      case "title":
        this.drawTitleScreen();
        break;
      case "level_transition":
        this.drawLevelTransition();
        break;
      case "lost":
        this.drawLoseScreen();
        break;
      case "won":
        this.drawWinScreen();
        break;
      default:
        return false;
    }

    requestAnimationFrame(() => this.draw());
    return true;
  }

  drawLevelTransition() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.font = "80px rye";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    let levelText = "LEVEL ";
    if (this.level === level1) levelText += "2";
    else if (this.level === level2) levelText += "3";

    this.ctx.fillText(levelText, this.canvas.width / 2, this.canvas.height / 2);
  }

  drawTitleScreen() {
    titleScreen.draw(this.ctx);
  }

  drawWinScreen() {
    let img = new Image();
    img.src = "img/You won, you lost/You Win A.png";

    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  drawLoseScreen() {
    let img = new Image();
    img.src = "img/You won, you lost/Game over A.png";

    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  addBars() {
    this.addToMap(this.hpBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

  addToMap(mO) {
    if (mO.inverted) this.flipImage(mO);
    mO.draw(this.ctx);
    mO.drawBorder(this.ctx);
    if (mO.inverted) this.flipImageBack(mO);
  }

  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }
}
