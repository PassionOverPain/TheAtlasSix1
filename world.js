function createMonster(options) {
	const template = document.createElement("template");

	template.innerHTML = `<div id="enemy${arrEnemies.length}" class="hero pgCard">
         <img src="${options.picture}" alt="This is a enemy player"  class="Enemy" data-ennumber="${arrEnemies.length}" />    
          </div>`;

	const monster = template.content.firstElementChild;
	return monster;
}
function newMonster(Index) {
	const myMonster = createMonster({
		picture: `Images/${myMonsters[Index].Name}.webp`,
	});
	document.getElementById("monsters").appendChild(myMonster);
}
let arrEnemies = [];
function creationMonster() {
	Index = Math.floor(Math.random() * 2);
	const myMonster = new Monster(Index);
	arrEnemies.push(myMonster);
}
class Monster {
	constructor(Index) {
		this.Index = Index;
		this.Hp = myMonsters[Index].Hp;
		newMonster(Index);
	}
}
