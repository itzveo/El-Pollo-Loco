class bgObject extends movableObject {
  width = 720;
  height = 480;

   /**
   * Creates a new background instance.
   */
  constructor(imgPath, x) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 480 - this.height;
  }
}