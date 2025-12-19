class coin extends collectableObject {
  y = 300 - Math.random() * 200;

  IMGS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new coin instance.
   * Loads images.
   */
  constructor(existingCollectables, world) {
    super();
    this.x = world.getSpawnX(existingCollectables, 600, 6600, 150);

    this.loadImgs(this.IMGS);
    this.img = this.imgCache[this.IMGS[0]];
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMGS);
    }, 500);
  }
}