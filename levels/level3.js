let level3;

function initLevel3() {
  const enemies = [];
  const collectables = [];

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

  const boss = new Boss();
  enemies.push(boss);

  level3 = new Level(enemies, [new Cloud()], loopBgs(), collectables);

  level3.boss = boss;
}