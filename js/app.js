const background = new Sprite (
	{
		position: {
			x: 0,
			y: 0
		},
		imageSource: 'img/background.png'
	}
)

const shop = new Sprite (
	{
		position: {
			x: 620,
			y: 127
		},
		imageSource: 'img/shop.png',
		scale: 2.75,
		maxFrames: 6
	}
)

function main () {
	window.requestAnimationFrame(main);

	background.update();
	shop.update();

	playerOne.update();
	playerTwo.update();

	playersMovement();
	AttackHitboxesDetection();

	playerHealthChecker();
}

main();
decreaseTimer();