class Cloud extends movableObject {
  y = 30;
  width = 500;
  height = 300;

  /**
   * Creates a new cloud object,
   * with a random x posdition and
   * animates it
   */
  constructor() {
    super().loadImage("img//5_background/layers/4_clouds/1.png");

    this.x = 0 + Math.random() * 500;
    this.animate();
  }

  /**
   * Is moving the cloud to the left
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}