import Tank from "./Tank.js";
import { mapLegend } from "./map.js";
import { directionKeys } from "./conf.js";

export default class PlayerTank extends Tank {
  constructor(x, y) {
    super(x, y, mapLegend.playerBase);
    this.elem.className += "game-object player game-object__player-tank";
  }

  changeDirection(event) {
    if (event !== undefined) {
      switch (event.key) {
        case directionKeys["left"]:
          this.direction = "left";
          break;
        case directionKeys["right"]:
          this.direction = "right";
          break;
        case directionKeys["up"]:
          this.direction = "up";
          break;
        case directionKeys["down"]:
          this.direction = "down";
          break;
        default:
          console.log("wrong direction" + event.key);
      }
    }
  }
}
