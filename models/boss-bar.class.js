class bossBar extends drawableObject {
  IMGS = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;
  boss;

  /**
   * Creates a boss bar in the upper left corner
   * loads the required image for the current energy of the boss enemy
   * @param {object} boss - references the boss enemy
   */
  constructor(boss) {
    super();
    this.boss = boss;
    this.loadImgs(this.IMGS);

    this.width = 200;
    this.height = 50;

    this.setPercentage(100);
  }

  /**
   * updates the position based on the boss enemy's movement
   */
  updatePosition() {
    this.x = this.boss.x + this.boss.width / 2 - this.width / 2;
    this.y = this.boss.y - 5;
  }

  /**
   * draws the boss bar
   * @param {CanvasRenderingContext2D} ctx - the canvas rendering context
   */
  draw(ctx) {
    this.updatePosition();
    super.draw(ctx);
  }

  /**
   * Sets the current percentage value and updates
   * the displayed image based on that value.
   * @param {number} percentage - Current percentage (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMGS[this.resolveImgIndex()];
    this.img = this.imgCache[path];
  }

  /**
   * Resolves the correct image index based on
   * the current percentage value.
   * @returns {number} The index of the image to be displayed.
   */
  resolveImgIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}