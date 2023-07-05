const Direction = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3,
}

class Character {
    constructor(x,y, image) {
        var x, y, image;
        this.x = x * blockSize;
        this.y = y * blockSize;
        this.image = image;
        this.speed = 1;
        this.direction = Direction.RIGHT;
        this.nextDirection = Direction.RIGHT;
    }
    
    draw(ctx){
        ctx.drawImage(this.image, this.x-2, this.y-2, blockSize+4, blockSize+4)
    }
    
    update() {
        this.move();
        this.changeDirecction();
    }
    
    move() {
        let oldX = this.x;
        let oldY = this.y;
        
        switch(this.direction) {
            case Direction.DOWN:
            this.y += this.speed;
            break;
            case Direction.UP:
            this.y -= this.speed;
            break;
            case Direction.RIGHT:
            this.x += this.speed
            break;
            case Direction.LEFT:
            this.x -= this.speed
            break;
        }
        
        let row = parseInt(this.y / blockSize);
        let col = parseInt(this.x /blockSize);
        let colOff = parseInt(this.x % blockSize);
        let rowOff = parseInt(this.y % blockSize);
        
        if(this.direction==Direction.RIGHT){
            if (colOff!=0) {
                col++;
            }
        }
        
        if(this.direction==Direction.DOWN){
            if (rowOff!=0) {
                row++;
            }
        }
        
        if (map[row][col] == 0) {
            this.x = oldX;
            this.y = oldY;
        }

        if (col<0) {
            this.x = map[0].length*blockSize;
        } else if (col>map[0].length) {
            this.x = -blockSize;
        }
    }
    
    changeDirecction() {
        if (this.direction == this.nextDirection) return;
        let row = parseInt(this.y / blockSize);
        let col = parseInt(this.x /blockSize);
        let colOff = parseInt(this.x % blockSize);
        let rowOff = parseInt(this.y % blockSize);
        if((colOff==0) && (rowOff==0)) {
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
            if (map[row][col] != 0) {
                this.direction=this.nextDirection;
            }
        }        
    }
}

class PacMan extends Character {
    frame = 0;
    images = [
        [
            document.getElementById("pacman-right-1"),
            document.getElementById("pacman-right-2"),
            document.getElementById("pacman-right-3")
        ],
        [
            document.getElementById("pacman-down-1"),
            document.getElementById("pacman-down-2"),
            document.getElementById("pacman-down-3")
        ],
        [
            document.getElementById("pacman-left-1"),
            document.getElementById("pacman-left-2"),
            document.getElementById("pacman-left-3")
        ],
        [
            document.getElementById("pacman-up-1"),
            document.getElementById("pacman-up-2"),
            document.getElementById("pacman-up-3")
        ],
    ];
    
    constructor() {
        super(13, 23, null);
        this.speed = 2;
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

    clearKey(){
        this.nextDirection = this.direction;
    }
    
    update() {
        super.update()
        this.frame +=1;
        this.frame %=3;
        this.image = this.images[this.direction][this.frame];
    }
}

class Ghost extends Character {
    changeDirecction() {
        super.changeDirecction();
        this.nextDirection = Math.floor(Math.random() * 4);
    }
}

class Clyde extends Ghost {
    constructor() {
        super(11, 14, document.getElementById("ghosts-clyde"));
    }    
}

class Inky extends Ghost {
    constructor() {
        super(13, 14, document.getElementById("ghosts-inky"));
    }    
}

class Pinky extends Ghost {
    constructor() {
        super(15, 14, document.getElementById("ghosts-pinky"));
    }    
}