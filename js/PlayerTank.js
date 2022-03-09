import Tank from "./Tank.js";
import { mapLegend} from "./map.js";

export default class PlayerTank extends Tank {
    constructor(x, y) {
        super(x, y, mapLegend.playerBase);
        this.elem.className += "game-object player game-object__player-tank";
    }

    changeDirection(event) {
        if (event !== undefined) {
            switch (event.keyCode) {
                case 37:
                    this.direction = "left";
                    break;
                case 39:
                    this.direction = "right";
                    break;
                case 38:
                    this.direction = "up";
                    break;
                case 40:
                    this.direction = "down";
                    break;
                default:
                    console.log("wrong direction" + event.keyCode);
            }
        }
    }
}
