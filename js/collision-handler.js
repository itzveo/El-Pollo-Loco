/**
 * Collision Handler Module
 * Handles all bottle collision logic separately from the World class
 */

class CollisionHandler {
  static checkCollisions(world) {
  world.level.enemies.forEach((enemy) => {
    this.handleEnemyCollision(world, enemy);
  });
}

static handleEnemyCollision(world, enemy) {
  const player = world.character;
  if (enemy.dead || player.dead) return;

  if (this.isHeadStomp(player, enemy)) {
    enemy.die();
    player.jump();
    player.speedY = 25;
    return;
  }

  if (!player.IsAboveGround() && player.isHitboxTouching(enemy, 6)) {
    this.handlePlayerDamage(world, player);
  }
}

static isHeadStomp(player, enemy) {
  return (
    player.speedY < 0 &&
    movableObject.hitboxesOverlap(
      player.getFootHitbox(),
      enemy.getHeadHitbox()
    )
  );
}

static handleHeadStomp(player, enemy) {
  enemy.die();
  player.jump();
}

static handlePlayerDamage(world, player) {
  player.isDamaged();
  document.getElementById("player_hurt").play();
  world.hpBar.setPercentage(player.energy);

  if (player.energy === 0) {
    this.handlePlayerDeath(world);
  }
}

  /**
   * Handles the player's death.
   * Sets game state to 'lost', stops background music, and plays game over sound after a delay.
   * @param {World} world - The world instance
   */
  static handlePlayerDeath(world) {
    setTimeout(() => {
      world.state = "lost";
      if (!world.gameOverPlayed) {
        music.pause();
        over.currentTime = 0;
        over.play();
        world.gameOverPlayed = true;
      }
    }, 2000);
  }

  /**
   * Checks and handles all bottle collisions with ground, enemies, and boss.
   * Removes bottles that should be destroyed and filters out dead enemies.
   * @param {World} world - The world instance containing game state
   */
  static checkBottleCollisions(world) {
    world.throwableObjects = world.throwableObjects.filter((bottle) => {
      if (this.handleGroundCollision(bottle)) return true;
      if (this.handleBreakingBottle(bottle)) return !bottle.remove;

      const hitEnemy =
        this.checkEnemyCollisions(world, bottle) ||
        this.checkBossCollision(world, bottle);
      return true;
    });
    world.level.enemies = world.level.enemies.filter((e) => !e.remove);
  }

  /**
   * Handles collision of a bottle with the ground.
   * Breaks the bottle and plays breaking sound if it hits the ground.
   * @param {Object} bottle - The bottle object to check
   * @returns {boolean} True if bottle hit the ground, false otherwise
   */
  static handleGroundCollision(bottle) {
    if (!bottle.IsAboveGround() && !bottle.isBreaking) {
      bottle.break();
      document.getElementById("bottle_breaking").play();
      return true;
    }
    return false;
  }

  /**
   * Handles bottles that are currently in their breaking animation.
   * Plays the breaking sound during the animation.
   * @param {Object} bottle - The bottle object to check
   * @returns {boolean} True if bottle is breaking, false otherwise
   */
  static handleBreakingBottle(bottle) {
    if (bottle.isBreaking) {
      swoosh.pause();
      swoosh.currentTime = 0;
      document.getElementById("bottle_breaking").play();
      return true;
    }
    return false;
  }

  /**
   * Checks collisions between a bottle and regular enemies (Chicken and Baby).
   * Kills the enemy and breaks the bottle on collision.
   * @param {World} world - The world instance
   * @param {Object} bottle - The bottle object to check
   * @returns {boolean} True if bottle hit any enemy, false otherwise
   */
  static checkEnemyCollisions(world, bottle) {
    let hitEnemy = false;
    world.level.enemies.forEach((enemy) => {
      if (!(enemy instanceof Chicken) && !(enemy instanceof Baby)) return;
      if (!enemy.dead && bottle.isHitboxTouching(enemy, 10)) {
        if (enemy.die) enemy.die();
        bottle.break();
        document.getElementById("bottle_breaking").play();
        hitEnemy = true;
      }
    });
    return hitEnemy;
  }

  /**
   * Checks collision between a bottle and the boss enemy.
   * Damages the boss, updates boss health bar, and triggers win condition if boss is defeated.
   * @param {World} world - The world instance
   * @param {Object} bottle - The bottle object to check
   * @returns {boolean} True if bottle hit the boss, false otherwise
   */
  static checkBossCollision(world, bottle) {
    const boss = world.level.boss;
    if (!boss || boss.dead || !bottle.isColliding(boss)) return false;

    boss.hit();
    world.bossBar.setPercentage(boss.energy);
    bossHit.play();
    bottle.break();

    if (boss.energy <= 0) {
      this.handleBossDefeat(world);
    }
    return true;
  }

  /**
   * Handles the game's win condition when the boss is defeated.
   * Sets game state to 'won', stops background music, and plays victory sound after a delay.
   * @param {World} world - The world instance
   */
  static handleBossDefeat(world) {
    setTimeout(() => {
      world.state = "won";
      if (!world.winPlayed) {
        music.pause();
        bossHit.pause();
        win.currentTime = 0;
        win.play();
        world.winPlayed = true;
      }
    }, 2000);
  }
}
