class collectableObject extends drawableObject {
  y = 370;

  /**
   * Creates a new instance.
   * Sets its random position. 
   */
  constructor() {
    super();
    this.x = 350 + Math.random() * 500;
  }

  /**
   * Plays a looped animation using a given array of images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentIMG % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentIMG++;
  }
}