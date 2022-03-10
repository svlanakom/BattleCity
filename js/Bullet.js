import { cellSize, bulletSize, map } from "./map.js";
import { gameTimerInterval } from "./main.js";

export default class Bullet {
  constructor(x, y, direction, tank) {
    this.el = document.createElement("div");
    this.x = x;
    this.y = y;
    this.tank = tank;
    this.direction = direction;
    this.draw();
    this.style();
    this.update();
    this.addBulletToMap();
  }
  draw() {
    let dif = cellSize - bulletSize;
    switch (this.direction) {
      case "up":
        this.x += dif / 2 - 1;
        break;
      case "down":
        this.x += dif / 2 + 1;
        this.y += dif;
        break;
      case "left":
        // this.x += 29;
        this.y += dif / 2;
        break;
      case "right":
        this.x += dif;
        this.y += dif / 2 - 1;
        break;
    }
  }

  style() {
    this.el.classList.add("bullet");
  }

  addBulletToMap() {
    let gameMap = document.querySelector("#game-map");
    gameMap.appendChild(this.el);
  }

  update() {
    this.el.style["top"] = `${this.y}px`;
    this.el.style["left"] = `${this.x}px`;
  }
  move() {
    let timerId;
    switch (this.direction) {
      case "up":
        timerId = setInterval(() => this.up(), gameTimerInterval / bulletSize);
        setTimeout(() => {
          clearInterval(timerId);
        }, gameTimerInterval);
        break;
      case "down":
        timerId = setInterval(
          () => this.down(),
          gameTimerInterval / bulletSize
        );
        setTimeout(() => {
          clearInterval(timerId);
        }, gameTimerInterval);
        break;
      case "left":
        timerId = setInterval(
          () => this.left(),
          gameTimerInterval / bulletSize
        );
        setTimeout(() => {
          clearInterval(timerId);
        }, gameTimerInterval);
        break;
      case "right":
        timerId = setInterval(
          () => this.right(),
          gameTimerInterval / bulletSize
        );
        setTimeout(() => {
          clearInterval(timerId);
        }, gameTimerInterval);
        break;
    }
    // this.validateBorder();
  }

  up() {
    this.y = this.y - bulletSize;
    this.update();
    this.validateBorder();
  }
  down() {
    this.y = this.y + bulletSize;
    this.update();
    this.validateBorder();
  }
  left() {
    this.x = this.x - bulletSize;
    this.update();
    this.validateBorder();
  }
  right() {
    this.x = this.x + bulletSize;
    this.update();
    this.validateBorder();
  }

  validateBorder() {
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.y > map.length * cellSize ||
      this.x >= map[0].length * cellSize
    ) {
      console.log("border");
    }
  }
}
