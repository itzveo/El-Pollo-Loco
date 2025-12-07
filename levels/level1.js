let level1;

function initLevel1() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Baby(),
      new Baby(),
      new Baby(),
      new Boss()
    ],

    [new Cloud()],

    loopBgs(),

    [
      new salsaBottle(),
      new salsaBottle(),
      new salsaBottle(),
      new coin(),
      new coin(),
      new coin(),
    ]
  );

  level1.boss = level1.enemies.find(e => e instanceof Boss);
}

function loopBgs() {
  const backgrounds = [];
  const basePath = "img/5_background/layers/";
  const tileWidth = 720;

  const layerSets = [
    "3_third_layer",
    "2_second_layer",
    "1_first_layer"
  ];

  for (let i = -1; i <= 10; i++) {
    const x = i * tileWidth;

    backgrounds.push(new bgObject(`${basePath}air.png`, x));

    const variant = i % 2 === 0 ? 1 : 2;

    layerSets.forEach(layer => {
      backgrounds.push(
        new bgObject(`${basePath}${layer}/${variant}.png`, x)
      );
    });
  }

  return backgrounds;
}