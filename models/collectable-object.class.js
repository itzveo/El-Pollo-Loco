class collectableObject extends movableObject {
  y = 370;

  /**
   * Creates a new instance.
   * Sets its random position. 
   */
  constructor() {
    super();
    this.x = 350 + Math.random() * 500;
  }
}