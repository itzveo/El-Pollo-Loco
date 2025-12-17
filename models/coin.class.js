class coin extends collectableObject {
  y = 300 - Math.random() * 200;

  IMGS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new coin instance.
   * Loads images.
   */
  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImgs(this.IMGS);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMGS);
    }, 500);
  }
}