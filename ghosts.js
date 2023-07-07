const Mode = {
  SCATTER: 0,
  CHASE: 1,
};

const timing = [
  [7 * 30, Mode.SCATTER], // 7
  [27 * 30, Mode.CHASE], // 20
  [34 * 30, Mode.SCATTER], // 7
  [54 * 30, Mode.CHASE], // 20
  [59 * 30, Mode.SCATTER], // 5
  [79 * 30, Mode.CHASE], // 20
  [84 * 30, Mode.SCATTER], // 5
  [Number.MAX_VALUE, Mode.CHASE],
];

class Ghost extends Character {
  constructor(x, y, image, tx, ty) {
    super(x, y, image);
    this.normalImage = image;
    this.blue = document.getElementById("ghosts-blue_ghost");
    this.targetX = this.homeX = tx;
    this.targetY = this.homeY = ty;
    this.outX = 13;
    this.outY = 11;
    this.out = false;
    this.flashing = false;
    this.prevMode = Mode.SCATTER;
  }

  changeDirecction() {
    let row = parseInt(this.y / blockSize);
    let col = parseInt(this.x / blockSize);
    let colOff = parseInt(this.x % blockSize);
    let rowOff = parseInt(this.y % blockSize);

    if (colOff == 0 && rowOff == 0) {
      if (!this.out && this.outY == row) {
        this.doorOpen = false;
        this.direction = Direction.LEFT;
        if (col < this.outX - 2) this.out = true;
        return;
      }
      var wall = [0];
      if (this.out || !this.doorOpen) wall.push(4);
      var possibleDirections = [];
      if (!wall.includes(map[row + 1][col])) possibleDirections.push(Direction.DOWN);
      if (!wall.includes(map[row - 1][col])) possibleDirections.push(Direction.UP);
      if (!wall.includes(map[row][col - 1])) possibleDirections.push(Direction.LEFT);
      if (!wall.includes(map[row][col + 1])) possibleDirections.push(Direction.RIGHT);

      if (this.direction == Direction.UP) possibleDirections = possibleDirections.filter((e) => e != Direction.DOWN);
      if (this.direction == Direction.DOWN) possibleDirections = possibleDirections.filter((e) => e != Direction.UP);
      if (this.direction == Direction.LEFT) possibleDirections = possibleDirections.filter((e) => e != Direction.RIGHT);
      if (this.direction == Direction.RIGHT) possibleDirections = possibleDirections.filter((e) => e != Direction.LEFT);

      possibleDirections.sort((d1, d2) => {
        return this.distanceToTarget(d1) - this.distanceToTarget(d2);
      });
      if (frightened && possibleDirections.length > 0) {
        this.speed = blockSize / 8;
        this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
      } else {
        this.direction = possibleDirections[0];
        this.speed = blockSize / 6;
      }
    }
  }

  reverse() {
    if (this.direction == Direction.UP) this.direction = Direction.DOWN;
    if (this.direction == Direction.DOWN) this.direction = Direction.UP;
    if (this.direction == Direction.LEFT) this.direction = Direction.RIGHT;
    if (this.direction == Direction.RIGHT) this.direction = Direction.LEFT;
  }

  update() {
    if (!this.doorOpen && !this.out) {
      [this.targetX, this.targetY] = [13, 11];
    } else {
      let done = false;
      for (let i = 0; i < timing.length && !done; i++) {
        const mode = timing[i];
        if (frames < mode[0]) {
          if (this.prevMode != mode[1]) {
            this.prevMode = mode[1];
            this.reverse();
          } else {
            switch (mode[1]) {
              case Mode.CHASE:
                this.updateTarget();
                break;
              case Mode.SCATTER:
                [this.targetX, this.targetY] = [this.homeX, this.homeY];
                break;
            }
          }
          done = true;
        }
      }
    }
    super.update();
  }

  distanceToTarget(d) {
    let row = parseInt(this.y / blockSize);
    let col = parseInt(this.x / blockSize);

    switch (d) {
      case Direction.DOWN:
        row++;
        break;
      case Direction.UP:
        row--;
        break;
      case Direction.LEFT:
        col--;
        break;
      case Direction.RIGHT:
        col++;
        break;
    }

    let dx = (this.out ? this.targetX : this.outX) - col;
    let dy = (this.out ? this.targetY : this.outY) - row;

    return Math.sqrt(dx * dx + dy * dy);
  }

  flash() {
    this.flashing = !this.flashing;
  }

  draw(ctx) {
    if (frightened && !this.flashing) {
      this.image = this.blue;
    } else {
      this.image = this.normalImage;
    }
    super.draw(ctx);

    if (debug) {
      ctx.beginPath();
      ctx.moveTo(this.x + blockSize / 2, this.y + blockSize / 2);
      ctx.lineTo(this.targetX * blockSize + blockSize / 2, this.targetY * blockSize + blockSize / 2);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x + blockSize / 2, this.y + blockSize / 2);
      switch (this.direction) {
        case Direction.DOWN:
          ctx.lineTo(this.x + blockSize / 2, this.y + blockSize / 2 + blockSize * 2);
          break;
        case Direction.UP:
          ctx.lineTo(this.x + blockSize / 2, this.y + blockSize / 2 - blockSize * 2);
          break;
        case Direction.LEFT:
          ctx.lineTo(this.x + blockSize / 2 - blockSize * 2, this.y + blockSize / 2);
          break;
        case Direction.RIGHT:
          ctx.lineTo(this.x + blockSize / 2 + blockSize * 2, this.y + blockSize / 2);
          break;
      }
      ctx.strokeStyle = "#00ff00";
      ctx.stroke();
    }
  }
  reset() {
    super.reset();
  }
}

class Clyde extends Ghost {
  // ORANGE
  constructor() {
    super(11, 14, document.getElementById("ghosts-clyde"), 0, map.length);
  }

  update() {
    if (!this.doorOpen) this.doorOpen = dotsEated >= 72;
    super.update();
  }

  updateTarget() {
    let [pY, pX] = player.getPosition();
    let [gY, gX] = this.getPosition();
    let [dY, dX] = [pY - gY, pX - gX];

    let d = Math.sqrt(dX * dX + dY * dY);
    if (d > 8) {
      [this.targetY, this.targetX] = [pY, pX];
    } else {
      [this.targetY, this.targetX] = [this.homeY, this.homeX];
    }
  }
}

class Inky extends Ghost {
  // BLUE
  constructor() {
    super(13, 14, document.getElementById("ghosts-inky"), map[0].length - 1, map.length);
  }

  update() {
    if (!this.doorOpen) this.doorOpen = dotsEated >= 30;
    super.update();
  }

  updateTarget() {
    let [pY, pX] = player.getPosition();
    switch (player.direction) {
      case Direction.DOWN:
        pY += 2;
        break;
      case Direction.RIGHT:
        pX += 2;
        break;
      case Direction.UP:
        pY -= 2;
      // break;
      case Direction.LEFT:
        pX -= 2;
        break;
    }
    let [gY, gX] = blinky.getPosition();
    let [dY, dX] = [pY - gY, pX - gX];
    [this.targetY, this.targetX] = [pY + dY * 2, pX + dX * 2];
  }
}

class Pinky extends Ghost {
  // PINK
  constructor() {
    super(15, 14, document.getElementById("ghosts-pinky"), 3, 0);
    this.doorOpen = true;
  }

  updateTarget() {
    [this.targetY, this.targetX] = player.getPosition();
    switch (player.direction) {
      case Direction.DOWN:
        this.targetY += 4;
        break;
      case Direction.RIGHT:
        this.targetX += 4;
        break;
      case Direction.UP:
        this.targetY -= 4;
      // break; // bug is the origial code
      case Direction.LEFT:
        this.targetX -= 4;
        break;
    }
  }
}

class Blinky extends Ghost {
  // RED
  constructor() {
    super(13, 11, document.getElementById("ghosts-blinky"), map[0].length - 3, 0);
  }

  updateTarget() {
    [this.targetY, this.targetX] = player.getPosition();
  }

  reset() {
    super.reset();
    this.x = 13 * blockSize;
    this.y = 13 * blockSize;
    this.direction = Direction.UP;
    this.doorOpen = true;
    this.out = false;
  }
}
