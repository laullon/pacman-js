const Direction = {
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
};

const characterOff = blockSize / 6;
const characterSize = blockSize + characterOff * 2;

class Character {
  constructor(x, y, image) {
    this.orgX = this.x = x * blockSize;
    this.orgY = this.y = y * blockSize;
    this.image = image;
    this.speed = blockSize / 6;
    this.direction = this.nextDirection = Direction.LEFT;
    this.doorOpen = false;
  }

  draw(ctx) {
    const [x, y, w, h] = this.getRect();
    ctx.drawImage(this.image, x, y, w, h);
  }

  getRect() {
    return [this.x - characterOff, this.y - characterOff, characterSize, characterSize];
  }

  update() {
    this.move();
    this.changeDirecction();
  }

  move() {
    let oldX = this.x;
    let oldY = this.y;

    switch (this.direction) {
      case Direction.DOWN:
        this.y += this.speed;
        break;
      case Direction.UP:
        this.y -= this.speed;
        break;
      case Direction.RIGHT:
        this.x += this.speed;
        break;
      case Direction.LEFT:
        this.x -= this.speed;
        break;
    }

    let row = parseInt(this.y / blockSize);
    let col = parseInt(this.x / blockSize);
    let colOff = parseInt(this.x % blockSize);
    let rowOff = parseInt(this.y % blockSize);

    if (this.direction == Direction.RIGHT) {
      if (colOff != 0) {
        col++;
      }
    }

    if (this.direction == Direction.DOWN) {
      if (rowOff != 0) {
        row++;
      }
    }

    let walls = [Map.WALL];
    if (!this.doorOpen) walls.push(Map.DOOR);
    if (walls.includes(map[row][col])) {
      this.x = oldX;
      this.y = oldY;
    }

    if (col < 0) {
      this.x = map[0].length * blockSize;
    } else if (col > map[0].length) {
      this.x = -blockSize;
    }
  }

  changeDirecction() {
    if (this.direction == this.nextDirection) return;
    let row = parseInt(this.y / blockSize);
    let col = parseInt(this.x / blockSize);
    let colOff = parseInt(this.x % blockSize);
    let rowOff = parseInt(this.y % blockSize);
    if (
      (colOff == 0 && rowOff == 0) ||
      (this.direction == Direction.LEFT && this.nextDirection == Direction.RIGHT) ||
      (this.direction == Direction.RIGHT && this.nextDirection == Direction.LEFT) ||
      (this.direction == Direction.UP && this.nextDirection == Direction.DOWN) ||
      (this.direction == Direction.DOWN && this.nextDirection == Direction.UP)
    ) {
      switch (this.nextDirection) {
        case Direction.DOWN:
          row++;
          break;
        case Direction.UP:
          row--;
          break;
        case Direction.RIGHT:
          col++;
          break;
        case Direction.LEFT:
          col--;
          break;
      }
      let walls = [Map.WALL];
      if (!this.doorOpen) walls.push(Map.DOOR);
      if (!walls.includes(map[row][col])) {
        this.direction = this.nextDirection;
      }
    }
  }

  getPosition() {
    return [parseInt((this.y + blockSize / 2) / blockSize), parseInt((this.x + blockSize / 2) / blockSize)];
  }

  reset() {
    this.x = this.orgX;
    this.y = this.orgY;
    this.direction = Direction.LEFT;
  }
}

class PacMan extends Character {
  frame = 0;
  images = [
    [
      document.getElementById("pacman-right-1"),
      document.getElementById("pacman-right-2"),
      document.getElementById("pacman-right-3"),
    ],
    [
      document.getElementById("pacman-down-1"),
      document.getElementById("pacman-down-2"),
      document.getElementById("pacman-down-3"),
    ],
    [
      document.getElementById("pacman-left-1"),
      document.getElementById("pacman-left-2"),
      document.getElementById("pacman-left-3"),
    ],
    [
      document.getElementById("pacman-up-1"),
      document.getElementById("pacman-up-2"),
      document.getElementById("pacman-up-3"),
    ],
  ];

  constructor() {
    super(13, 23, null);
    this.update();
  }

  checkKey(event) {
    var code = event.code;
    switch (code) {
      case "ArrowUp":
        this.nextDirection = Direction.UP;
        break;
      case "ArrowDown":
        this.nextDirection = Direction.DOWN;
        break;
      case "ArrowLeft":
        this.nextDirection = Direction.LEFT;
        break;
      case "ArrowRight":
        this.nextDirection = Direction.RIGHT;
        break;
    }
  }

  clearKey() {
    this.nextDirection = this.direction;
  }

  update() {
    super.update();
    this.frame += 1;
    this.frame %= 6;
    this.image = this.images[this.direction][parseInt(this.frame / 2)];
  }
}
