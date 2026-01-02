/**
 * Collectable Handler Module
 * Handles all collectable object logic (coins and bottles) separately from the World class
 */

class CollectableHandler {
  /**
   * Checks if the character collects any coins.
   */
  static checkCoins(world) {
    world.level.collectableObjects = world.level.collectableObjects.filter(
      (obj) => {
        if (obj instanceof coin && world.character.isHitboxTouching(obj, 8)) {
          this.collectCoin(world);
          return false;
        }
        return true;
      }
    );
  }

  /**
   * Handles collecting a coin.
   */
  static collectCoin(world) {
    if (!world.coinCount) world.coinCount = 0;

    document.getElementById("coin_collect").play();
    world.coinCount++;

    if ([5, 10, 15, 20, 25].includes(world.coinCount)) {
      let percentage = (world.coinCount / 25) * 100;
      world.coinBar.setPercentage(percentage);
    }
  }

  /**
   * Checks if the character collects any salsa bottles.
   */
  static checkBottles(world) {
    world.level.collectableObjects = world.level.collectableObjects.filter(
      (obj) => {
        if (
          obj instanceof salsaBottle &&
          world.character.isHitboxTouching(obj, 8)
        ) {
          this.collectBottle(world);
          return false;
        }
        return true;
      }
    );
  }

  /**
   * Handles collecting a bottle.
   */
  static collectBottle(world) {
    if (!world.bottleCount) world.bottleCount = 0;

    document.getElementById("bottle_collect").play();

    if (world.bottleCount < 5) {
      world.bottleCount++;

      let percentage = (world.bottleCount / 5) * 100;
      world.bottleBar.setPercentage(percentage);
    }
  }
}
