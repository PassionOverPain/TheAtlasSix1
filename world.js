function createMonster(options) {
	const template = document.createElement("template");

	template.innerHTML = `<div id="enemy${arrEnemies.length}" class="hero pgCard">
         <img src="${options.picture}" alt="This is a enemy player"  class="Enemy" data-ennumber="${arrEnemies.length}" />    
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
		// Index = Math.floor(Math.random() * 2);
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

// fetch("./memGame.json")
// 	.then((res) => res.json())
// 	.then((data) => {
// 		cards = [...data, ...data];
// 		shuffleCards();
// 		generateCards();
// 	});

// function shuffleCards() {
// 	let currentIndex = cards.length,
// 		randomIndex,
// 		temporaryValue;
// 	while (currentIndex != 0) {
// 		randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex -= 1;
// 		temporaryValue = cards[currentIndex];
// 		cards[currentIndex] = cards[randomIndex];
// 		cards[randomIndex] = temporaryValue;
// 	}
// }

// function generateCards() {
// 	for (let card of cards) {
// 		const cardElement = document.createElement("div");
// 		cardElement.classList.add("card");
// 		cardElement.setAttribute("data-name", card.name);
// 		cardElement.innerHTML = `
//         <div class="front">
//             <img class="front-image" src="${encodeURI(card.image)}" />
//         </div>
//         <div class="back"></div>`;
// 		memGameCon.appendChild(cardElement);
// 		cardElement.addEventListener("click", flipCard);
// 	}
// }

// function flipCard() {
// 	if (lockBoard) return;
// 	if (this === firstCard) return;

// 	this.classList.add("flipped");

// 	if (!firstCard) {
// 		firstCard = this;
// 		return;
// 	}

// 	secondCard = this;
// 	checkForMatch();
// }

// function checkForMatch() {
// 	let isMatch = firstCard.dataset.name === secondCard.dataset.name;

// 	isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
// 	firstCard.removeEventListener("click", flipCard);
// 	secondCard.removeEventListener("click", flipCard);
// 	score++;
// 	document.querySelector(".Score").textContent = score;
// 	resetBoard();
// }

// function unflipCards() {
// 	lockBoard = true; // Lock the board while the cards are unflipping
// 	setTimeout(() => {
// 		firstCard.classList.remove("flipped");
// 		secondCard.classList.remove("flipped");
// 		resetBoard();
// 	}, 1000);
// }

// function resetBoard() {
// 	[firstCard, secondCard] = [null, null];
// 	lockBoard = false;
// }

// function restart() {
// 	resetBoard();
// 	shuffleCards();
// 	score = 0;
// 	document.querySelector(".Score").textContent = score;
// 	memGameCon.innerHTML = "";
// 	generateCards();
// }

const memGameCon = document.querySelector(`.memGameCon`);
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let cards = [];
let attemptsLeft = 16;
document.querySelector(".Attempts").textContent = attemptsLeft;

fetch("./memGame.json")
	.then((res) => res.json())
	.then((data) => {
		cards = [...data, ...data];
		shuffleCards();
		generateCards();
	});

function shuffleCards() {
	let currentIndex = cards.length,
		randomIndex,
		temporaryValue;
	while (currentIndex != 0) {
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
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
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
displayModal(`This is how I look :)`);
function checkGameOver() {
	if (attemptsLeft === 0) {
		setTimeout(() => displayModal("Game Over! Try Again."), 500);
		restartMemGame();
	}
}

function restartMemGame() {
	resetBoard();
	shuffleCards();
	attemptsLeft = 15;
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
