import Tank from "./Tank.js";
import { mapLegend } from "./map.js";

export default class EnemyTank extends Tank {
  constructor(x, y, enemyBaseId) {
    super(x, y, mapLegend.enemyBase);
    this.elem.className += "game-object game-object__enemy-tank";
    this.elem.innerHTML = enemyBaseId;
    this.enemyBaseId = enemyBaseId;
    this.rotateTank(180);
  }
}
