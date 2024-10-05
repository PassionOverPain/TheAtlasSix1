let enemyCount = 1;
function createMonster(options) {
	const template = document.createElement("template");

	template.innerHTML = `<div id="monster" class="hero pgCard">
         <img src="${options.picture}" alt="This is a monster player"  class="Enemy" />    
          </div>`;

	const monster = template.content.firstElementChild;
	return monster;
}
function newMonster(monsterPic) {
	const myMonster = createMonster({
		picture: `Images/${monsterPic}.webp`,
	});
	document.getElementById("monsters").appendChild(myMonster);
}
class Monster {
	constructor(Index, monsterPic) {
		this.Index = Index;
		newMonster(monsterPic);
	}
}
