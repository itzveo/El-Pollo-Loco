class drawableObject {
  x = 100;
  y = 280;
  img;
  height = 150;
  width = 100;
  currentIMG = 0;
  imgCache = {};

  /**
   * Loads a single image and assigns it as the current image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas using its current image.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (!this.visible) return;
  }

  /**
   * Preloads multiple images and stores them in the image cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }
} 