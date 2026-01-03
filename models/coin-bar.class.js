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
  count = 0;

  /**
   * Creates a new status bar instance.
   * Loads all status bar images, sets its position and size,
   * and initializes the percentage value to zero.
   */
  constructor() {
    super();
    this.loadImgs(this.IMGS);
    this.x = 30;
    this.y = 50;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
  }
}