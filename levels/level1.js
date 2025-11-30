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
      new Boss(),
    ],

    [new Cloud()],

    loopBgs(),

    [
      new salsaBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new salsaBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new salsaBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new coin("img/8_coin/coin_1.png"),
      new coin("img/8_coin/coin_1.png"),
      new coin("img/8_coin/coin_1.png"),
    ]
  );
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