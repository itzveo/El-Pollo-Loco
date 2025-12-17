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

  /**
   * Draws a debug collision border around the object.
   * Only applied to specific game object types.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Baby ||
      this instanceof Boss ||
      this instanceof coin ||
      this instanceof salsaBottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}