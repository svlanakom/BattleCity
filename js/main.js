import { map, mapLegend, cellSize } from "./map.js";
import PlayerTank from "./PlayerTank.js";
import EnemyTank from "./EnemyTank.js";
const gameTimerInterval = 1000;
let playerLifeCount = 3;
let enemyTanksCount = 21;
let isGameOver = false;
let isPlayerTankMove = false;
let playerTank;
const enemyTanks = [];

let bullet = false;

gameInitialization();

setTimeout(function () {
  gameLoop();
}, gameTimerInterval);

function gameInitialization() {
  let gameMap = document.querySelector("#game-map");

  enemyTanks.splice(0, enemyTanks.length);

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === mapLegend.wall) {
        gameMap.innerHTML += `<div class='game-object game-object__wall' 
            style='position: absolute; top: ${i * cellSize}px; left: ${
          j * cellSize
        }px;'></div>`;
      } else if (map[i][j] === mapLegend.playerBase) {
        playerTank = new PlayerTank(j * cellSize, i * cellSize);
      } else if (map[i][j] === mapLegend.enemyBase) {
        enemyTanks.push(new EnemyTank(j * cellSize, i * cellSize));
      }
    }
  }
  gameMap.appendChild(playerTank.elem);
  playerTank.update();
  enemyTanks.forEach((tank) => {
    gameMap.appendChild(tank.elem);
  });
  enemyTanks.forEach((tank) => {
    tank.update();
  });

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === " ") {
        if (playerTank.isFiring === false) {
          bullet = playerTank.fire();
        }
      } else {
        playerTank.changeDirection(event);
        isPlayerTankMove = true;
      }
    },
    false
  );
}

function gameLoop() {
  if (isGameOver !== true) {
    gameStep();

    setTimeout(function () {
      gameLoop();
    }, gameTimerInterval);
  }
}

function gameStep() {
  enemyTanks.forEach((tank) => {
    tank.move();
  });
  if (isPlayerTankMove) {
    playerTank.move();
    isPlayerTankMove = false;
  }
  if (bullet) {
    bullet.move();
  }

  // playerTank.move();
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

export { gameTimerInterval };
