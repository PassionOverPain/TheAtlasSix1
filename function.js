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
fetch("heroes.json").then((response) =>
  response.json().then((value) => console.log(value))
);
function openScroll(num) {
  fetch("./heroes.json")
    .then((response) => response.json())
    .then((values) => (myHeroes = values));
  document.getElementById("currentTitle").textContent = `${myHeroes[num].Name}`;
  document.getElementById("Hp").textContent = `Hp: ${myHeroes[num].Hp}`;
  document.getElementById("Atk").textContent = `Atk: ${myHeroes[num].Atk}`;
  // Atk: ${myHeroes[num].Atk},
  // Stamina: ${myHeroes[num].Stamina},
  // Mana: ${myHeroes[num].Mana},
  // Intelligence: ${myHeroes[num].Intelligence},
  // Strength:${myHeroes[num].Strength},
  // Dexterity: ${myHeroes[num].Dexterity},
  // Class: ${myHeroes[num].Class},
  // Attacks:${myHeroes[num].Attacks[0]},
  // ${myHeroes[num].Attacks[1]},
  // ${myHeroes[num].Attacks[2]},
  // ${myHeroes[num].Attacks[3]}`;
}
