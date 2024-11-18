function createMonster(options) {
	const template = document.createElement("template");

	template.innerHTML = `<div id="enemy${arrEnemies.length}" class="pgCard">
         <img src="${options.picture}" alt="This is a enemy player"  class="Enemy enemyCard" data-ennumber="${arrEnemies.length}"  id="enemy${arrEnemies.length}img"/>    
          </div>`;

	const monster = template.content.firstElementChild;
	return monster;
}
function newMonster(Index) {
	let monsterCon = document.getElementById("monstersCon");
	const myMonster = createMonster({
		picture: `Images/${myMonsters[Index].Name}.webp`,
	});
	if (arrEnemies.length == 0) {
		monsterCon.replaceChildren();
	}
	if (arrEnemies.length == 5) {
		monsterCon.style.gridTemplateColumns = `auto auto`;
	}
	monsterCon.appendChild(myMonster);
}
let arrEnemies = [];
function creationMonster(Index) {
	if (arrEnemies.length < 10) {
		let myMonster = new Monster(Index);
		arrEnemies.push(myMonster);
	}
}
class Monster {
	constructor(Index) {
		this.Index = Index;
		this.Hp = myMonsters[Index].Hp;
		newMonster(Index);
	}

	damageHealth(damage) {
		this.Hp = this.Hp - damage;
	}
	healHealth(points) {
		Hp = Hp + points;
	}
}

const memGameCon = document.querySelector(`.memGameCon`);
let firstCard, secondCard;
let lockBoard = false;
let cards = [];
let attemptsLeft = 20;
let matchedPairs = 0;
let cheat = false;

// Display attempts left
document.querySelector(".Attempts").textContent = attemptsLeft;

function startMemoryGame() {
	document.querySelector("#memGame").style.display = "block";
	document.querySelector(".memoryCon").style.display = "block";
	let playground = document.getElementById("playground");
	playground.style.justifyContent = "center";
	if (!cheat) {
		attemptsLeft = 20;
	}
	matchedPairs = 0;
	document.querySelector(".Attempts").textContent = attemptsLeft;
	memGameCon.innerHTML = ""; // Clear previous cards

	// Fetch card data and initialize the game
	fetch("./memGame.json")
		.then((res) => res.json())
		.then((data) => {
			cards = [...data, ...data];
			shuffleCards();
			generateCards();
		});
}

function shuffleCards() {
	let currentIndex = cards.length,
		randomIndex,
		temporaryValue;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
	}
}

function generateCards() {
	for (let card of cards) {
		const cardElement = document.createElement("div");
		cardElement.classList.add("card");
		cardElement.setAttribute("data-name", card.name);
		cardElement.innerHTML = ` 
        <div class="front">
            <img class="front-image" src="${encodeURI(card.image)}" />
        </div>
        <div class="back"></div>`;
		memGameCon.appendChild(cardElement);
		cardElement.addEventListener("click", flipCard);
	}
}

function flipCard() {
	if (lockBoard || attemptsLeft === 0) return;
	if (this === firstCard) return;

	this.classList.add("flipped");

	if (!firstCard) {
		firstCard = this;
		return;
	} else {
		secondCard = this;
		attemptsLeft--;
		document.querySelector(".Attempts").textContent = attemptsLeft;

		checkForMatch();
		checkGameOver();
	}
}

function checkForMatch() {
	let isMatch = firstCard.dataset.name === secondCard.dataset.name;
	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	const correctSound = new Audio("Audio/Effects/Correct.mp3");
	correctSound.currentTime = 0;
	correctSound.play();
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
	matchedPairs++;
	if (matchedPairs === 9) {
		displayModal("Victory Achieved");
		document.querySelector(`.memoryCon`).style.display = "none";
		document.querySelector("#memGame").style.display = "none";
		displayStory();
	}
}

function unflipCards() {
	setTimeout(() => {
		firstCard.classList.remove("flipped");
		secondCard.classList.remove("flipped");
		resetBoard();
	}, 1000);
}

function resetBoard() {
	firstCard = null;
	secondCard = null;
	lockBoard = false;
}

function checkGameOver() {
	if (attemptsLeft === 0) {
		displayModal("Game Over! Try Again.");
		restartMemGame();
	}
}

function restartMemGame() {
	resetBoard();
	shuffleCards();
	if (!cheat) {
		attemptsLeft = 20;
	}
	matchedPairs = 0;
	document.querySelector(".Attempts").textContent = attemptsLeft;
	memGameCon.innerHTML = "";
	generateCards();
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.Model Stuff <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,

function displayModal(text) {
	const modal = document.getElementById("customModal");
	const modalText = document.getElementById("modalText");
	modalText.textContent = text;
	modal.classList.remove("hidden");
}

function closeModal() {
	document.getElementById("customModal").classList.add("hidden");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Battle Events And Effects <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function triggerAttack(enemyId, gifSrc) {
	const enemyDiv = document.getElementById(`enemy${enemyId}`);

	// Create an img element for the attack effect
	const attackEffect = document.createElement("img");
	attackEffect.src = gifSrc;
	attackEffect.classList.add("attack-gif");
	attackEffect.style.width = "400%";

	attackEffect.onload = () => {
		setTimeout(() => {
			attackEffect.remove();
		}, 3000);
	};

	enemyDiv.appendChild(attackEffect);
}

//////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Goblin Slayer Mini Game :) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8; ///Here ??

const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let score = 0;
let time = 60;
let goblins = [];
let bombs = [];
let isGameOver = false;
let gameInterval, timerInterval;
let mouseDown = false;
let trail = [];
let bloodParticles = [];
let explosionParticles = [];

const bombImage = new Image();
bombImage.src = "Images/Assets/bomb.png";

class Goblin {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 260;
		this.isSliced = false;
		this.life = 180; // 3 seconds at 60fps (180 frames)
		this.image = new Image();
		this.image.src = `Images/Characters/Goblin${getRandomNumber()}.png`;
	}

	draw() {
		if (!this.isSliced) {
			ctx.drawImage(
				this.image,
				this.x - this.size / 2,
				this.y - this.size / 2,
				this.size,
				this.size
			);
			this.life--;
		} else {
			drawBlood(this.x, this.y);
		}
	}
}

function getRandomNumber() {
	return Math.floor(Math.random() * 5) + 1;
}

class Bomb {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 180;
		this.isSliced = false;
		this.life = 180; // 3 seconds at 60fps (180 frames)
	}

	draw() {
		if (!this.isSliced) {
			ctx.drawImage(
				bombImage,
				this.x - this.size / 2,
				this.y - this.size / 2,
				this.size,
				this.size
			);
			this.life--;
		}
	}
}

class BloodParticle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 5 + 3; // Initial size of each particle
		this.velocityX = (Math.random() - 0.5) * 4; // Random x-direction
		this.velocityY = (Math.random() - 0.5) * 4; // Random y-direction
		this.life = 30; // Particle life in frames
		this.alpha = 1; // Initial opacity
	}

	update() {
		this.x += this.velocityX;
		this.y += this.velocityY;
		this.size *= 0.95; // Shrinks over time
		this.alpha -= 0.03; // Gradually fades
		this.life--;
	}

	draw() {
		ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

class ExplosionParticle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 10 + 5; // Initial size of explosion particles
		this.velocityX = (Math.random() - 0.5) * 6;
		this.velocityY = (Math.random() - 0.5) * 6;
		this.life = 30; // Particle life in frames
		this.alpha = 1;
	}

	update() {
		this.x += this.velocityX;
		this.y += this.velocityY;
		this.size *= 0.95; // Shrinks over time
		this.alpha -= 0.05; // Fade faster
		this.life--;
	}

	draw() {
		ctx.fillStyle = `rgba(0, 255, 0, ${this.alpha})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function spawnGoblin() {
	const x = Math.random() * (canvas.width - 50) + 25;
	const y = Math.random() * (canvas.height - 50) + 25;
	goblins.push(new Goblin(x, y));

	if (Math.random() < 0.5) {
		const bombX = Math.random() * (canvas.width - 50) + 25;
		const bombY = Math.random() * (canvas.height - 50) + 25;
		bombs.push(new Bomb(bombX, bombY));
	}
}

function startGoblinGame() {
	resetGoblinGame();
	isGameOver = false;
	document.getElementById("goblinSlayerCon").style.display = "flex";
	gameInterval = setInterval(spawnGoblin, 500);
	timerInterval = setInterval(updateTimer, 1000);
	startBtn.style.display = "none";
	resetBtn.style.display = "inline";
	gameLoop();
}

function resetGoblinGame() {
	clearInterval(gameInterval);
	clearInterval(timerInterval);
	score = 0;
	time = 60;
	goblins = [];
	bombs = [];
	isGameOver = false;
	scoreElement.innerText = `Score: ${score}`;
	timerElement.innerText = `Time: ${time}`;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	trail = [];
	bloodParticles = [];
}

function endGoblinGame() {
	isGameOver = true;
	clearInterval(gameInterval);
	clearInterval(timerInterval);
	startBtn.style.display = "inline";
	resetBtn.style.display = "none";
	document.getElementById("goblinSlayerCon").style.display = "none";
}

function updateTimer() {
	if (time > 0) {
		time--;
		timerElement.innerText = `Time: ${time}`;
	} else {
		if (score >= 50) {
			displayModal(`Victory Achieved: Goblin horde slain.`);
			resetGoblinGame();
			endGoblinGame();
			++currentBranch;
			displayStory();
		} else {
			displayModal(`Battle Lost: You succumb to the horde.`);
			resetGoblinGame();
		}
		endGoblinGame();
	}
}

canvas.addEventListener("mousedown", () => {
	mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
	mouseDown = false;
	trail = [];
});

canvas.addEventListener("mousemove", (event) => {
	if (mouseDown && !isGameOver) {
		const { offsetX, offsetY } = event;
		trail.push({ x: offsetX, y: offsetY, life: 10 });

		goblins.forEach((goblin, index) => {
			const dist = Math.hypot(goblin.x - offsetX, goblin.y - offsetY);
			if (dist < goblin.size / 2 && !goblin.isSliced) {
				goblin.isSliced = true;
				score++;
				scoreElement.innerText = `Score: ${score}`;
				goblins.splice(index, 1);

				// Generate blood particles at goblin's position
				for (let i = 0; i < 10; i++) {
					bloodParticles.push(new BloodParticle(goblin.x, goblin.y));
				}
			}
		});

		bombs.forEach((bomb, index) => {
			const dist = Math.hypot(bomb.x - offsetX, bomb.y - offsetY);
			if (dist < bomb.size / 2 && !bomb.isSliced) {
				bomb.isSliced = true;
				score -= 3;
				scoreElement.innerText = `Score: ${score}`;
				bombs.splice(index, 1);

				// Generate explosion particles at bomb's position
				for (let i = 0; i < 20; i++) {
					explosionParticles.push(new ExplosionParticle(bomb.x, bomb.y));
				}
			}
		});
	}
});

function drawTrail() {
	ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
	ctx.lineWidth = 4;
	ctx.beginPath();
	trail.forEach((point, i) => {
		ctx.lineTo(point.x, point.y);
		point.life--;
		if (point.life <= 0) trail.splice(i, 1);
	});
	ctx.stroke();
}

function drawBlood(x, y) {
	ctx.fillStyle = "red";
	for (let i = 0; i < 8; i++) {
		const offsetX = (Math.random() - 0.5) * 20;
		const offsetY = (Math.random() - 0.5) * 20;
		ctx.beginPath();
		ctx.arc(x + offsetX, y + offsetY, 3, 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawExplosion() {
	explosionParticles.forEach((particle, index) => {
		particle.update();
		particle.draw();
		if (particle.life <= 0) explosionParticles.splice(index, 1);
	});
}

function gameLoop() {
	if (!isGameOver) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw and update goblins
		goblins.forEach((goblin, index) => {
			goblin.draw();
			if (goblin.life <= 0) goblins.splice(index, 1);
		});

		// Draw and update bombs
		bombs.forEach((bomb, index) => {
			bomb.draw();
			if (bomb.life <= 0) bombs.splice(index, 1);
		});
		drawExplosion();
		// Update and draw blood particles
		bloodParticles.forEach((particle, index) => {
			particle.update();
			particle.draw();
			if (particle.life <= 0) bloodParticles.splice(index, 1);
		});

		drawTrail();
		requestAnimationFrame(gameLoop);
	}
}

startBtn.addEventListener("click", startGoblinGame);
resetBtn.addEventListener("click", () => {
	resetGoblinGame();
	startGoblinGame();
});
