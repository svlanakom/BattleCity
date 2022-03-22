import { map, mapLegend } from "./map.js";
import { cellSize, bulletSize, gameTimerInterval } from "./conf.js";

export default class Bullet {
  constructor(x, y, direction, tank) {
    this.elem = document.createElement("div");
    this.x = x;
    this.y = y;
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
        this.y -= bulletSize + 1;
        this.x += dif / 2;
        break;
      case "down":
        this.x += dif / 2;
        this.y += cellSize + 1;
        break;
      case "left":
        this.x -= bulletSize + 1;
        this.y += dif / 2;
        break;
      case "right":
        this.x += cellSize + 1;
        this.y += dif / 2;
        break;
    }
  }

  isPosibleMove() {
    let res = true;
    if (
      this.x <= 0 ||
      this.x + bulletSize >= map[0].length * cellSize ||
      this.y <= 0 ||
      this.y + bulletSize >= map.length * cellSize
    ) {
      res = false;
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.wall ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.wall
    ) {
      res = false;
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.enemyBase ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.enemyBase
    ) {
      res = false;
    } else if (
      map[Math.floor(this.y / cellSize)][Math.floor(this.x / cellSize)] ===
        mapLegend.playerBase ||
      map[Math.floor((this.y + bulletSize) / cellSize)][
        Math.floor((this.x + bulletSize) / cellSize)
      ] === mapLegend.playerBase
    ) {
      res = false;
    }
    return res;
  }

  validate(gameObjects) {
    let result = { res: true };
    if (
      this.x <= 0 ||
      this.x + bulletSize >= map[0].length * cellSize ||
      this.y <= 0 ||
      this.y + bulletSize >= map.length * cellSize
    ) {
      result.res = false;
    } else {
      gameObjects.forEach((gameObject) => {
        let [x1, y1] = [
          Math.floor(this.x / cellSize),
          Math.floor(this.y / cellSize),
        ];
        let [x2, y2] = [
          Math.floor((this.x + bulletSize) / cellSize),
          Math.floor((this.y + bulletSize) / cellSize),
        ];
        if (
          (gameObject.mapRow === x1 && gameObject.mapColumn === y1) ||
          (gameObject.mapRow === x2 && gameObject.mapColumn === y2)
        ) {
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
    this.elem.style["top"] = `${this.y}px`;
    this.elem.style["left"] = `${this.x}px`;
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

        break;
      case "down":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.down();
          }
        }, gameTimerInterval / cellSize / 2);

        break;
      case "left":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.left();
          }
        }, gameTimerInterval / cellSize / 2);

        break;
      case "right":
        this.timerId = setInterval(() => {
          if (!this.isPosibleMove()) {
          } else {
            this.right();
          }
        }, gameTimerInterval / cellSize / 2);

        break;
    }
  }

  up() {
    this.y = this.y - 1;
    this.update();
  }
  down() {
    this.y = this.y + 1;
    this.update();
  }
  left() {
    this.x = this.x - 1;
    this.update();
  }
  right() {
    this.x = this.x + 1;
    this.update();
  }
}
