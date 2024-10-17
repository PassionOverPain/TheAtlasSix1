/** @format */
//The Main function
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
let myChapters;
let arrChoices = [];
let currentRound = 0;

//Either open the map or close the map
function displayMap() {
	openMap = !openMap;
	document.getElementById("thisMap").style.display = openMap ? "block" : "none";
}
let loader = document.getElementById("preloader");
window.addEventListener("load", function (load) {
	// Lazy Loading :) //
	this.window.removeEventListener("load", load, false);
	getHeroes();
	getMonsters();
	loadStory();
	// displayChapter();
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
async function getHeroes() {
	const response = await fetch("./heroes.json");
	myHeroes = await response.json();
	gotHeroes = true;
}
//Load Monster Data
async function getMonsters() {
	const response = await fetch("./monsters.json");
	myMonsters = await response.json();
	gotHeroes = true;
}

async function loadStory() {
	const response = await fetch("./story.json");
	myChapters = await response.json();
}
let heroIndex = -1;
function openScroll(charNum) {
	heroIndex = charNum;
	if (!gotHeroes) {
		getHeroes();
	}
	if (!gotMonsters) {
		getMonsters();
	}
	openAttacks();
	// let actionsCon = document.getElementById("actions");
	// switch (num) {
	// 	case 0: {
	// 		actionsCon.style.backgroundColor = `rgba(3, 93, 145, 0.199)`;
	// 		break;
	// 	}
	// 	case 1: {
	// 		actionsCon.style.backgroundColor = `rgba(56, 34, 4, 0.199)`;
	// 		break;
	// 	}
	// 	case 2: {
	// 		actionsCon.style.backgroundColor = `rgba(27, 1, 75, 0.199)`;
	// 		break;
	// 	}
	// 	case 3: {
	// 		actionsCon.style.backgroundColor = `rgba(255, 0, 0, 0.199)`;
	// 		break;
	// 	}
	// 	case 4: {
	// 		actionsCon.style.backgroundColor = `rgba(145, 105, 7, 0.199)`;
	// 		break;
	// 	}
	// }
	document.getElementById("storyTeller").style.display = "block";
	document.getElementById("pgCenter").style.display = "none";
	document.getElementById(
		"currentTitle"
	).textContent = `${myHeroes[heroIndex].Name}`;
	document.getElementById("heDesc").style.display = `none`;
	document.getElementById("heAttacks").style.display = `none`;
	document.getElementById("msDescTab").style.display = `none`;
	document.getElementById("heStats").style.display = `block `;
	if (myHeroes[heroIndex].Hp <= 0) {
		document.getElementById(
			"Hp"
		).textContent = `Hp: 0/${myHeroes[heroIndex].maxHp}`;
	} else {
		document.getElementById(
			"Hp"
		).textContent = `Hp: ${myHeroes[heroIndex].Hp}/${myHeroes[heroIndex].maxHp}`;
	}

	document.getElementById(
		"Atk"
	).textContent = `Atk: ${myHeroes[heroIndex].Atk}`;
	document.getElementById(
		"Stamina"
	).textContent = `Stamina: ${myHeroes[heroIndex].Stamina}/${myHeroes[heroIndex].maxStamina}`;
	document.getElementById(
		"Mana"
	).textContent = `Mana: ${myHeroes[heroIndex].Mana}/${myHeroes[heroIndex].maxMana}`;
	document.getElementById(
		"Intelligence"
	).textContent = `Intelligence: ${myHeroes[heroIndex].Intelligence}`;
	document.getElementById(
		"Strength"
	).textContent = `Strength: ${myHeroes[heroIndex].Strength}`;
	document.getElementById(
		"Dexterity"
	).textContent = `Dexterity: ${myHeroes[heroIndex].Dexterity}`;
	document.getElementById(
		"Class"
	).textContent = `Class: ${myHeroes[heroIndex].Class}`;
}

//Load in Attacks
function openAttacks() {
	if (heroIndex == -1) {
		textBubble.textContent = `Select an Atlas Six character first.`;
	} else {
		document.getElementById("heStats").style.display = `none`;
		document.getElementById("heDesc").style.display = `none`;
		document.getElementById("msDescTab").style.display = `none`;
		document.getElementById("heAttacks").style.display = `block `;
		document.getElementById(
			"Atk1"
		).textContent = `Attack 1: ${myHeroes[heroIndex].Attacks.Name[0]}`;

		document.getElementById(
			"Action1Img"
		).src = `Images/Assets/${myHeroes[heroIndex].Attacks.Name[0]}.webp`;

		document.getElementById(
			"Desc1"
		).textContent = `Description: ${myHeroes[heroIndex].Attacks.Desc[0]}`;
		const actionPowers = document.querySelectorAll(`.actionPower`);
		let x = 0;
		actionPowers.forEach((actionPower) => {
			if (myHeroes[heroIndex].Attacks.Type[x] == `Attack`) {
				actionPower.style.background = `url(Images/Assets/attackPower.webp)`;
			} else {
				actionPower.style.background = `url(Images/Assets/healPower.webp)`;
			}
			++x;
		});
		document.getElementById(
			"Action1Power"
		).textContent = `${myHeroes[heroIndex].Attacks.Power[0]}`;
		document.getElementById(
			"Action1Cost"
		).textContent = `${myHeroes[heroIndex].Attacks.Cost[0]}`;
		document.getElementById(
			"Action1Title"
		).textContent = `${myHeroes[heroIndex].Attacks.Name[0]}`;
		document.getElementById(
			"Action1Desc"
		).textContent = `${myHeroes[heroIndex].Attacks.Desc[0]}`;

		document.getElementById(
			"Atk2"
		).textContent = `Attack 2: ${myHeroes[heroIndex].Attacks.Name[1]}`;

		document.getElementById(
			"Action2Img"
		).src = `Images/Assets/${myHeroes[heroIndex].Attacks.Name[1]}.webp`;

		document.getElementById(
			"Desc2"
		).textContent = `Description: ${myHeroes[heroIndex].Attacks.Desc[1]}`;
		document.getElementById(
			"Action2Power"
		).textContent = `${myHeroes[heroIndex].Attacks.Power[1]}`;
		document.getElementById(
			"Action2Cost"
		).textContent = `${myHeroes[heroIndex].Attacks.Cost[1]}`;

		document.getElementById(
			"Action2Desc"
		).textContent = `${myHeroes[heroIndex].Attacks.Desc[1]}`;
		document.getElementById(
			"Action2Title"
		).textContent = `${myHeroes[heroIndex].Attacks.Name[1]}`;

		document.getElementById(
			"Atk3"
		).textContent = `Attack 3: ${myHeroes[heroIndex].Attacks.Name[2]}`;

		document.getElementById(
			"Action3Img"
		).src = `Images/Assets/${myHeroes[heroIndex].Attacks.Name[2]}.webp`;

		document.getElementById(
			"Desc3"
		).textContent = `Description: ${myHeroes[heroIndex].Attacks.Desc[2]}`;
		document.getElementById(
			"Action3Power"
		).textContent = `${myHeroes[heroIndex].Attacks.Power[2]}`;
		document.getElementById(
			"Action3Cost"
		).textContent = `${myHeroes[heroIndex].Attacks.Cost[2]}`;
		document.getElementById(
			"Action3Desc"
		).textContent = `${myHeroes[heroIndex].Attacks.Desc[2]}`;
		document.getElementById(
			"Action3Title"
		).textContent = `${myHeroes[heroIndex].Attacks.Name[2]}`;

		document.getElementById(
			"Atk4"
		).textContent = `Attack 4: ${myHeroes[heroIndex].Attacks.Name[3]}`;

		document.getElementById(
			"Action4Img"
		).src = `Images/Assets/${myHeroes[heroIndex].Attacks.Name[3]}.webp`;

		document.getElementById(
			"Desc4"
		).textContent = `Description: ${myHeroes[heroIndex].Attacks.Desc[3]}`;
		document.getElementById(
			"Action4Power"
		).textContent = `${myHeroes[heroIndex].Attacks.Power[3]}`;
		document.getElementById(
			"Action4Cost"
		).textContent = `${myHeroes[heroIndex].Attacks.Cost[3]}`;
		document.getElementById(
			"Action4Desc"
		).textContent = `${myHeroes[heroIndex].Attacks.Desc[3]}`;
		document.getElementById(
			"Action4Title"
		).textContent = `${myHeroes[heroIndex].Attacks.Name[3]}`;
	}
}

function downAttacks() {
	if (heroIndex != 4) {
		++heroIndex;
	} else {
		heroIndex = 0;
	}
	document.getElementById(`actions`).style.display = `none`;
	document.getElementById(`playground`).style.justifyContent = `center`;
	document.getElementById(`heroesCon`).style.display = `none`;
	openAttacks();
}
function upAttacks() {
	if (heroIndex == -1) {
		heroIndex = 0;
	} else if (heroIndex != 0) {
		--heroIndex;
	} else {
		heroIndex = 4;
	}
	openAttacks();
}

//Open StoryTeller Tab
function openScroll2() {
	openScroll(heroIndex);
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
		if (heroIndex == -1) {
			textBubble.textContent = `Select an Atlas Six character first.`;
		} else if (myHeroes[heroIndex].Hp <= 0) {
			textBubble.textContent = `Unable to perform this action because this character is currently Dead.`;
		} else {
			atkNumber = Number(button.dataset.atknum);
			if (myHeroes[heroIndex].Attacks.CostClass[atkNumber] == "Mana") {
				if (
					myHeroes[heroIndex].Mana < myHeroes[heroIndex].Attacks.Cost[atkNumber]
				) {
					textBubble.textContent = `Unable to perform action due to character's lack of Mana.`;
					return;
				}
			} else {
				if (
					myHeroes[heroIndex].Stamina <
					myHeroes[heroIndex].Attacks.Cost[atkNumber]
				) {
					textBubble.textContent = `Unable to perform action due to character's lack of Stamina.`;
					return;
				}
			}
			if (!played) {
				if (myHeroes[heroIndex].Attacks.Type[atkNumber] == "Attack") {
					clickEnemy(atkNumber);
				} else if (myHeroes[heroIndex].Attacks.Type[atkNumber] == "Heal") {
					textBubble.textContent = "Select an Ally.";
				}
			} else {
				textBubble.textContent = `Not Your Turn.`;
			}
		}
	});
});

function deplete() {
	if (myHeroes[heroIndex].Attacks.CostClass[atkNumber] == "Mana")
		myHeroes[heroIndex].Mana =
			myHeroes[heroIndex].Mana - myHeroes[heroIndex].Attacks.Cost[atkNumber];
	else {
		myHeroes[heroIndex].Stamina =
			myHeroes[heroIndex].Stamina - myHeroes[heroIndex].Attacks.Cost[atkNumber];
	}
}

function regenerate() {
	myHeroes.forEach((Hero) => {
		Hero.Mana = Hero.Mana + 15;
		Hero.Stamina = Hero.Stamina + 15;
		if (Hero.Stamina > Hero.maxStamina) {
			Hero.Stamina = Hero.maxStamina;
		}
		if (Hero.Mana > Hero.maxMana) {
			Hero.Mana = Hero.maxMana;
		}
	});
}

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
						myHeroes[heroIndex].Attacks.Power[atknums];
					if (arrEnemies[Number(Enemy.dataset.ennumber)].Hp <= 0) {
						//Check if the enemy is dead
						arrEnemies[Number(Enemy.dataset.ennumber)].Hp = 0; // Set Hp  to 0 as this is the Minimum
						document.getElementById(
							`enemy${[Number(Enemy.dataset.ennumber)]}`
						).innerHTML = `<img src="Images/dead.webp" alt="This is a enemy player is dead"  class="Enemy dead" data-ennumber="${[
							Number(Enemy.dataset.ennumber),
						]}" />    `;
					}

					let character = document.getElementById(
						`pg${myHeroes[heroIndex].Class}`
					);
					moveToCenter(character);
					textBubble.textContent = `${myHeroes[heroIndex].Name} performed ${
						myHeroes[heroIndex].Attacks.Name[atknums]
					} on ${enemyPath.Name} which has ${
						arrEnemies[Number(Enemy.dataset.ennumber)].Hp
					} Hp now.`;
					played = true;
					deplete();
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
				myHeroes[allyNum].Hp + myHeroes[heroIndex].Attacks.Power[atkNumber];
			textBubble.textContent = `${myHeroes[heroIndex].Name} performed ${myHeroes[heroIndex].Attacks.Name[atkNumber]} on ${myHeroes[allyNum].Name} who has ${myHeroes[heroIndex].Attacks.Power[atkNumber]} more Hp.`;
			if (myHeroes[allyNum].Hp > myHeroes[allyNum].maxHp) {
				myHeroes[allyNum].Hp = myHeroes[allyNum].maxHp;
			}
			let character = document.getElementById(`pg${myHeroes[heroIndex].Class}`);
			moveToCenter(character);
			deplete();
			setTimeout(() => {
				playFight();
			}, 3000);
		} else {
			textBubble.textContent = `${myHeroes[allyNum].Name} is at maximum Health.`;
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
	} Hp damage.`;
	myHeroes[ranHero].Hp =
		myHeroes[ranHero].Hp -
		myMonsters[arrEnemies[ranEnemy].Index].Attacks.Power[ranAtk];
	played = false;
	moveToCenter(document.getElementById(`enemy${ranEnemy}`));

	//Player just died
	if (myHeroes[ranHero].Hp <= 0) {
		document.getElementById(`pg${myHeroes[ranHero].Class}img`).src =
			"Images/dead.webp";
		//Party just died
		if (arrAliveHeroes.length - 1 == 0) {
			textBubble.textContent = `Battle Lost!`;
		}
	}

	//The Fight is done
	++currentRound;
	regenerate();
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
function cook() {
	let myBranch = myChapters[0].branches[0];
	displayChapter(myBranch);
}
function displayChapter(branch) {
	// let pgStory = document.getElementById("pgStory");
	// pgStory.innerHTML = myChapters[0].branches[0].text; // No need to replace anything
	let chapterText = document.getElementById("pgStory");
	let choicesContainer = document.getElementById("pgChoices");
	chapterText.innerHTML = "";
	choicesContainer.innerHTML = "";
	const p = document.createElement("p");
	p.textContent = branch.text;
	chapterText.appendChild(p);
	let pgImg1 = document.getElementById(`pgCharacter1`);
	let pgImg2 = document.getElementById(`pgCharacter2`);
	if (branch.character1 != "none") {
		pgImg1.innerHTML = ` <img
    src="${branch.character1}"
    alt="This is a story character Image"
    class="storyImage" /> `;
	}
	if (branch.character2 != "none") {
		pgImg2.innerHTML = ` <img
    src="${branch.character2}"
    alt="This is a story character Image"
    class="storyImage" /> `;
	}

	// Display choices as narrative text
	if (branch.choices.length > 0) {
		branch.choices.forEach((choice) => {
			let p = document.createElement("p");
			p.innerHTML = `${choice.option}`;
			p.className = "choice";

			// Add event listener for clicking on the choice
			p.addEventListener("click", () => {
				let choiceNum = choice.choiceId;
				arrChoices.push(choiceNum);
				chapterText.innerHTML = branch.choices[choiceNum].outcome;
				choicesContainer.innerHTML = "";
				if (choice.character1 != "none") {
					pgImg1.innerHTML = ` <img
          src="url(${choice.character1})"
          alt="This is a story character Image"
          class="storyImage" /> `;
				}
				if (choice.character2 != "none") {
					pgImg2.innerHTML = ` <img
          src="${choice.character2}"
          alt="This is a story character Image"
          class="storyImage" /> `;
				}
			});

			choicesContainer.appendChild(p);

			// const instructionText = document.createElement("p");
			// instructionText.textContent = "";
			// chapterText.appendChild(instructionText);
		});
	}
}
