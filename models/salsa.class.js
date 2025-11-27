class salsaBottle extends collectableObject {
  height = 60;
  width = 50;

  IMGS = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super();
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImgs(this.IMGS);
  }
}