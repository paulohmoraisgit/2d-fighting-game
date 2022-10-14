class Character extends Sprite {
	constructor({
    position,
		width = 50,
		height = 150,
    imageSource,
    sprites,
    scale = 1,
    spritePositionOffset,
    maxFrames = 1,
    velocity,
		moveSpeed = 5
  }) {
    super({
      position,
      positionOffset: spritePositionOffset,
      imageSource,
      scale,
      maxFrames
    });

		this.position = position;

		this.width = width;
		this.height = height;

		this.positionXPlusSize = this.position.x + this.width;
		this.positionYPlusSize = this.position.y + this.height;


    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSource;
    }

		this.movementBlocker = {
			left: false,
			right: false,
			down: false,
			leftMapEdge: false,
			rightMapEdge: false
		}

		this.velocity = velocity;
		this.moveSpeed = moveSpeed;
		this.jumpForce = 20;
		
		this.isOverSomething = false;

		this.health = 100;
		this.alive = true;

		this.attackHitbox = {
			position: {
				x: 0,
				y: 0
			},
			offset: {
				x: 0,
				y: 0
			},
			width: 0,
			height: 0
		}

		this.setAttackDamageFrames = {
			min: 0,
			max: 0
		};

		this.isOnAttackCooldown = false;
		this.attackCooldown = 0;

		this.cancelAttack = false;

		this.lastKey = '';
		this.isJumping = false;
		this.isAttacking = false;
	}

	update() {
		this.updateMovement();
		this.updateHitboxPosition();
		this.draw();
		if(this.alive) this.animate();
	}

	isDying() {
		return this.image == this.sprites.death.image;
	}

	isDead() {
		if(this.isAttacking) this.isAttacking = false;
	}
}