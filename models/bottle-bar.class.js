class bottleBar extends drawableObject {
  IMGS = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0;
  count = 0;

  /**
   * Creates a new status bar instance.
   * Loads all images, sets position and size,
   * and initializes the percentage to zero.
   */
  constructor() {
    super();
    this.loadImgs(this.IMGS);
    this.x = 30;
    this.y = 100;
    this.width = 200;
    this.height = 50;
    this.setPercentage(0);
  }
}