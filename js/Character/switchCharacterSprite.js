Character.prototype.switchSprite = function(sprite) {
  if (this.image == this.sprites.death.image) {
    if(this.currentFrame == (this.sprites.death.maxFrames - 1)) this.alive = false; 
    return;
  }

  if(this.health > 0) {
    if (this.isOnAttackAnimation() && !this.cancelAttack || this.isOnTakeHitAnimation()) return;
  }

  switch(sprite) {
    case 'idle':
      if (this.image == this.sprites.idle.image) break;

      this.image = this.sprites.idle.image;
      this.maxFrames = this.sprites.idle.maxFrames;
      this.currentFrame = initialFrame;

      break;

    case 'run':
      if (this.image == this.sprites.run.image) break;

      this.image = this.sprites.run.image;
      this.maxFrames = this.sprites.run.maxFrames;
      this.currentFrame = initialFrame;
      
      break;
    
    case 'jump':
      if (this.image == this.sprites.jump.image) break;

      this.image = this.sprites.jump.image;
      this.maxFrames = this.sprites.jump.maxFrames;
      this.currentFrame = initialFrame;
      
      break;
    
    case 'fall':
      if (this.image == this.sprites.fall.image) break;

      this.image = this.sprites.fall.image;
      this.maxFrames = this.sprites.fall.maxFrames;
      this.currentFrame = initialFrame;
      
      break;
    
    case 'attack1':
      if (this.image == this.sprites.attack1.image) break;

      this.image = this.sprites.attack1.image;
      this.maxFrames = this.sprites.attack1.maxFrames;
      this.currentFrame = initialFrame;
      
      break;
    
    case 'attack2':
      if (this.image == this.sprites.attack2.image) break;
      this.image = this.sprites.attack2.image;
      this.maxFrames = this.sprites.attack2.maxFrames;
      this.currentFrame = initialFrame;

      setAttackHitbox(this, 'attack2');
      
      break;
  
    case 'takeHit':
      if (this.image == this.sprites.takeHit.image) break;
      
      this.image = this.sprites.takeHit.image;
      this.maxFrames = this.sprites.takeHit.maxFrames;
      this.currentFrame = initialFrame;

      if(this.cancelAttack) this.cancelAttack = false;
      
      break;
      
    case 'death':
      if (this.image == this.sprites.death.image) break;
      
      this.image = this.sprites.death.image;
      this.maxFrames = this.sprites.death.maxFrames;
      this.currentFrame = initialFrame;

      this.isDead();
      
      break;
  }
}