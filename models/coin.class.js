class coin extends collectableObject {
  y = 300 - Math.random() * 200;

  IMGS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new coin instance.
   * Loads images.
   */
  constructor(existingCollectables, world) {
    super();
    this.hitbox = {
      offsetX: this.width * 0.35,
      offsetY: this.height * 0.35,
      width: this.width * 0.3,
      height: this.height * 0.3,
    };

    this.x = world.getSpawnX(existingCollectables, 600, 6600, 150);

    this.loadImgs(this.IMGS);
    this.img = this.imgCache[this.IMGS[0]];
    this.animate();
  }

  /**
   * Starts the animation loop for this object.
   * Cycles through the image array at a fixed interval
   * to create a looping animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMGS);
    }, 500);
  }

  /**
   * Updates the object's hitbox based on its current size.
   * The hitbox is intentionally smaller and centered
   * to allow more precise collision detection.
   */
  updateHitbox() {
    this.hitbox.offsetX = this.width * 0.35;
    this.hitbox.offsetY = this.height * 0.35;
    this.hitbox.width = this.width * 0.3;
    this.hitbox.height = this.height * 0.3;
  }
}
