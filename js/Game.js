import {
  map,
  mapLegend,
  cellSize,
  gameTimerInterval,
  bulletSize,
} from "./map.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";

export default class Game {
  constructor(gameMap) {
    this.gameMap = gameMap;
    this.playerTank;
    this.enemyTanks = [];
    this.isGameOver = false;
    this.isPlayerTankMove = false;

    this.gameInitialization();
  }

  start() {
    setTimeout(() => {
      this.gameLoop();
    }, gameTimerInterval);
  }

  gameInitialization() {
    // let gameMap = document.querySelector("#game-map");

    this.enemyTanks.splice(0, this.enemyTanks.length);

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === mapLegend.wall) {
          this.gameMap.innerHTML += `<div class="game-object game-object__wall wall${i}${j}"
                        style='position: absolute; top: ${
                          i * cellSize
                        }px; left: ${j * cellSize}px;'></div>`;
        } else if (map[i][j] === mapLegend.playerBase) {
          this.playerTank = new PlayerTank(j * cellSize, i * cellSize);
        } else if (map[i][j] === mapLegend.enemyBase) {
          this.enemyTanks.push(new EnemyTank(j * cellSize, i * cellSize));
        }
      }
    }
    this.gameMap.appendChild(this.playerTank.elem);
    this.playerTank.update();
    this.enemyTanks.forEach((tank) => {
      this.gameMap.appendChild(tank.elem);
    });
    this.enemyTanks.forEach((tank) => {
      tank.update();
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === " ") {
          if (this.playerTank.isFiring === false && !this.playerTank.bullet) {
            this.playerTank.fire();
          }
        } else {
          this.playerTank.changeDirection(event);
          this.isPlayerTankMove = true;
        }
      },
      false
    );
  }

  gameStep() {
    this.enemyTanks.forEach((tank) => {
      tank.move();
      if (Math.random() < 0.1) {
        tank.fire();
      }
      if (tank.bullets) {
        for (let index = 0; index < tank.bullets.length; ) {
          if (!tank.bullets[index].validate().res) {
            if (tank.bullets[index].validate().type === "wall") {
              let [x, y] = [tank.bullets[index].x, tank.bullets[index].y];
              let wall = this.gameMap.getElementsByClassName(
                `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
              );
              if (wall.length === 0) {
                [x, y] = [
                  tank.bullets[index].x + bulletSize,
                  tank.bullets[index].y + bulletSize,
                ];
                wall = this.gameMap.getElementsByClassName(
                  `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
                );
              }
              wall[0].remove();
              map[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = 0;
            }
            tank.bullets[index].el.remove();
            tank.bullets[index] = null;
            tank.bullets.splice(index, 1);
          } else {
            tank.bullets[index].move();
            index++;
          }
        }
      }
    });
    if (this.isPlayerTankMove) {
      this.playerTank.move();
      this.isPlayerTankMove = false;
    }
    if (this.playerTank.bullets) {
      for (let index = 0; index < this.playerTank.bullets.length; ) {
        if (!this.playerTank.bullets[index].validate().res) {
          if (this.playerTank.bullets[index].validate().type === "wall") {
            let [x, y] = [
              this.playerTank.bullets[index].x,
              this.playerTank.bullets[index].y,
            ];
            let wall = this.gameMap.getElementsByClassName(
              `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
            );
            if (wall.length === 0) {
              [x, y] = [
                this.playerTank.bullets[index].x + bulletSize,
                this.playerTank.bullets[index].y + bulletSize,
              ];
              wall = this.gameMap.getElementsByClassName(
                `wall${Math.floor(y / cellSize)}${Math.floor(x / cellSize)}`
              );
            }
            wall[0].remove();
            map[Math.floor(y / cellSize)][Math.floor(x / cellSize)] = 0;
          }
          this.playerTank.bullets[index].el.remove();
          this.playerTank.bullets[index] = null;
          this.playerTank.bullets.splice(index, 1);
        } else {
          this.playerTank.bullets[index].move();
          index++;
        }
      }
      // console.log(playerTank.bullets.length);
    }

    // playerTank.move();
  }

  gameLoop() {
    if (this.isGameOver !== true) {
      this.gameStep();

      setTimeout(() => {
        this.gameLoop();
      }, gameTimerInterval);
    }
  }
}
