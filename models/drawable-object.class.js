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

  /**
   * Determines the image index to display based on
   * the current percentage value.
   * @returns {number} The index of the image to be displayed.
   */
  resolveImgIndex() {
    if (this.percentage == 100 || this.percentage == 90) {
      return 5;
    } else if (this.percentage == 80 || this.percentage == 70) {
      return 4;
    } else if (this.percentage == 60 || this.percentage == 50) {
      return 3;
    } else if (this.percentage == 40 || this.percentage == 30) {
      return 2;
    } else if (this.percentage == 20 || this.percentage == 10) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Updates the current percentage value and sets
   * the corresponding image for the status bar.
   * @param {number} percentage - Current value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMGS[this.resolveImgIndex()];
    this.img = this.imgCache[path];
  }

  /**
   * Renders the current value of the bars accordingly.
   * HpBar shows percentage, the other bars are showing current Count.
   * @param {*} ctx - The canvas rendering context.
   */
  showValue(ctx) {
    if (this.percentage === undefined) return;
    ctx.font = "14px rye";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    let text;
    if (this instanceof hpBar) {
      text = this.percentage;
    } else if (this.count !== undefined) {
      text = this.count;
    }

    if (text !== undefined) {
      ctx.fillText(text, this.x, this.y + this.height / 100 * 62);
    }
  }
}
