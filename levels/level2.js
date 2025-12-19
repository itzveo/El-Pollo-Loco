let level2;

function initLevel2() {
  const enemies = [];
  const collectables = [];

  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));
  enemies.push(new Chicken(enemies, world));

  enemies.push(new Baby(enemies, world));
  enemies.push(new Baby(enemies, world));
  enemies.push(new Baby(enemies, world));

  collectables.push(new salsaBottle(collectables, world));
  collectables.push(new salsaBottle(collectables, world));
  collectables.push(new salsaBottle(collectables, world));

  collectables.push(new coin(collectables, world));
  collectables.push(new coin(collectables, world));
  collectables.push(new coin(collectables, world));

  level2 = new Level(enemies, [new Cloud()], loopBgs(), collectables);

  level2.boss = null;
}