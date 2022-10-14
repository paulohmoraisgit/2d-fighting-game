Character.prototype.updateHitboxPosition = function() {
  this.attackHitbox.position.x = this.position.x + this.attackHitbox.offset.x;
  this.attackHitbox.position.y = this.position.y + this.attackHitbox.offset.y;

  // ***** Hitbox visualization *****
  // canvas2d.fillStyle = 'green';
  // canvas2d.fillRect(
  // 	this.attackHitbox.position.x,
  // 	this.attackHitbox.position.y,
  // 	this.attackHitbox.width,
  // 	this.attackHitbox.height
  // );
  // ********************************
}

Character.prototype.attack = function (attackName) {
  setAttackDamageFrames(this, attackName);
  setAttackHitbox(this, attackName);

  this.switchSprite(attackName);
  this.isAttacking = true;

  this.cooldownAttack(attackName);
}

Character.prototype.cooldownAttack = function (attackName) {
  this.attackCooldown = this.sprites[attackName].attackCooldown;
  if(this.attackCooldown == 0) return;

  this.isOnAttackCooldown = true;

  setTimeout(() => {
    this.isOnAttackCooldown = false;
  }, this.attackCooldown);
}

Character.prototype.takeHit = function () {
  this.health -= 10;

  if(this.isAttacking) {
    this.isAttacking = false;
    this.cancelAttack = true;
  }

  if (this.health > 0) {
    this.switchSprite('takeHit');
  } else {
    this.switchSprite('death');
  }
}