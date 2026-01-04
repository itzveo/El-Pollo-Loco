let level3;

/**
 * Initiates Level 3 with all according objects like enemies, collectables and boss.
 * Also creates a bosszone, that cant be escaped once entered.
 */
function initLevel3() {
  const enemies = [];
  const collectables = [];

  for (let i = 0; i < 5; i++) {
    enemies.push(new Chicken(enemies, world));
  }

  for (let i = 0; i < 3; i++) {
    enemies.push(new Baby(enemies, world));
  }

  for (let i = 0; i < 5; i++) {
    collectables.push(new salsaBottle(collectables, world));
  }

  for (let i = 0; i < 5; i++) {
    collectables.push(new coin(collectables, world));
  }

  const boss = new Boss();
  enemies.push(boss);

  level3 = new Level(enemies, [new Cloud(), new Cloud()], loopBgs(), collectables);

  level3.boss = boss;

  level3.bossTriggerX = 7200;   
  level3.bossArenaLeft = 7000;  
  level3.bossFightActive = false;
}
