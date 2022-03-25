import { map, mapLegend } from "./map.js";
import { cellSize, bulletSize, gameTimerInterval } from "./conf.js";
import Point from "./Point.js";

export default class Bullet {
  constructor(x, y, direction, tank) {
    this.elem = document.createElement("div");
    this.pos = new Point(x, y);
    this.tank = tank;
    this.direction = direction;
    this.timerId = null;
    this.draw();
    this.style();
    this.update();
    this.addBulletToMap();
    this.move();
  }

  draw() {
    let dif = cellSize - bulletSize;
    switch (this.direction) {
      case "up":
        this.pos.y -= bulletSize + 1;
        this.pos.x += dif / 2;
        break;
      case "down":
        this.pos.x += dif / 2;
        this.pos.y += cellSize + 1;
        break;
      case "left":
        this.pos.x -= bulletSize + 1;
        this.pos.y += dif / 2;
        break;
      case "right":
        this.pos.x += cellSize + 1;
        this.pos.y += dif / 2;
        break;
    }
  }

  isPosibleMove() {
    let res = true;
    if (
      this.pos.x <= 0 ||
      this.pos.x + bulletSize >= map[0].length * cellSize ||
      this.pos.y <= 0 ||
      this.pos.y + bulletSize >= map.length * cellSize
    ) {
      res = false;
    } else if (
      map[Math.floor(this.pos.y / cellSize)][
        Math.floor(this.pos.x / cellSize)
      ] === mapLegend.wall ||
      map[Math.floor((this.pos.y + bulletSize) / cellSize)][
        Math.floor((this.pos.x + bulletSize) / cellSize)
      ] === mapLegend.wall
    ) {
      res = false;
    } else if (
      map[Math.floor(this.pos.y / cellSize)][
        Math.floor(this.pos.x / cellSize)
      ] === mapLegend.enemyBase ||
      map[Math.floor((this.pos.y + bulletSize) / cellSize)][
        Math.floor((this.pos.x + bulletSize) / cellSize)
      ] === mapLegend.enemyBase
    ) {
      res = false;
    } else if (
      map[Math.floor(this.pos.y / cellSize)][
        Math.floor(this.pos.x / cellSize)
      ] === mapLegend.playerBase ||
      map[Math.floor((this.pos.y + bulletSize) / cellSize)][
        Math.floor((this.pos.x + bulletSize) / cellSize)
      ] === mapLegend.playerBase
    ) {
      res = false;
    }
    return res;
  }

  validate(gameObjects) {
    let result = { res: true };
    if (
      this.pos.x <= 0 ||
      this.pos.x + bulletSize >= map[0].length * cellSize ||
      this.pos.y <= 0 ||
      this.pos.y + bulletSize >= map.length * cellSize
    ) {
      result.res = false;
    } else {
      gameObjects.forEach((gameObject) => {
        if (Point.colision(this.pos, bulletSize, gameObject.pos, cellSize)) {
          result.res = false;
          result.gameObject = gameObject;
        }
      });
    }
    return result;
  }

  style() {
    this.elem.classList.add("bullet");
  }

  addBulletToMap() {
    let gameMap = document.querySelector("#game-map");
    gameMap.appendChild(this.elem);
  }

  update() {
    this.elem.style["top"] = `${this.pos.y}px`;
    this.elem.style["left"] = `${this.pos.x}px`;
  }

  move() {
    switch (this.direction) {
      case "up":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.up();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "down":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.down();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "left":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.left();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
      case "right":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.right();
          }
        }, gameTimerInterval / cellSize / 2);
        // setTimeout(() => {
        //   clearInterval(timerId);
        // }, gameTimerInterval);
        break;
    }
  }

  up() {
    this.pos.y = this.pos.y - 1; // bulletSize;
    this.update();
    // playerTank.validateBorder();
  }
  down() {
    this.pos.y = this.pos.y + 1;
    this.update();
    // playerTank.validateBorder();
  }
  left() {
    this.pos.x = this.pos.x - 1;
    this.update();
    // playerTank.validateBorder();
  }
  right() {
    this.pos.x = this.pos.x + 1;
    this.update();
    // playerTank.validateBorder();
  }
}
