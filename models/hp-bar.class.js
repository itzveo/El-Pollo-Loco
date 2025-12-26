class hpBar extends drawableObject {
  IMGS = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  /**
   * Creates a new health bar instance.
   * Loads all images, sets position and size,
   * and initializes the percentage value to 100.
   */
  constructor() {
    super();
    this.loadImgs(this.IMGS);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
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
}