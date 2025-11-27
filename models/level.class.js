class Level {
  bgObjects;
  enemies;
  clouds;
  level_end_x = 2200;
  collectableObjects;

  constructor(enemies, clouds, bgObjects, collectableObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bgObjects = bgObjects;
    this.collectableObjects = collectableObjects;
  }
}