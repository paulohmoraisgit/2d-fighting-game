function playersMovement() {
	playerOneMovement();
	playerTwoMovement();
}

function playerOneMovement() {
	if (keys.a.pressed && playerOne.lastKey == 'a'
	&& !playerOne.movementBlocker.left && !playerOne.movementBlocker.leftMapEdge) {
		moveLeft(playerOne);
	}
	else if (keys.d.pressed && playerOne.lastKey == 'd'
	&& !playerOne.movementBlocker.right && !playerOne.movementBlocker.rightMapEdge) {
		moveRight(playerOne);
	}
	else {
		idle(playerOne);
	}

	verticalMovement(playerOne);
	playerCollideWithOtherPlayer(playerOne, playerTwo);
}

function playerTwoMovement() {
	if (keys.ArrowLeft.pressed && playerTwo.lastKey == 'ArrowLeft'
	&& !playerTwo.movementBlocker.left && !playerTwo.movementBlocker.leftMapEdge) {
		moveLeft(playerTwo);
	}
	else if (keys.ArrowRight.pressed && playerTwo.lastKey == 'ArrowRight'
	&& !playerTwo.movementBlocker.right && !playerTwo.movementBlocker.rightMapEdge) {
		moveRight(playerTwo);
	} else {
		idle(playerTwo);
	}

	verticalMovement(playerTwo);
	playerCollideWithOtherPlayer(playerTwo, playerOne);
}

function moveLeft(player) {
	player.velocity.x = -player.moveSpeed;
	player.switchSprite('run');
}

function moveRight(player) {
	player.velocity.x = player.moveSpeed;
	player.switchSprite('run');
}

function idle(player) {
	player.velocity.x = 0;
	player.switchSprite('idle');
}

function verticalMovement(player) {
	if (player.velocity.y < 0) {
		player.switchSprite('jump');
	}
	else if (player.velocity.y > 0) {
		player.switchSprite('fall');
	}
}

function playerCollideWithOtherPlayer(playerA, playerB) {
	if(isPlayerInsideEachOther(playerA, playerB)) {
		if(playerA.positionYPlusSize <= playerB.position.y) {
			playerA.position.y = playerB.position.y - playerA.height;
			playerA.movementBlocker.down = true;

			playerA.velocity.y = 0;
			playerA.isJumping = false;
		} else {
			if((playerA.position.x + playerA.width / 2) < (playerB.position.x + playerB.width / 2)) {
				playerA.position.x = playerB.position.x - playerA.width;
				playerA.movementBlocker.right = true;
			} else {
				playerA.position.x = playerB.positionXPlusSize;
				playerA.movementBlocker.left = true;
			}
		
			playerA.velocity.x = 0;
		}
	} else {
		if (isNotCloseToOtherPlayer(playerA, playerB)) {
			playerA.movementBlocker.down = false;
			playerA.movementBlocker.left = false;
			playerA.movementBlocker.right = false;
		}
	}
}

function isPlayerInsideEachOther(playerA, playerB) {
	return (playerA.positionXPlusSize + playerA.velocity.x) > playerB.position.x
		&& (playerA.position.x + playerA.velocity.x) < playerB.positionXPlusSize
		&& (playerA.positionYPlusSize + playerA.velocity.y) > playerB.position.y
		&& (playerA.position.y + playerA.velocity.y) < playerB.positionYPlusSize;
}

function isNotCloseToOtherPlayer(playerA, playerB) {
	return (playerA.positionXPlusSize + playerA.velocity.x) < playerB.position.x
	|| (playerA.position.x + playerA.velocity.x) > playerB.positionXPlusSize
	|| (playerA.positionYPlusSize + playerA.velocity.y) < playerB.position.y
	|| (playerA.position.y + playerA.velocity.y) > playerB.positionYPlusSize
	|| playerB.isJumping;
}