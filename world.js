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
function creationMonster() {
  Index = Math.floor(Math.random() * 2);
  let myMonster = new Monster(Index);
  arrEnemies.push(myMonster);
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
