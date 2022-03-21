import { map, mapLegend } from "./map.js";
import { cellSize, gameTimerInterval, moveKeys } from "./conf.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";
import Wall from "./Wall.js";

export default class Game {
  constructor(gameMap) {
    this.gameMap = gameMap;
    this.walls = [];
    this.playerTank;
    this.enemyTanks = [];
    this.isGameOver = false;
    this.isPlayerTankMove = false;
    this.playerLifeCount = 3;
    this.enemyTanksCount = 21;
    this.enemyTanksBases = [];
    this.playerTankBase = null;
    this.bullets = [];

    this.gameInitialization();
  }

  start() {
    setTimeout(() => {
      this.gameLoop();
    }, gameTimerInterval);
  }

  gameInitialization() {
    let baseId = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === mapLegend.wall) {
          this.walls.push(new Wall(j * cellSize, i * cellSize));
        } else if (map[i][j] === mapLegend.playerBase) {
          this.playerTank = new PlayerTank(j * cellSize, i * cellSize);
          this.playerTankBase = [j, i];
        } else if (map[i][j] === mapLegend.enemyBase) {
          this.enemyTanks.push(
            new EnemyTank(j * cellSize, i * cellSize, baseId)
          );
          this.enemyTanksCount--;
          this.enemyTanksBases.push([j, i]);
          baseId++;
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
    this.walls.forEach((wall) => {
      this.gameMap.appendChild(wall.elem);
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === " ") {
          if (this.playerTank.isFiring === false && !this.playerTank.bullet) {
            this.bullets.push(this.playerTank.fire());
          }
        } else if (moveKeys.includes(event.key)) {
          this.playerTank.changeDirection(event);
          this.isPlayerTankMove = true;
        }
      },
      false
    );
  }

  // validateBulets() {
  //     for (let index = 0; index < this.bullets.length;) {
  //         if (!this.bullets[index].validate().res) {
  //             if (this.bullets[index].validate().type === "wall") {
  //                 let [x1, y1] = [Math.floor(this.bullets[index].x / cellSize), Math.floor(this.bullets[index].y / cellSize)];
  //                 let [x2, y2] = [Math.floor((this.bullets[index].x + bulletSize) / cellSize), Math.floor((this.bullets[index].y + bulletSize) / cellSize)];
  //                 for (let i = 0; i < this.walls.length; ) {
  //                     if ((this.walls[i].mapRow === x1 && this.walls[i].mapColumn === y1) ||
  //                         (this.walls[i].mapRow === x2 && this.walls[i].mapColumn === y2)) {

  //                         map[this.walls[i].mapColumn][this.walls[i].mapRow] = 0;
  //                         this.walls[i].elem.remove();
  //                         this.walls[i] = null;
  //                         this.walls.splice(i, 1);
  //                         break;
  //                     } else {
  //                         i++;
  //                     }
  //                 }
  //             } else if (this.bullets[index].validate().type === "enemy") {
  //                 let [x1, y1] = [Math.floor(this.bullets[index].x / cellSize), Math.floor(this.bullets[index].y / cellSize)];
  //                 let [x2, y2] = [Math.floor((this.bullets[index].x + bulletSize) / cellSize), Math.floor((this.bullets[index].y + bulletSize) / cellSize)];
  //                 for (let i = 0; i < this.enemyTanks.length; ) {
  //                     if (((this.enemyTanks[i].mapRow === x1 && this.enemyTanks[i].mapColumn === y1) ||
  //                         (this.enemyTanks[i].mapRow === x2 && this.enemyTanks[i].mapColumn === y2)) &&
  //                         this.bullets[index].tank === this.playerTank) {

  //                         map[this.enemyTanks[i].mapColumn][this.enemyTanks[i].mapRow] = 0;
  //                         this.enemyTanks[i].elem.remove();
  //                         this.enemyTanks[i] = null;
  //                         this.enemyTanks.splice(i, 1);

  //                         if (this.enemyTanksCount > 0) {
  //                             let enemy = new EnemyTank(this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][0] * cellSize, this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][1] * cellSize, this.enemyTanks[i].enemyBaseId);
  //                             this.enemyTanksCount--;
  //                             map[enemy.mapColumn][enemy.mapRow] = enemy.mark;
  //                             this.gameMap.appendChild(enemy.elem);
  //                             enemy.update();
  //                             this.enemyTanks.push(enemy);
  //                         }
  //                         break;
  //                     } else {
  //                         i++;
  //                     }
  //                 }
  //                 if (((this.playerTank.mapRow === x1 && this.playerTank.mapColumn === y1) ||
  //                     (this.playerTank.mapRow === x2 && this.playerTank.mapColumn === y2)) &&
  //                     this.playerTank !== this.bullets[index].tank) {
  //                     map[this.playerTank.mapColumn][this.playerTank.mapRow] = 0;
  //                     this.playerTank.elem.remove();
  //                     this.playerTank = new PlayerTank(this.playerTankBase[0] * cellSize, this.playerTankBase[1] * cellSize);
  //                     this.playerLifeCount--;
  //                     map[this.playerTank.mapColumn][this.playerTank.mapRow] = this.playerTank.mark;
  //                     this.gameMap.appendChild(this.playerTank.elem);
  //                     this.playerTank.update();
  //                 }
  //             }
  //             clearInterval(this.bullets[index].timerId);
  //             this.bullets[index].elem.remove();
  //             this.bullets[index] = null;
  //             this.bullets.splice(index, 1);
  //         } else {
  //             index++;
  //         }
  //     }
  // }

  remove(gameObject, bullet) {
    if (gameObject === this.playerTank && bullet.tank !== this.playerTank) {
      map[this.playerTank.mapColumn][this.playerTank.mapRow] = 0;
      this.playerTank.elem.remove();
      this.playerTank = new PlayerTank(
        this.playerTankBase[0] * cellSize,
        this.playerTankBase[1] * cellSize
      );
      this.playerLifeCount--;
      map[this.playerTank.mapColumn][this.playerTank.mapRow] =
        this.playerTank.mark;
      this.gameMap.appendChild(this.playerTank.elem);
      this.playerTank.update();
    } else if (
      this.enemyTanks.includes(gameObject) &&
      !this.enemyTanks.includes(bullet.tank)
    ) {
      let i = this.enemyTanks.indexOf(gameObject);

      if (this.enemyTanksCount > 0) {
        let enemy = new EnemyTank(
          this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][0] * cellSize,
          this.enemyTanksBases[this.enemyTanks[i].enemyBaseId][1] * cellSize,
          this.enemyTanks[i].enemyBaseId
        );
        this.enemyTanksCount--;
        map[enemy.mapColumn][enemy.mapRow] = enemy.mark;
        this.gameMap.appendChild(enemy.elem);
        enemy.update();
        this.enemyTanks.push(enemy);
      }

      map[this.enemyTanks[i].mapColumn][this.enemyTanks[i].mapRow] = 0;
      this.enemyTanks[i].elem.remove();
      this.enemyTanks[i] = null;
      this.enemyTanks.splice(i, 1);
    } else if (this.walls.includes(gameObject)) {
      let i = this.walls.indexOf(gameObject);

      map[this.walls[i].mapColumn][this.walls[i].mapRow] = 0;
      this.walls[i].elem.remove();
      this.walls[i] = null;
      this.walls.splice(i, 1);
    }
  }

  gameStep() {
    if (this.bullets) {
      for (let i = 0; i < this.bullets.length; ) {
        let result = this.bullets[i].validate([
          this.playerTank,
          ...this.enemyTanks,
          ...this.walls,
        ]);
        if (!result.res) {
          if (result.gameObject) {
            this.remove(result.gameObject, this.bullets[i]);
          }
          clearInterval(this.bullets[i].timerId);
          this.bullets[i].elem.remove();
          this.bullets[i] = null;
          this.bullets.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    if (this.enemyTanks.length === 0) {
      alert("Wictory!");
      location.reload();
    } else if (this.playerLifeCount === 0) {
      alert("You lose!");
      location.reload();
    }
    if (this.isPlayerTankMove) {
      this.playerTank.move();
      this.isPlayerTankMove = false;
    }
    this.enemyTanks.forEach((tank) => {
      tank.move();
      if (Math.random() < 0.2) {
        this.bullets.push(tank.fire());
      }
    });

    /**
     * это то самое место, где стоит делать основные шаги игрового цикла
     * например, как нам кажется, можно было бы сделать следующее
     * 1. передвинуть пули
     * 2. рассчитать, где танки окажутся после этого шага
     * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
     * 4. убрать с поля мертвые танки и разрушенные стены
     * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
     * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
     */
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
