class coin extends collectableObject {
  y = 300 - Math.random() * 200;

  IMGS = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImgs(this.IMGS);
  }
}