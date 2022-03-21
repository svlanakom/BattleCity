import Bullet from "./Bullet.js";
import { map } from "./map.js";
import { cellSize, gameTimerInterval, directionSet } from "./conf.js";

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
    this.isFiring = false;
  }

  changeDirection() {
    if (Math.random() < 0.33) {
      this.direction =
        directionSet[Math.floor(Math.random() * directionSet.length)];
    } else {
      this.direction = this.previousState;
    }
    this.move();
  }

  move() {
    // this.changeDirection();
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

  fire() {
    this.isFiring = true;
    setTimeout(() => {
      this.isFiring = false;
    }, gameTimerInterval);
    return new Bullet(this.x, this.y, this.direction, this);
    // return this.bullet;
  }

  // validateBorder() {
  //   if (this.bullet) {
  //     if (
  //       this.bullet.x < 0 ||
  //       this.bullet.y < 0 ||
  //       this.bullet.y > map.length * cellSize ||
  //       this.bullet.x >= map[0].length * cellSize
  //     ) {
  //       console.log("border");
  //       this.bullet = null;
  //       this.isFiring = false;
  //       console.log("here");
  //     }
  //   }
  // }
}
