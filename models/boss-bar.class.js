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
}