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
		label: "Slayyy",
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
		textBubble.textContent = `Please Select an Atlas character first.`;
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
			"Atk2"
		).textContent = `Attack 2: ${myHeroes[num].Attacks.Name[1]}`;

		document.getElementById(
			"Action2Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[1]}.webp`;

		document.getElementById(
			"Desc2"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[1]}`;

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
			"Atk4"
		).textContent = `Attack 4: ${myHeroes[num].Attacks.Name[3]}`;

		document.getElementById(
			"Action4Img"
		).src = `Images/Assets/${myHeroes[num].Attacks.Name[3]}.webp`;

		document.getElementById(
			"Desc4"
		).textContent = `Description: ${myHeroes[num].Attacks.Desc[3]}`;
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

// function action(){
//   let hero = document.getElementById("myHealer");
//   let center = document.getElementById("pgCenter");
//   const xpos = hero.style.left;
//   const ypos = hero.style.top;

//   hero.style.position ="absolute";
//   alert(`${center.style.left}`);
//   hero.style.left = `${center.style.left}`;
//   hero.style.top = `${center.style.top}`;
// }

let played = false;
const actBtns = document.querySelectorAll(`.action`); //Hero Action
actBtns.forEach((button) => {
	button.addEventListener("click", function chooseAttack() {
		if (num == -1) {
			textBubble.textContent = `Please Select an Atlas character first.`;
		} else {
			if (myHeroes[num].Attacks.Type[button.dataset.atknum] == "Attack") {
				clickEnemy(Number(button.dataset.atknum));
			} else if (myHeroes[num].Attacks.Type[button.dataset.atknum] == "Heal") {
				clickAlly(Number(button.dataset.atknum));
			} else {
			}
		}
	});

	/// ANOTHER ISSUE ... The Player can play INFINITY :).....
});

//Attack Action
function clickEnemy(atknums) {
	textBubble.textContent = "Please select an Enemy.";
	const monsterCon = document.getElementById("monstersCon");
	monsterCon.addEventListener(
		"click",
		function chooseEnemy(e) {
			if (e.target.classList.contains(`Enemy`)) {
				const enemyPath =
					myMonsters[arrEnemies[Number(Enemy.dataset.ennumber)].Index];
				let enemyHealth = Number(arrEnemies[Number(Enemy.dataset.ennumber)].Hp);
				arrEnemies[Number(Enemy.dataset.ennumber)].damageHealth(
					myHeroes[num].Attacks.Power[atknums]
				);
				textBubble.textContent = `${myHeroes[num].Name} performed ${myHeroes[num].Attacks.Name[atknums]} on ${enemyPath.Name} which has ${enemyHealth} now.`;
				setTimeout(() => {
					playFight();
				}, 4000);
			}
		},
		{ once: true }
	);
}

//Healing Action
function clickAlly(atknums) {
	textBubble.textContent = "Please select an Ally.";
	let allies = document.querySelectorAll(".Allly");
	allies.forEach((Ally) => {
		Ally.addEventListener(
			"click",
			function chooseAlly() {
				alert("This is an Ally.");
				textBubble.textContent = `${myHeroes[num].Name} performed ${myHeroes[num].Attacks.Name[atknums]} on an Ally who has More now.`;
				setTimeout(() => {
					playFight();
				}, 4000);
				played = true;
			},
			{ once: true }
		);
	});
}

function playFight() {
	let aliveHeroes = []; // Recheck if Heroes are alive
	let ranEnemy = Math.floor(Math.random() * arrEnemies.length);
	if (myMonsters[ranEnemy].Hp <= 0) {
		document.getElementById(
			"monstersCon"
		).innerHTML = `<div class="hero pgCard">
						<img
							src="Images/dead.webp"
							alt="This character is dead" />
					</div>`;
		textBubble.textContent = `Victory Achieved`;
	} else {
		// Alive heroes are the Only possible attack points
		for (let i = 0; i < 5; ++i) {
			if (myHeroes[i].Hp > 0) {
				aliveHeroes.push(i);
			}
		}

		// The fight is going on HERE
		let ranHero = Math.floor(Math.random() * aliveHeroes.length);
		ranHero = aliveHeroes[ranHero];
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

		//Player just died
		if (myHeroes[ranHero].Hp <= 0) {
			document.getElementById(`pg${myHeroes[ranHero].Class}`).src =
				"Images/dead.webp";
			//Party just died
			if (aliveHeroes.length - 1 == 0) {
				textBubble.textContent = `The Atlas Six Party has died.`;
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
}
