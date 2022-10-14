function AttackHitboxesDetection() {
	AttackHitboxDetection(playerOne, playerTwo);
	AttackHitboxDetection(playerTwo, playerOne);
}

function AttackHitboxDetection(playerA, playerB) {
	if (playerA.isAttacking && isOnAttackDamageFrames(playerA) && isTargetInAttackRange({
		attacker: playerA,
		target: playerB
		})
	) {
		playerA.isAttacking = false;
		playerB.takeHit();

		updateHealthbar(playerB);
	}
	
	if(playerA.isAttacking && playerA.currentFrame >= playerA.attackDamageFrames.max) {
		playerA.isAttacking = false;
	}
}

function isOnAttackDamageFrames(player) {
	return player.currentFrame >= player.attackDamageFrames.min && player.currentFrame <= player.attackDamageFrames.max;
}

function isTargetInAttackRange({attacker, target}) {
	return ((attacker.attackHitbox.position.x + attacker.attackHitbox.width) >= target.position.x
		&& attacker.attackHitbox.position.x <= target.positionXPlusSize
		&& (attacker.attackHitbox.position.y + attacker.attackHitbox.height) >= target.position.y
		&& attacker.attackHitbox.position.y <= target.positionYPlusSize);
}

function setAttackDamageFrames(player, attack) {
	player.attackDamageFrames = player.sprites[attack].attackDamageFrames;
}

function setAttackHitbox(player, attack) {
	player.attackHitbox.offset = player.sprites[attack].attackHitbox.offset;
	player.attackHitbox.width = player.sprites[attack].attackHitbox.width;
	player.attackHitbox.height = player.sprites[attack].attackHitbox.height;
}