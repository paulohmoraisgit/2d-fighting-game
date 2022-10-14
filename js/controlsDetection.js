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

window.addEventListener('keydown', (event) => {
	playerOneKeyDown(event.key);
	playerTwoKeyDown(event.key);
});

function playerOneKeyDown(key) {
	if(!playerOne.alive || playerOne.isDying()) return;

	switch(key) {
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
			if(!playerOne.isAttacking && !playerOne.isOnAttackCooldown) playerOne.attack('attack1');
			break;

		case 's':
			if(!playerOne.isAttacking) playerOne.attack('attack2');
			break;
	}
}

function playerTwoKeyDown(key) {
	if(!playerTwo.alive || playerTwo.isDying()) return;

	switch (key) {
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
			if(!playerTwo.isAttacking) playerTwo.attack('attack1');
			break;

		case 'ArrowDown':
			if(!playerTwo.isAttacking) playerTwo.attack('attack2');
			break;
	}
}

window.addEventListener('keyup', (event) => {
	playerOneKeyUp(event.key);
	playerTwoKeyUp(event.key);
});

function playerOneKeyUp(key) {
	switch(key) {
		case 'a':
			keys.a.pressed = false;
			break;

		case 'd':
			keys.d.pressed = false;
			break;

		case 'w':
			keys.w.pressed = false;
			break;
	}
}

function playerTwoKeyUp(key) {
	switch(key) {			
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
}