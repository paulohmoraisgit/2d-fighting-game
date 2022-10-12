const canvas = document.querySelector('canvas');
const viewport = canvas.getContext('2d');

canvas.width = 940;
canvas.height = 550;

viewport.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.7;

class Sprite {
	constructor({identifier, position, velocity, color, attackHitboxOffset}) {
		this.identifier = identifier;

		this.position = position;
		this.velocity = velocity;

		this.width = 50;
		this.height = 150;

		this.positionXPlusSize = this.position.x + this.width;
		this.positionYPlusSize = this.position.y + this.height;

		this.movementBlocker = {
			left: false,
			right: false
		}

		this.color = color;

		this.moveSpeed = 5;
		this.jumpForce = 20;

		this.health = 100;

		this.attackHitbox = {
			position: {
				x: 0,
				y: 0
			},
			offset: attackHitboxOffset,
			width: 100,
			height: 50
		}

		this.lastKey = '';
		this.isJumping = false;
		this.isAttacking = false;
	}

	update () {
		this.updateMovement();
		this.updateHitboxPosition();
		this.draw();
	}

	updateMovement() {
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
	}

	updateHitboxPosition () {
		this.attackHitbox.position.x = this.position.x + this.attackHitbox.offset.x;
		this.attackHitbox.position.y = this.position.y + this.attackHitbox.offset.y;
	}

	draw () {
		viewport.fillStyle = this.color;
		viewport.fillRect(this.position.x, this.position.y, this.width, this.height);

		if(this.isAttacking) {
			viewport.fillStyle = 'green';
			viewport.fillRect(
				this.attackHitbox.position.x,
				this.attackHitbox.position.y,
				this.attackHitbox.width,
				this.attackHitbox.height
			);
		}
	}

	attack () {
		this.isAttacking = true;

		setTimeout(() => {
			this.isAttacking = false;
		}, 200);
	}
}

const playerOne = new Sprite (
	{
		identifier: "Player One",
		position: {
			x: 0,
			y: 0
		},
		velocity: {
			x: 0,
			y: 0
		},
		color: 'blue',
		attackHitboxOffset: {
			x: 0,
			y: 0
		}
	}
)

playerOne.draw();

const playerTwo = new Sprite (
	{
		identifier: "Player Two",
		position: {
			x: 400,
			y: 0
		},
		velocity: {
			x: 0,
			y: 0
		},
		color: 'red',
		attackHitboxOffset: {
			x: -50,
			y: 0
		}
	}
)

playerTwo.draw();

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

	playerOne.update();
	playerTwo.update();

	playersMovement();
	hitboxesCollision();
}

function playersMovement() {
	playerOne.velocity.x = 0;
	playerTwo.velocity.x = 0;

	if (keys.a.pressed && playerOne.lastKey == 'a' && !playerOne.movementBlocker.left) {
		playerOne.velocity.x = -playerOne.moveSpeed;
	}
	
	if (keys.d.pressed && playerOne.lastKey == 'd' && !playerOne.movementBlocker.right) {
		playerOne.velocity.x = playerOne.moveSpeed;
	}

	if (keys.ArrowLeft.pressed && playerTwo.lastKey == 'ArrowLeft') {
		playerTwo.velocity.x = -playerTwo.moveSpeed;
	}
	
	if (keys.ArrowRight.pressed && playerTwo.lastKey == 'ArrowRight') {
		playerTwo.velocity.x = playerTwo.moveSpeed;
	}
}

function hitboxesCollision() {
	if (playerOne.isAttacking && isTargetInAttackRange({
		attacker: playerOne,
		target: playerTwo
		})
	) {
		playerOne.isAttacking = false;

		playerTwo.health -= 10;
		document.querySelector('#player-two-health').style.width = playerTwo.health + '%';

		if(playerTwo.health <= 0) showWinner();
	}

	if (playerTwo.isAttacking && isTargetInAttackRange({
		attacker: playerTwo,
		target: playerOne
		})
	) {
		playerTwo.isAttacking = false;

		playerOne.health -= 10;
		document.querySelector('#player-one-health').style.width = playerOne.health + '%';

		if(playerOne.health <= 0) showWinner();
	}
}

function isTargetInAttackRange({attacker, target}) {
	return ((attacker.attackHitbox.position.x + attacker.attackHitbox.width) >= target.position.x
		&& attacker.attackHitbox.position.x <= target.positionXPlusSize
		&& (attacker.attackHitbox.position.y + attacker.attackHitbox.height) >= target.position.y
		&& attacker.attackHitbox.position.y <= target.positionYPlusSize);
}

main();

let timer = 60;
function decreaseTimer() {
	if(timer == 0) {
		showWinner();
		return;
	}

	timer--;
	document.querySelector('#timer').innerHTML = timer;

	setTimeout(decreaseTimer, 1000);
}

decreaseTimer();

function showWinner() {
	winTextElement = document.querySelector('#win-text');
	winTextElement.style.display = 'flex';

	if (playerOne.health > playerTwo.health) {
		winTextElement.innerHTML = 'Player One WINS!';
	} else if (playerTwo.health > playerOne.health) {
		winTextElement.innerHTML = 'Player Two WINS!';
	} else {
		winTextElement.innerHTML = 'Tie!';
	}
}

window.addEventListener('keydown', (event) => {
	switch(event.key) {
		case 'a':
			keys.a.pressed = true;
			playerOne.lastKey = 'a';
			break;

		case 'd':
			keys.d.pressed = true;
			playerOne.lastKey = 'd';
			break;

		case 'w':
			if(playerOne.isJumping) break;

			playerOne.velocity.y = -playerOne.jumpForce;
			playerOne.isJumping = true;
			break;

		case ' ':
			if(!playerOne.isAttacking) playerOne.attack();
			break;

		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true;
			playerTwo.lastKey = 'ArrowLeft';
			break;

		case 'ArrowRight':
			keys.ArrowRight.pressed = true;
			playerTwo.lastKey = 'ArrowRight';
			break;

		case 'ArrowUp':
			if(playerTwo.isJumping) break;

			playerTwo.velocity.y = -playerTwo.jumpForce;
			playerTwo.isJumping = true;
			break;

			case 'Enter':
				if(!playerTwo.isAttacking) playerTwo.attack();
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