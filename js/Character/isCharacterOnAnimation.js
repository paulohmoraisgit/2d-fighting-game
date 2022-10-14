Character.prototype.isOnAttackAnimation = function() {
  let checkForAttackAnimations = (this.image == this.sprites.attack1.image) || (this.image == this.sprites.attack2.image)

  return checkForAttackAnimations && this.currentFrame < (this.maxFrames - 1);
}

Character.prototype.isOnTakeHitAnimation = function() {
  return this.image == this.sprites.takeHit.image && this.currentFrame < (this.maxFrames - 1);
}