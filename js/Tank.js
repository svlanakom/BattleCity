import { cellSize, map } from "./map.js";

export default class Tank {
    constructor(x, y, mark) {
        this.elem = document.createElement("div");
        this.x = x;
        this.y = y;
        this.mapRow = this.x / cellSize;
        this.mapColumn = this.y / cellSize;
        this.direction = "up";
        this.previousState = "up";
        this.mark = mark;
    }

    move() {
        switch (this.direction) {
            case "up":
                this.rotateTank(0);
                if (
                    map[this.mapColumn - 1] !== undefined &&
                    map[this.mapColumn - 1][this.mapRow] === 0
                ) {
                    map[this.mapColumn - 1][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y -= cellSize;
                    this.mapColumn -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "down":
                this.rotateTank(180);
                if (
                    map[this.mapColumn + 1] !== undefined &&
                    map[this.mapColumn + 1][this.mapRow] === 0
                ) {
                    map[this.mapColumn + 1][this.mapRow] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.y += cellSize;
                    this.mapColumn += 1;
                } else {
                    this.changeDirection();
                }

                break;

            case "left":
                this.rotateTank(270);
                if (
                    map[this.mapColumn][this.mapRow - 1] !== undefined &&
                    map[this.mapColumn][this.mapRow - 1] === 0
                ) {
                    map[this.mapColumn][this.mapRow - 1] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.x -= cellSize;
                    this.mapRow -= 1;
                } else {
                    this.changeDirection();
                }
                break;

            case "right":
                this.rotateTank(90);
                if (
                    map[this.mapColumn][this.mapRow + 1] !== undefined &&
                    map[this.mapColumn][this.mapRow + 1] === 0
                ) {
                    map[this.mapColumn][this.mapRow + 1] = this.mark;
                    map[this.mapColumn][this.mapRow] = 0;
                    this.x += cellSize;
                    this.mapRow += 1;
                } else {
                    this.changeDirection();
                }
                break;
            default:
                console.log("wrong direction");
        }
        this.previousState = this.direction;
        this.update();
    }

    update() {
        this.elem.style["top"] = `${this.y}px`;
        this.elem.style["left"] = `${this.x}px`;
    }

    rotateTank(degrees) {
        this.elem.style.transform = `rotate(${degrees}deg)`;
    }
}
