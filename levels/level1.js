let level1;

function initLevel1() {
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

  level1 = new Level(enemies, [new Cloud()], loopBgs(), collectables);

  level1.boss = null;
}

/**
 * Generates an array of background objects for the game.
 * Creates multiple layers with repeating tiles to cover the game world.
 * @returns {Array<bgObject>} An array of bgObject instances representing the background layers.
 */
function loopBgs() {
  const backgrounds = [];
  const basePath = "img/5_background/layers/";
  const tileWidth = 720;

  const layerSets = ["3_third_layer", "2_second_layer", "1_first_layer"];

  for (let i = -1; i <= 10; i++) {
    const x = i * tileWidth;

    backgrounds.push(new bgObject(`${basePath}air.png`, x));

    const variant = i % 2 === 0 ? 1 : 2;

    layerSets.forEach((layer) => {
      backgrounds.push(new bgObject(`${basePath}${layer}/${variant}.png`, x));
    });
  }

  return backgrounds;
}