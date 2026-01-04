let level2;

/**
 * Initiates Level 2 with all according objects like enemies and collectables.
 */
function initLevel2() {
  const enemies = [];
  const collectables = [];

  for (let i = 0; i < 5; i++) {
    enemies.push(new Chicken(enemies, world));
  }

  for (let i = 0; i < 5; i++) {
    enemies.push(new Baby(enemies, world));
  }

  for (let i = 0; i < 5; i++) {
    collectables.push(new salsaBottle(collectables, world));
  }

  for (let i = 0; i < 10; i++) {
    collectables.push(new coin(collectables, world));
  }

  level2 = new Level(enemies, [new Cloud(), new Cloud()], loopBgs(), collectables);
  level2.boss = null;
}