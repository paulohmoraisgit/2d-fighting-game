const canvas = document.querySelector('canvas');
const viewport = canvas.getContext('2d');

canvas.width = 926;
canvas.height = 526;

viewport.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.7;

class Sprite {
	constructor({identifier, position, velocity, color}) {
		this.identifier = identifier;

		this.position = position;
		this.velocity = velocity;

		this.width = 50;
		this.height = 150;

		this.positionXPlusSize = this.position.x + this.width;
		this.positionYPlusSize = this.position.y + this.height;

		this.collision = {
			x: 0,
			y: 0
		}

		this.color = color;

		this.moveSpeed = 5;
		this.jumpForce = 20;

		this.attackHitbox = {
			position: this.position,
			width: 100,
			height: 50
		}

		this.lastKey;
		this.isJumping = false;
	}

	draw () {
		viewport.fillStyle = this.color;
		viewport.fillRect(this.position.x, this.position.y, this.width, this.height);

		viewport.fillStyle = 'green';
		viewport.fillRect(
			this.attackHitbox.position.x,
			this.attackHitbox.position.y,
			this.attackHitbox.width,
			this.attackHitbox.height
		);
	}

	update () {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		this.positionXPlusSize = this.position.x + this.width;
		this.positionYPlusSize = this.position.y + this.height;

		if (this.position.x <= 0) {
			this.velocity.x = 0;
			this.position.x = 0;
		} else if (this.positionXPlusSize >= canvas.width) {
			this.velocity.x = 0;
			this.position.x = canvas.width - this.width;
		}

		if (this.positionYPlusSize >= canvas.height) {
			this.velocity.y = 0;
			this.position.y = canvas.height - this.height;

			this.isJumping = false;
		} else {
			this.velocity.y += GRAVITY;
		}

		this.attackHitbox.position.x = this.position.x;
		this.attackHitbox.position.y = this.position.y;

		this.draw();
	}
}

const player = new Sprite (
	{
		identifier: "Player",
		position: {
			x: 0,
			y: 0
		},
		velocity: {
			x: 0,
			y: 0
		},
		color: 'blue'
	}
)

player.draw();

const enemy = new Sprite (
	{
		identifier: "Enemy",
		position: {
			x: 400,
			y: 50
		},
		velocity: {
			x: 0,
			y: 0
		},
		color: 'red'
	}
)

enemy.draw();

const keys = {
	a: {
		pressed: false
	},
	d: {
		pressed: false
	},
	w: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	},
	ArrowUp: {
		pressed: false
	}
}

function main () {
	window.requestAnimationFrame(main);

	viewport.fillStyle = 'black';
	viewport.fillRect(0, 0, canvas.width, canvas.height);

	player.update();
	enemy.update();

	entitiesMovement();
	hitboxesCollision();
}

function entitiesMovement () {
	player.velocity.x = 0;
	enemy.velocity.x = 0;

	if(keys.a.pressed && player.lastKey == 'a') {
		player.velocity.x = -player.moveSpeed;
	}
	
	if (keys.d.pressed && player.lastKey == 'd') {
		player.velocity.x = player.moveSpeed;
	}

	if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft') {
		enemy.velocity.x = -enemy.moveSpeed;
	}
	
	if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
		enemy.velocity.x = enemy.moveSpeed;
	}
}

function hitboxesCollision () {
	if((player.attackHitbox.position.x + player.attackHitbox.width) >= enemy.position.x
	&& player.attackHitbox.position.x <= (enemy.positionXPlusSize)
	&& (player.attackHitbox.position.y + player.attackHitbox.height) >= enemy.position.y) {
		console.log('test');
	}
}

main();

window.addEventListener('keydown', (event) => {
	switch(event.key) {
		case 'a':
			keys.a.pressed = true;
			player.lastKey = 'a';
			break;

		case 'd':
			keys.d.pressed = true;
			player.lastKey = 'd';
			break;

		case 'w':
			if(player.isJumping) break;

			player.velocity.y = -player.jumpForce;
			player.isJumping = true;
			break;

		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true;
			enemy.lastKey = 'ArrowLeft';
			break;

		case 'ArrowRight':
			keys.ArrowRight.pressed = true;
			enemy.lastKey = 'ArrowRight';
			break;

		case 'ArrowUp':
			if(enemy.isJumping) break;

			enemy.velocity.y = -enemy.jumpForce;
			enemy.isJumping = true;
			break;
	}
});

window.addEventListener('keyup', (event) => {
	switch(event.key) {
		case 'a':
			keys.a.pressed = false;
			break;

		case 'd':
			keys.d.pressed = false;
			break;

		case 'w':
			keys.w.pressed = false;
			break;
			
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false;
			break;

		case 'ArrowRight':
			keys.ArrowRight.pressed = false;
			break;

		case 'ArrowUp':
			keys.ArrowUp.pressed = false;
			break;
	}
});