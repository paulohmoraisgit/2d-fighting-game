Character.prototype.updateMovement = function() {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
  
  this.positionXPlusSize = this.position.x + this.width;
  this.positionYPlusSize = this.position.y + this.height;

  if (this.position.x <= 0) {
    this.velocity.x = 0;
    this.position.x = 0;

    this.movementBlocker.leftMapEdge = true;
  } else {
    this.movementBlocker.leftMapEdge = false;
  }

  if (this.positionXPlusSize >= canvas.width) {
    this.velocity.x = 0;
    this.position.x  = canvas.width - this.width;

    this.movementBlocker.rightMapEdge = true;
  } else {
    this.movementBlocker.rightMapEdge = false;
  }

  if (!this.movementBlocker.down) {
    if (this.positionYPlusSize >= ground) {
      this.velocity.y = 0;
      this.position.y = ground - this.height;

      this.isJumping = false;
    } else {
      this.velocity.y += gravity;
    }
  }

  // ***** Show players hitboxes *****
  // canvas2d.fillStyle = 'yellow';
  // canvas2d.fillRect(this.position.x, this.position.y, this.width, this.height);
  // *********************************
}