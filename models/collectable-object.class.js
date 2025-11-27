class collectableObject extends drawableObject {
  y = 370;

  constructor() {
    super();
    this.x = 350 + Math.random() * 500;
  }
}