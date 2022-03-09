import Tank from "./Tank.js";
import { mapLegend } from "./map.js";

const directionSet = ["right", "left", "up", "down"];

export default class EnemyTank extends Tank {
    constructor(x, y) {
        super(x, y, mapLegend.enemyBase);
        this.elem.className += "game-object game-object__enemy-tank";
        this.rotateTank(180);
    }

    randomDirection() {
        return directionSet[Math.floor(Math.random() * directionSet.length)];
    }

    changeDirection() {
        this.move();
    }

    move() {
        if (Math.random() < 0.33) {
            this.direction = this.randomDirection();
        } else {
            this.direction = this.previousState;
        }
        super.move();
    }
}
