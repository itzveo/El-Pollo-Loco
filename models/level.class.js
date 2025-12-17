class Level {
  bgObjects;
  enemies;
  clouds;
  level_end_x = 7200;
  collectableObjects;

  /**
   * Creates a new Level instance.
   * @param {Array} enemies - Array of enemies in the level.
   * @param {Array} clouds - Array of cloud objects.
   * @param {Array} bgObjects - Array of background objects.
   * @param {Array} collectableObjects - Array of collectable objects.
   */
  constructor(enemies, clouds, bgObjects, collectableObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bgObjects = bgObjects;
    this.collectableObjects = collectableObjects;
  }
}