class salsaBottle extends collectableObject {
  height = 60;
  width = 50;

  IMGS = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new salsa bottle object.
   * Loads the initial image and preloads all animation images.
   */
  constructor(existingCollectables, world) {
    super();
    this.x = world.getSpawnX(existingCollectables, 600, 6600, 150);

    this.loadImgs(this.IMGS);
    this.img = this.imgCache[this.IMGS[0]];
    this.animate();
  }

  /**
   * Starts the animation loop for the salsa bottle.
   * Continuously cycles through the preloaded images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMGS);
    }, 500);
  }
}