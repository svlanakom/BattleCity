import Tank from "./Tank.js";
import { mapLegend, directionSet } from "./map.js";

export default class EnemyTank extends Tank {
  constructor(x, y, enemyBaseId) {
    super(x, y, mapLegend.enemyBase);
    this.elem.className += "game-object game-object__enemy-tank";
    this.elem.innerHTML = enemyBaseId;
    this.enemyBaseId = enemyBaseId;
    this.rotateTank(180);
  }

  // randomDirection() {
  //   return directionSet[Math.floor(Math.random() * directionSet.length)];
  // }

  // changeDirection() {
  //   if (Math.random() < 0.33) {
  //     // this.direction = this.randomDirection();
  //     this.direction =
  //       directionSet[Math.floor(Math.random() * directionSet.length)];
  //   } else {
  //     this.direction = this.previousState;
  //   }
  //   this.move();
  // }

  // move() {
  //   super.move();
  // }
}
