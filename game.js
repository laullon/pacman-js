const Map = {
  WALL: 0,
  DOT: 1,
  POWER: 2,
  EMPTY: 3,
  DOOR: 4,
};

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 3, 0, 0, 0, 4, 4, 0, 0, 0, 3, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var pendingDots;
var points;
var dotsEated;
var frames;
var frightened;

const debug = false;

const blockSize = 24; // 800/23

const player = new PacMan();
const blinky = new Blinky();
const ghosts = [new Clyde(), new Inky(), new Pinky(), blinky];
const entities = [...ghosts, player];
// const entities = [new Blinky(), player];

function gameLoop() {
  if (!frightened) {
    frames++;
  }
  update();
  checkEndGame();
  draw();
}

function draw() {
  var canvas = document.getElementById("screen");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  drawEntities(ctx);
}

function update() {
  entities.forEach((element) => {
    element.update();
  });
}

function drawEntities(ctx) {
  entities.forEach((element) => {
    element.draw(ctx);
  });
}

function drawWall(ctx, x, y) {
  var bs = blockSize / 3;
  ctx.fillStyle = "rgb(0,0,200)";
  ctx.fillRect(x * blockSize + bs, y * blockSize + bs, bs, bs);
  if (x != map[y].length - 1 && map[y][x + 1] == 0) {
    ctx.fillRect(x * blockSize + bs * 2, y * blockSize + bs * 1, bs, bs);
  }
  if (x != 0 && map[y][x - 1] == 0) {
    ctx.fillRect(x * blockSize + bs * 0, y * blockSize + bs * 1, bs, bs);
  }
  if (y != map.length - 1 && map[y + 1][x] == 0) {
    ctx.fillRect(x * blockSize + bs * 1, y * blockSize + bs * 2, bs, bs);
  }
  if (y != 0 && map[y - 1][x] == 0) {
    ctx.fillRect(x * blockSize + bs * 1, y * blockSize + bs * 0, bs, bs);
  }
}

function drawDoor(ctx, x, y) {
  var bs = blockSize / 3;
  ctx.fillStyle = "rgb(200,200,00)";
  ctx.fillRect(x * blockSize, y * blockSize + bs, blockSize, bs);
}

function drawPoint(ctx, x, y) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.beginPath();
  ctx.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 8, 0, 2 * Math.PI);
  ctx.fill();
}

function drawPowerUp(ctx, x, y) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.beginPath();
  ctx.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 3, 0, 2 * Math.PI);
  ctx.fill();
}

function drawMap(ctx) {
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < 28; x++) {
      switch (map[y][x]) {
        case 0:
          drawWall(ctx, x, y);
          break;
        case 1:
          if (pendingDots[y][x]) {
            drawPoint(ctx, x, y);
          }
          break;
        case 2:
          if (pendingDots[y][x]) {
            drawPowerUp(ctx, x, y);
          }
          break;
        case 4:
          drawDoor(ctx, x, y);
          break;
        default:
          break;
      }
    }
  }
}

function checkKey(e) {
  if (!e.repeat) {
    player.checkKey(e);
  }
}

function clearKey() {
  player.clearKey();
}

function init() {
  points = 0;
  frames = 0;
  dotsEated = 0;
  frightened = false;
  pendingDots = [];
  for (var y = 0; y < map.length; y++) {
    pendingDots.push([]);
    for (var x = 0; x < 28; x++) {
      if (map[y][x] == Map.DOT || map[y][x] == Map.POWER) {
        pendingDots[y].push(true);
      } else {
        pendingDots[y].push(false);
      }
    }
  }
}

function checkEndGame() {
  const [row, col] = player.getPosition();
  if (pendingDots[row][col]) {
    points++;
    dotsEated++;
    pendingDots[row][col] = false;

    if (map[row][col] == Map.POWER) {
      frightened = true;
      ghosts.forEach((ghost) => {
        ghost.reverse();
      });
      setTimeout(() => (frightened = false), 7000);
      setTimeout(() => flash(), 4500);
    }
  }

  let count = 0;
  pendingDots.forEach((row) => {
    row.forEach((dot) => {
      if (dot) count++;
    });
  });
  if (count == 0) clearInterval(gameTimer);

  document.getElementById("points").textContent = points;
}

function flash() {
  if (frightened) {
    ghosts.forEach((ghost) => {
      ghost.flash();
    });
    setTimeout(() => flash(), 250);
  }
}

var gameTimer;
function game() {
  init();
  gameTimer = setInterval(gameLoop, 1000 / 30);
  document.addEventListener("keydown", checkKey);
  document.addEventListener("keyup", clearKey);
}
