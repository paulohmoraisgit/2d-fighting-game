
let initialFrame = 0;

class Sprite {
	constructor({ 
    position, 
    positionOffset = {
      x: 0,
      y: 0
    }, 
    imageSource, 
    scale = 1, 
    maxFrames = 1 
  }) {
		this.position = position;
    this.positionOffset = positionOffset;

		this.width = 50;
		this.height = 150;

    this.image = new Image();
    this.image.src = imageSource;

    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;

    this.framesElapsed = 0;
    this.frameToAnimate = 5;
	}

	update () {
		this.draw();
    this.animate();
	}

	draw() {
    canvas2d.drawImage(
      this.image,
      (this.image.width / this.maxFrames) * this.currentFrame,
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.positionOffset.x,
      this.position.y - this.positionOffset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale
    );
	}

  animate() {
    if(this.maxFrames == 1) return;

    this.framesElapsed++;

    if(this.framesElapsed % this.frameToAnimate == 0) {
      if (this.currentFrame < this.maxFrames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}