const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

const canvas2d = canvas.getContext('2d');

const ground = canvas.height - 95;
const gravity = 0.7;

let timer = 60;
let timerTimeoutId;

let timeToRestartGame = 5000;

function decreaseTimer() {
	if(timer == 0) {
		determinateWinner();
		return;
	}

	timer--;
	document.querySelector('#timer').innerHTML = timer;
	timerTimeoutId = setTimeout(decreaseTimer, 1000);
}

function updateHealthbar(player) {
	if(player == playerOne) healthElement = document.querySelector('#player-one-health');
	else healthElement = document.querySelector('#player-two-health');

	gsap.to(healthElement, {
		width: player.health + '%'
	});
}

function playerHealthChecker() {
	if (playerOne.health <= 0 || playerTwo.health <= 0) determinateWinner();
}

function determinateWinner() {
	clearTimeout(timerTimeoutId);

	winTextElement = document.querySelector('#win-text');
	winTextElement.style.display = 'flex';

	if (playerOne.health > playerTwo.health) {
		winTextElement.innerHTML = 'Player One WINS!';
	} else if (playerTwo.health > playerOne.health) {
		winTextElement.innerHTML = 'Player Two WINS!';
	} else {
		winTextElement.innerHTML = 'Tie!';
	}

	if(!isRestarting) restartGame();
}

let isRestarting = false;

function restartGame() {
	setTimeout(() => {
		window.location.reload();
	}, timeToRestartGame);

	isRestarting = true;
}