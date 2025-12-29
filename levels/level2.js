let level2;

function initLevel2() {
  const enemies = [];
  const collectables = [];

  for (let i = 0; i < 5; i++) {
    enemies.push(new Chicken(enemies, world));
  }

  for (let i = 0; i < 7; i++) {
    enemies.push(new Baby(enemies, world));
  }

  for (let i = 0; i < 5; i++) {
    collectables.push(new salsaBottle(collectables, world));
  }

  for (let i = 0; i < 10; i++) {
    collectables.push(new coin(collectables, world));
  }

  level2 = new Level(enemies, [new Cloud()], loopBgs(), collectables);
  level2.boss = null;
}