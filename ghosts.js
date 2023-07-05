class Ghost extends Character {
  constructor(x, y, image, tx, ty) {
    super(x, y, image);
    this.targetX = tx;
    this.targetY = ty;
    this.outX = 13;
    this.outY = 11;
    this.out = false;
  }

  changeDirecction() {
    let row = parseInt(this.y / blockSize);
    let col = parseInt(this.x / blockSize);
    let colOff = parseInt(this.x % blockSize);
    let rowOff = parseInt(this.y % blockSize);

    if (colOff == 0 && rowOff == 0) {
      if (!this.out && this.outX == col && this.outY == row) this.out = true;
      var wall = [0];
      if (this.out) wall.push(4);
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
      this.direction = possibleDirections[0];
    }
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

  draw(ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + blockSize / 2, this.y + blockSize / 2);
    ctx.lineTo(this.targetX * blockSize + blockSize / 2, this.targetY * blockSize + blockSize / 2);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
}

class Clyde extends Ghost {
  // ORANGE
  constructor() {
    super(11, 14, document.getElementById("ghosts-clyde"), 0, map.length);
  }
}

class Inky extends Ghost {
  // BLUE
  constructor() {
    super(13, 14, document.getElementById("ghosts-inky"), map[0].length - 1, map.length);
  }
}

class Pinky extends Ghost {
  // PINK
  constructor() {
    super(15, 14, document.getElementById("ghosts-pinky"), 3, 0);
  }

  update() {
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
    super.update();
  }
}

class Blinky extends Ghost {
  // RED
  constructor() {
    super(13, 11, document.getElementById("ghosts-blinky"), map[0].length - 3, 0);
    this.out = true;
  }

  update() {
    [this.targetY, this.targetX] = player.getPosition();
    super.update();
  }
}
