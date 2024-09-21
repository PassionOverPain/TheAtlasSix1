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
let openMap = false;
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
    // }
  });
});
var hiddenElements = document.querySelectorAll(
  ".nrC, .hrC, .tnC, .eeC, .pxC, .tkC"
);
hiddenElements.forEach((el) => observer.observe(el));
// const newBtn = createButt({
//   label: "Minez",
//   icon: "none",
//   onClick: (ev) => alert("You are created"),
// });

function createButton(options) {
  const template = document.createElement("template");

  template.innerHTML = `<button type="button">${options.label}</button>`;

  const button = template.content.firstElementChild;
  return button;
}
function createMonster(options) {
  const template = document.createElement("template");

  template.innerHTML = `<div id="monster" class="hero pgCard">
         <img src="${options.picture}" alt="This is a monster player" />    
          </div>`;

  const monster = template.content.firstElementChild;
  return monster;
}
function newButton() {
  const myButton = createButton({
    label: "Slayyy",
  });
  document.getElementById("pgBtns").appendChild(myButton);
}
function newMonster() {
  const myMonster = createMonster({
    picture: "Images/msdragon.webp",
  });
  document.getElementById("monsters").appendChild(myMonster);
}

let gotHeroes = false;
let gotMonsters = false;
function getHeroes() {
  fetch("./heroes.json")
    .then((response) => response.json())
    .then((values) => (myHeroes = values));
  gotHeroes = true;
}

function getMonsters() {
  fetch("./monsters.json")
    .then((response) => response.json())
    .then((values) => (myMonsters = values));
  gotMonsters = true;
}

function openScroll(num) {
  if (!gotHeroes) {
    getHeroes();
  }
  document.getElementById("currentTitle").textContent = `${myHeroes[num].Name}`;
  document.getElementById("heDesc").style.display = `none`;
  document.getElementById("heAttacks").style.display = `none`;
  document.getElementById("msDescTab").style.display = `none`;
  document.getElementById("heStats").style.display = `block `;
  if (myHeroes[num].Hp <= 0) {
    document.getElementById("Hp").textContent = `Hp: 0`;
    document.getElementById(`pg${myHeroes[num].Class}`).src =
      "Images/dead.webp";
  } else {
    document.getElementById("Hp").textContent = `Hp: ${myHeroes[num].Hp}`;
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
function openAttacks(num) {
  document.getElementById("heStats").style.display = `none`;
  document.getElementById("heDesc").style.display = `none`;
  document.getElementById("msDescTab").style.display = `none`;
  document.getElementById("heAttacks").style.display = `block `;
  document.getElementById(
    "Atk1"
  ).textContent = `Attack 1: ${myHeroes[num].Attacks.Name[0]}`;
  document.getElementById(
    "Atk1"
  ).dataset.power = `${myHeroes[num].Attacks.Power[0]}`;
  document.getElementById(
    "Desc1"
  ).textContent = `Description: ${myHeroes[num].Attacks.Desc[0]}`;
  document.getElementById(
    "Atk2"
  ).textContent = `Attack 2: ${myHeroes[num].Attacks.Name[1]}`;
  document.getElementById(
    "Atk2"
  ).dataset.power = `${myHeroes[num].Attacks.Power[1]}`;
  document.getElementById(
    "Desc2"
  ).textContent = `Description: ${myHeroes[num].Attacks.Desc[1]}`;
  document.getElementById(
    "Atk3"
  ).textContent = `Attack 3: ${myHeroes[num].Attacks.Name[2]}`;
  document.getElementById(
    "Atk3"
  ).dataset.power = `${myHeroes[num].Attacks.Power[2]}`;
  document.getElementById(
    "Desc3"
  ).textContent = `Description: ${myHeroes[num].Attacks.Desc[2]}`;
  document.getElementById(
    "Atk4"
  ).textContent = `Attack 4: ${myHeroes[num].Attacks.Name[3]}`;
  document.getElementById(
    "Atk4"
  ).dataset.power = `${myHeroes[num].Attacks.Power[3]}`;
  document.getElementById(
    "Desc4"
  ).textContent = `Description: ${myHeroes[num].Attacks.Desc[3]}`;
}
const actBtns = document.querySelectorAll(`.action`);
actBtns.forEach((button) => {
  button.addEventListener("click", () => {
    alert(
      `You have clicked ${button.textContent} which is ${button.dataset.power}`
    );
  });
});
function openMonster(num) {
  if (!gotMonsters) {
    getMonsters();
  }
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
  document.getElementById("msHp").textContent = `hp: ${myMonsters[num].Hp}`;
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

function playFight() {
  getMonsters();
  let enemiesAlive = true;
  let atlasAlive = true;
  let turn = 1;
  let played = false;
  //while (enemiesAlive && atlasAlive) {
  let aliveHeroes = []; // Recheck if Heroes are alive
  for (let i = 0; i < 5; ++i) {
    if (myHeroes[i].Hp > 0) {
      aliveHeroes.push(i); // If so, make hero number a possible attack point
    }
  }
  // The fight is going on HERE
  if (turn == 0) {
    while (!played) {
      alert("It is your turn");
    }
    if (
      myHeroes[0].Hp == 0 &&
      myHeroes[1].Hp == 0 &&
      myHeroes[2].Hp === 0 &&
      (myHeroes[3].Hp == myHeroes[4].Hp) == 0
    ) {
      atlasAlive = false;
      alert("Yall ARE DEAD");
    }
  } else {
    let ranHero = Math.floor(Math.random() * aliveHeroes.length);
    ranHero = aliveHeroes[ranHero];
    let ranAtk = Math.floor(Math.random() * 5);
    alert(
      `${myMonsters[0].Name} has just performed a ${myMonsters[0].Attacks.Name[ranAtk]} on ${myHeroes[ranHero].Name}. This has dealt ${myMonsters[0].Attacks.Power[ranAtk]}`
    );
    myHeroes[ranHero].Hp =
      myHeroes[ranHero].Hp - myMonsters[0].Attacks.Power[ranAtk];
    // turn = 0;
  }
  //}
  //The Fight is done

  if (myMonsters[0].Hp == 0) {
    alert("You my friend have just won :)");
  } else if (!atlasAlive) {
  }
  //}
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
