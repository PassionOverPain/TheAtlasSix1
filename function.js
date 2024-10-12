/** @format */

function openTab(tab, hero) {
	if (tab == "Info") {
		document.getElementById(`${hero}Stats`).classList.remove("active");
		document.getElementById(`${hero}Info`).classList.add("active");
	} else {
		document.getElementById(`${hero}Info`).classList.remove("active");
		document.getElementById(`${hero}Stats`).classList.add("active");
	}
}
function displayInfo(choice, hero) {
	if (choice == "open") {
		document.getElementById(`${hero}Desc`).style.display = "grid";
		document.getElementById(`${hero}Desc`).classList.remove("sleeps");
		document.getElementById(`${hero}Desc`).classList.add("awakes");
	} else {
		document.getElementById(`${hero}Desc`).classList.remove("awakes");
		document.getElementById(`${hero}Desc`).classList.add("sleeps");
		setTimeout(function () {
			document.getElementById(`${hero}Desc`).style.display = "none";
		}, 3000);
	}
}
let myMonsters;
let myHeroes;
let openMap = false;

//Either open the map or close the map
function displayMap() {
	if (openMap == false) {
		openMap = true;
		document.getElementById("thisMap").style.display = "block";
	} else {
		openMap = false;
		document.getElementById("thisMap").style.display = "none";
	}
}
var loader = document.getElementById("preloader");
window.addEventListener("load", function (load) {
	// Lazy Loading :) //
	this.window.removeEventListener("load", load, false);
	getHeroes();
	getMonsters();
	this.setTimeout(function () {
		loader.style.display = "none";
		this.document.body.style.cursor = "url(Images/swordcursor1.png), auto";
		this.document.body.style.overflowY = "scroll";
	}, 4000);
});

var observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} //else {
		// entry.target.classList.remove("show");
		// } ...Optional
	});
});
var hiddenElements = document.querySelectorAll(
	".nrC, .hrC, .tnC, .eeC, .pxC, .tkC"
);
hiddenElements.forEach((el) => observer.observe(el));

function createButton(options) {
	const template = document.createElement("template");

	template.innerHTML = `<button type="button">${options.label}</button>`;

	const button = template.content.firstElementChild;
	return button;
}
function newButton() {
	const myButton = createButton({
		label: "Slayyy", //Need To Remove Whatever This Is
	});
	document.getElementById("pgBtns").appendChild(myButton);
}

let gotHeroes = false;
let gotMonsters = false;
let textBubble = document.getElementById("pgCenter");

//Load Atlas Six Hero data
function getHeroes() {
	fetch("./heroes.json")
		.then((response) => response.json())
		.then((values) => (myHeroes = values));
	gotHeroes = true;
}
//Load Monster Data
function getMonsters() {
	fetch("./monsters.json")
		.then((response) => response.json())
		.then((values) => (myMonsters = values));
	gotMonsters = true;
}
let num = -1;
function openScroll(charNum) {
	num = charNum;
	if (!gotHeroes) {
		getHeroes();
	}
	if (!gotMonsters) {
		getMonsters();
	}
	openAttacks();
	let actionsCon = document.getElementById("actions");
	switch (num) {
		case 0: {
			actionsCon.style.backgroundColor = `rgba(3, 93, 145, 0.199)`;
			break;
		}
		case 1: {
			actionsCon.style.backgroundColor = `rgba(56, 34, 4, 0.199)`;
			break;
		}
		case 2: {
			actionsCon.style.backgroundColor = `rgba(27, 1, 75, 0.199)`;
			break;
		}
		case 3: {
			actionsCon.style.backgroundColor = `rgba(255, 0, 0, 0.199)`;
			break;
		}
		case 4: {
			actionsCon.style.backgroundColor = `rgba(145, 105, 7, 0.199)`;
			break;
		}
	}

	document.getElementById("storyTeller").style.display = "block";
	document.getElementById("pgCenter").style.display = "none";
	document.getElementById("currentTitle").textContent = `${myHeroes[num].Name}`;
	document.getElementById("heDesc").style.display = `none`;
	document.getElementById("heAttacks").style.display = `none`;
	document.getElementById("msDescTab").style.display = `none`;
	document.getElementById("heStats").style.display = `block `;
	if (myHeroes[num].Hp <= 0) {
		document.getElementById("Hp").textContent = `Hp: 0/${myHeroes[num].maxHp}`;
		// Might NOT NEED THIS -- Dead Player ❌
	} else {
		document.getElementById(
			"Hp"
		).textContent = `Hp: ${myHeroes[num].Hp}/${myHeroes[num].maxHp}`;
	}

	document.getElementById("Atk").textContent = `Atk: ${myHeroes[num].Atk}`;
	document.getElementById(
		"Stamina"
	).textContent = `Stamina: ${myHeroes[num].Stamina}`;
	document.getElementById("Mana").textContent = `Mana: ${myHeroes[num].Mana}`;
	document.getElementById(
		"Intelligence"
	).textContent = `Intelligence: ${myHeroes[num].Intelligence}`;
	document.getElementById(
		"Strength"
	).textContent = `Strength: ${myHeroes[num].Strength}`;
	document.getElementById(
		"Dexterity"
	).textContent = `Dexterity: ${myHeroes[num].Dexterity}`;
	document.getElementById(
		"Class"
	).textContent = `Class: ${myHeroes[num].Class}`;
}

//Load in Attacks
function openAttacks() {
	if (num == -1) {
		textBubble.textContent = `Select an Atlas Six character first.`;
	} else {
		document.getElementById("heStats").style.display = `none`;
		document.getElementById("heDesc").style.display = `none`;
		document.getElementById("msDescTab").style.display = `none`;
		document.getElementById("heAttacks").style.display = `block `;
		document.getElementById(
			"Atk1"
		).textContent = `Attack 1: ${myHeroes[num].Attacks.Name[0]}`;

		document.getElementById(
			"Action1Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[0]}.webp`;

		document.getElementById(
			"Desc1"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[0]}`;
		document.getElementById(
			"Action1Power"
		).textContent = `${myHeroes[num].Attacks.Power[0]}`;
		document.getElementById(
			"Action1Cost"
		).textContent = `${myHeroes[num].Attacks.Power[0]}`;
		document.getElementById(
			"Action1Title"
		).textContent = `${myHeroes[num].Attacks.Name[0]}`;
		document.getElementById(
			"Action1Desc"
		).textContent = `${myHeroes[num].Attacks.Desc[0]}`;

		document.getElementById(
			"Atk2"
		).textContent = `Attack 2: ${myHeroes[num].Attacks.Name[1]}`;

		document.getElementById(
			"Action2Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[1]}.webp`;

		document.getElementById(
			"Desc2"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[1]}`;
		document.getElementById(
			"Action2Power"
		).textContent = `${myHeroes[num].Attacks.Power[1]}`;
		document.getElementById(
			"Action2Cost"
		).textContent = `${myHeroes[num].Attacks.Power[1]}`;

		document.getElementById(
			"Action2Desc"
		).textContent = `${myHeroes[num].Attacks.Desc[1]}`;
		document.getElementById(
			"Action2Title"
		).textContent = `${myHeroes[num].Attacks.Name[1]}`;

		document.getElementById(
			"Atk3"
		).textContent = `Attack 3: ${myHeroes[num].Attacks.Name[2]}`;

		document.getElementById(
			"Action3Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[2]}.webp`;

		document.getElementById(
			"Desc3"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[2]}`;
		document.getElementById(
			"Action3Power"
		).textContent = `${myHeroes[num].Attacks.Power[2]}`;
		document.getElementById(
			"Action3Cost"
		).textContent = `${myHeroes[num].Attacks.Power[2]}`;
		document.getElementById(
			"Action3Desc"
		).textContent = `${myHeroes[num].Attacks.Desc[2]}`;
		document.getElementById(
			"Action3Title"
		).textContent = `${myHeroes[num].Attacks.Name[2]}`;

		document.getElementById(
			"Atk4"
		).textContent = `Attack 4: ${myHeroes[num].Attacks.Name[3]}`;

		document.getElementById(
			"Action4Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[3]}.webp`;

		document.getElementById(
			"Desc4"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[3]}`;
		document.getElementById(
			"Action4Power"
		).textContent = `${myHeroes[num].Attacks.Power[3]}`;
		document.getElementById(
			"Action4Cost"
		).textContent = `${myHeroes[num].Attacks.Power[3]}`;
		document.getElementById(
			"Action4Desc"
		).textContent = `${myHeroes[num].Attacks.Desc[3]}`;
		document.getElementById(
			"Action4Title"
		).textContent = `${myHeroes[num].Attacks.Name[3]}`;
	}
}

//Open StoryTeller Tab
function openScroll2() {
	openScroll(num);
}

//Close StoryTeller Tab
function closeScroll() {
	document.getElementById(`storyTeller`).style.display = "none";
	document.getElementById("pgCenter").style.display = "block";
}

function openMonster(num) {
	if (!gotHeroes) {
		getHeroes();
	}
	if (!gotMonsters) {
		getMonsters();
	}

	document.getElementById("storyTeller").style.display = "block";
	document.getElementById("pgCenter").style.display = "none";
	document.getElementById("heDesc").style.display = `none`;
	document.getElementById("heAttacks").style.display = `none`;
	document.getElementById("heStats").style.display = `none `;
	document.getElementById("msDescTab").style.display = `block `;

	document.getElementById(
		"currentTitle"
	).textContent = `${myMonsters[num].Name}`;
	document.getElementById(
		"msDesc"
	).textContent = `Description: ${myMonsters[num].Desc}`;
	document.getElementById(
		"msHp"
	).textContent = `hp: ${myMonsters[num].Hp}/${myMonsters[num].maxHp}`;
	document.getElementById(
		"msType"
	).textContent = `Type: ${myMonsters[num].Type}`;
	document.getElementById(
		"msAtk1"
	).textContent = `Attack 1: ${myMonsters[num].Attacks.Name[0]}`;
	document.getElementById(
		"msAtk2"
	).textContent = `Attack 2: ${myMonsters[num].Attacks.Name[1]}`;
	document.getElementById(
		"msAtk3"
	).textContent = `Attack 3: ${myMonsters[num].Attacks.Name[2]}`;
	document.getElementById(
		"msAtk4"
	).textContent = `Attack 4: ${myMonsters[num].Attacks.Name[3]}`;
	document.getElementById(
		"msAtk5"
	).textContent = `Attack 5: ${myMonsters[num].Attacks.Name[4]}`;
}

let played = false;
let atkNumber = -1;
const actBtns = document.querySelectorAll(`.action`); //Hero Action
actBtns.forEach((button) => {
	button.addEventListener("click", function chooseAttack() {
		if (num == -1) {
			textBubble.textContent = `Select an Atlas Six character first.`;
		} else if (myHeroes[num].Hp <= 0) {
			textBubble.textContent = `Unable to perform an action because this character is currently Dead.`;
		} else {
			if (!played) {
				if (myHeroes[num].Attacks.Type[button.dataset.atknum] == "Attack") {
					clickEnemy(Number(button.dataset.atknum));
				} else if (
					myHeroes[num].Attacks.Type[button.dataset.atknum] == "Heal"
				) {
					textBubble.textContent = "Select an Ally.";
					atkNumber = Number(button.dataset.atknum);
				}
			} else {
				textBubble.textContent = `Not Your Turn.`;
			}
		}
	});
});

const heroCards = document.querySelectorAll(`.Ally`);
heroCards.forEach((Hero) => {
	Hero.addEventListener("click", function clickHero() {
		clickAlly(Number(Hero.dataset.heronum), Hero);
	});
});

//Attack Action
function clickEnemy(atknums) {
	textBubble.textContent = "Select an Enemy.";
	const monsterCon = document.getElementById("monstersCon");
	monsterCon.addEventListener(
		"click",
		function chooseEnemy(e) {
			let Enemy = e.target;
			if (Enemy.classList.contains(`Enemy`)) {
				if (arrEnemies[Number(Enemy.dataset.ennumber)].Hp <= 0) {
					textBubble.textContent = `This enemy character is dead. Select a different character.`;
				} else {
					const enemyPath =
						myMonsters[arrEnemies[Number(Enemy.dataset.ennumber)].Index];
					arrEnemies[Number(Enemy.dataset.ennumber)].Hp =
						arrEnemies[Number(Enemy.dataset.ennumber)].Hp -
						myHeroes[num].Attacks.Power[atknums];
					if (arrEnemies[Number(Enemy.dataset.ennumber)].Hp <= 0) {
						//Check if the enemy is dead
						arrEnemies[Number(Enemy.dataset.ennumber)].Hp = 0; // Set Hp  to 0 as this is the Minimum
						document.getElementById(
							`enemy${[Number(Enemy.dataset.ennumber)]}`
						).innerHTML = `<img src="Images/dead.webp" alt="This is a enemy player is dead"  class="Enemy dead" data-ennumber="${[
							Number(Enemy.dataset.ennumber),
						]}" />    `;
					}

					let character = document.getElementById(`pg${myHeroes[num].Class}`);
					moveToCenter(character);
					textBubble.textContent = `${myHeroes[num].Name} performed ${
						myHeroes[num].Attacks.Name[atknums]
					} on ${enemyPath.Name} which has ${
						arrEnemies[Number(Enemy.dataset.ennumber)].Hp
					} now.`;
					played = true;
					setTimeout(() => {
						playFight();
					}, 3000);
				}
			}
		},
		{ once: true }
	);
}

let originalPosition = { x: 0, y: 0 };
// Function to center a character
function moveToCenter(character) {
	const rect = character.getBoundingClientRect();
	const centerX = window.innerWidth / 2 - rect.width / 2;
	const centerY = window.innerHeight / 2 - rect.height / 2;

	originalTransform = character.style.transform || "translate(0, 0)";
	character.style.transform = `translate(${centerX - rect.left}px, ${
		centerY - rect.top
	}px)`;

	character.style.zIndex = 1;
	setTimeout(() => {
		character.style.transform = originalTransform;
	}, 3000);
}

//Healing Action
function clickAlly(HeroNum, Ally) {
	if (textBubble.textContent == "Select an Ally.") {
		let allyNum = Number(Ally.dataset.heronum);
		if (myHeroes[allyNum].Hp != myHeroes[allyNum].maxHp) {
			myHeroes[allyNum].Hp =
				myHeroes[allyNum].Hp + myHeroes[num].Attacks.Power[atkNumber];
			textBubble.textContent = `${myHeroes[num].Name} performed ${myHeroes[num].Attacks.Name[atkNumber]} on an Ally who has More now.`;
			if (myHeroes[allyNum].Hp > myHeroes[allyNum].maxHp) {
				myHeroes[allyNum].Hp = myHeroes[allyNum].maxHp;
			}
			let character = document.getElementById(`pg${myHeroes[num].Class}`);
			moveToCenter(character);
			setTimeout(() => {
				playFight();
			}, 3000);
		} else {
			textBubble.textContent = `Ally Character is at maximum Health.`;
		}
	} else {
		openScroll(HeroNum);
	}
}

function playFight() {
	let arrAliveHeroes = []; // Recheck if Heroes are alive
	let arrAliveEnemies = []; //Recheck if Enemies are alive
	let enemiesDead = true;
	for (let i = 0; i < arrEnemies.length; ++i) {
		if (arrEnemies[i].Hp <= 0) {
			enemiesDead = false;
		} else {
			arrAliveEnemies.push(i);
		}
	}
	if (arrAliveEnemies.length == 0) {
		textBubble.textContent = `Victory Achieved!`;
		return;
	}
	let ranEnemy = Math.floor(Math.random() * arrAliveEnemies.length);
	ranEnemy = arrAliveEnemies[ranEnemy];
	// Alive heroes are the Only possible attack points
	for (let i = 0; i < 5; ++i) {
		if (myHeroes[i].Hp > 0) {
			arrAliveHeroes.push(i);
		}
	}

	// The fight is going on HERE
	let ranHero = Math.floor(Math.random() * arrAliveHeroes.length);
	ranHero = arrAliveHeroes[ranHero];
	let ranAtk = Math.floor(Math.random() * 5);
	textBubble.textContent = `${
		myMonsters[arrEnemies[ranEnemy].Index].Name
	} performed  ${
		myMonsters[arrEnemies[ranEnemy].Index].Attacks.Name[ranAtk]
	} on ${myHeroes[ranHero].Name}. This has dealt ${
		myMonsters[arrEnemies[ranEnemy].Index].Attacks.Power[ranAtk]
	} damage.`;
	myHeroes[ranHero].Hp =
		myHeroes[ranHero].Hp -
		myMonsters[arrEnemies[ranEnemy].Index].Attacks.Power[ranAtk];
	played = false;
	moveToCenter(document.getElementById(`enemy${ranEnemy}`));

	//Player just died
	if (myHeroes[ranHero].Hp <= 0) {
		document.getElementById(`pg${myHeroes[ranHero].Class}`).src =
			"Images/dead.webp";
		//Party just died
		if (arrAliveHeroes.length - 1 == 0) {
			textBubble.textContent = `Battle Lost!`;
		}
	}

	//The Fight is done
	fetch("./heroes.json/", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(myHeroes),
	})
		.then((response) => response.json())
		.then((values) => (myHeroes = values));
}
