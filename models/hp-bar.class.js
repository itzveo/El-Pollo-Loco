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
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }
}