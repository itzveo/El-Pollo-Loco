let level3;

function initLevel3() {
  level3 = new Level(
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