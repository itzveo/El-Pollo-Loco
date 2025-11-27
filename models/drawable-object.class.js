class drawableObject {
  x = 100;
  y = 280;
  img;
  height = 150;
  width = 100;
  imgCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

   loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

   drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Baby ||
      this instanceof Boss ||
      this instanceof coin ||
      this instanceof salsaBottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}