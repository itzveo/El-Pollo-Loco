class Level {
  bgObjects;
  enemies;
  clouds;
  level_end_x = 2200;

  constructor(enemies, clouds, bgObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bgObjects = bgObjects;
  }
}