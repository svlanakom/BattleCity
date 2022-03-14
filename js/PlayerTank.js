import Tank from "./Tank.js";
// import Bullet from "./Bullet.js";
import { mapLegend } from "./map.js";

export default class PlayerTank extends Tank {
  constructor(x, y) {
    super(x, y, mapLegend.playerBase);
    this.elem.className += "game-object player game-object__player-tank";
  }

  changeDirection(event) {
    if (event !== undefined) {
      switch (event.key) {
        case "ArrowLeft":
          this.direction = "left";
          break;
        case "ArrowRight":
          this.direction = "right";
          break;
        case "ArrowUp":
          this.direction = "up";
          break;
        case "ArrowDown":
          this.direction = "down";
          break;
        default:
          console.log("wrong direction" + event.key);
      }
    }
  }
}
