class Boss extends movableObject {
  height = 400;
  width = 250;
  energy = 100;
  y = 50;

  state = "alert";
  lastHit = 0;
  movingForward = false;
  movingBackward = false;
  attackCooldown = 10000;
  lastAttack = 0;
  attackPhase = "none";
  originalWidth = 250;
  originalHeight = 400;
  originalY = 50;
  headHitCooldown = false;

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

  IMGS_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
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

  /**
   * Creates a new boss instance.
   * Loads all animations, sets the start position,
   * and starts the animation loop.
   */
  constructor() {
    super().loadImage(this.IMGS_ALERT[0]);

    this.loadImgs(this.IMGS_ALERT);
    this.loadImgs(this.IMGS_HURT);
    this.loadImgs(this.IMGS_ATTACK);
    this.loadImgs(this.IMGS_WALK);
    this.loadImgs(this.IMGS_DEAD);

    this.x = 7500;
    this.startX = this.x;

    this.animate();
  }

  /**
   * Main animation loop for the boss.
   * Selects and plays animations based on the current state.
   */
  animate() {
    setInterval(() => {
      this.tryAttack();

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

        case "attack":
          this.attackLogic();
          this.playAnimation(this.IMGS_ATTACK);
          break;

        case "dead":
          this.playAnimation(this.IMGS_DEAD, () => {
            this.dead = true;
          });
          break;
      }
    }, 120);
  }

  /**
   * Another method used to damage the boss.
   * @param {number} amount - the demage that is dealt to the boss
   */
  takeDamage(amount = 20) {
    this.energy -= amount;
    bossHit.play();

    if (this.energy <= 0) {
      this.startDeath();
    }
  }

  /**
   * Handles damage taken by the boss.
   * Reduces energy, triggers hurt state,
   * and decides whether to continue or die.
   */
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
    }, 1000 / 144);
  }

  /**
   * Controls forward and backward movement logic
   * during the walking state.
   */
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

  /**
   * Starts the forward walking animation and movement.
   */
  startForwardRun() {
    this.state = "walk";
    this.movingForward = true;
    this.inverted = false;
  }

  /**
   * Starts the backward walking animation and movement.
   */
  startBackwardRun() {
    this.state = "walk";
    this.movingBackward = true;
    this.inverted = true;
  }

  /**
   * Determines whether the boss should start an attack.
   * Triggers an attack if the boss is in alert state
   * and the attack cooldown has elapsed.
   */
  tryAttack() {
    const now = Date.now();

    if (this.state === "alert" && now - this.lastAttack > this.attackCooldown) {
      this.startAttack();
      this.lastAttack = now;
    }
  }

  /**
   * Initiates the boss attack sequence.
   * Sets the boss state to attack and starts with the shrink phase.
   */
  startAttack() {
    this.state = "attack";
    this.attackPhase = "shrink";
  }

  /**
   * Controls the boss attack behavior based on the current attack phase.
   * Delegates logic to shrinking, charging forward, or returning phases.
   */
  attackLogic() {
    switch (this.attackPhase) {
      case "shrink":
        this.shrinkBoss();
        break;

      case "jump":
        this.chargeForward();
        break;

      case "return":
        this.returnAfterAttack();
        break;
    }
  }

  /**
   * Shrinks the boss before charging forward.
   * Reduces width and height, adjusts vertical position,
   * and transitions to the jump phase when the minimum size is reached.
   */
  shrinkBoss() {
    const shrinkSpeed = 8;

    this.height -= shrinkSpeed;
    this.width -= 5;

    this.y = this.originalY + (this.originalHeight - this.height);

    if (this.width <= this.originalWidth * 0.5) {
      this.attackPhase = "jump";
    }
  }

  /**
   * Moves the boss rapidly forward as part of the attack.
   * Switches to the return phase once the target x-position is reached.
   */
  chargeForward() {
    this.x -= 60;

    if (this.x <= 7000) {
      this.attackPhase = "return";
      this.movingBackward = true;

      this.inverted = true;
      this.y = this.originalY + (this.originalHeight - this.height);
    }
  }

  /**
   * Returns the boss to its original position after an attack.
   * Resets size, orientation, movement flags, and attack state.
   */
  returnAfterAttack() {
    this.x += 30;

    if (this.x >= this.startX) {
      this.y = 50;
      this.width = this.originalWidth;
      this.height = this.originalHeight;
      this.movingBackward = false;
      this.inverted = false;
      this.attackPhase = "none";
      this.state = "alert";
    }
  }

  /**
   * Calculates and returns the boss's head hitbox.
   * Used for detecting player head stomp collisions.
   */
  getHeadHitbox() {
    return {
      x: this.x + this.width * 0.3,
      y: this.y - 10,
      width: this.width * 0.4,
      height: this.height * 0.1,
    };
  }

  /**
   * Draws the head hitbox from the collision system
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawHeadHitbox(ctx) {
    const hb = this.getHeadHitbox();
    ctx.strokeStyle = "purple";
    ctx.strokeRect(hb.x, hb.y, hb.width, hb.height);
  }

  /**
   * Transitions the boss into the dead state.
   */
  startDeath() {
    this.state = "dead";
    this.dead = true;
  }
}
