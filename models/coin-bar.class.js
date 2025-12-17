class coinBar extends drawableObject {
  IMGS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  percentage = 0;

  /**
   * Creates a new status bar instance.
   * Loads all status bar images, sets its position and size,
   * and initializes the percentage value to zero.
   */
  constructor() {
    super();
    this.loadImgs(this.IMGS);
    this.x = 20;
    this.y = 50;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Updates the current percentage value and
   * sets the corresponding status bar image.
   * @param {number} percentage - Current value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMGS[this.resolveImgIndex()];
    this.img = this.imgCache[path];
  }

  /**
   * Determines the correct image index based on
   * the current percentage value.
   * @returns {number} The index of the image to be displayed.
   */
  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}