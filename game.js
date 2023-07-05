/*
* 0 = wall
* 1 = dot
* 2 = power up
* 3 = empty
* 4 = door
*/
const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
    [3,3,3,3,3,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,3,3,3,3,3],
    [3,3,3,3,3,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,3,3,3,3,3],
    [3,3,3,3,3,0,1,0,0,3,0,0,0,4,4,0,0,0,3,0,0,1,0,3,3,3,3,3],
    [0,0,0,0,0,0,1,0,0,3,0,3,3,3,3,3,3,0,3,0,0,1,0,0,0,0,0,0],
    [3,3,3,3,3,3,1,3,3,3,0,3,3,3,3,3,3,0,3,3,3,1,3,3,3,3,3,3],
    [0,0,0,0,0,0,1,0,0,3,0,3,3,3,3,3,3,0,3,0,0,1,0,0,0,0,0,0],
    [3,3,3,3,3,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,3,3,3,3,3],
    [3,3,3,3,3,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,3,3,3,3,3],
    [3,3,3,3,3,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,3,3,3,3,3],
    [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,2,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
    [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const blockSize = 20; // 800/23

const entities = [new PacMan(), new Clyde(), new Inky(), new Pinky()];
const player = entities[0];

function gameLoop() {
    
    update();
    draw();
}

function draw(){
    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx);
    drawEntities(ctx);
}

function update(){
    entities.forEach(element => {
        element.update();
    });
}

function drawEntities(ctx) {
    entities.forEach(element => {
        element.draw(ctx);
    });
}

function drawWall(ctx,x,y) {
    var bs = blockSize/3;
    ctx.fillStyle = "rgb(0,0,200)";
    ctx.fillRect(x*blockSize+bs,y*blockSize+bs,bs,bs);
    if ((x!=map[y].length-1) && (map[y][x+1]==0)) {
        ctx.fillRect(x*blockSize+bs*2,y*blockSize+bs*1,bs,bs);
    }
    if ((x!=0) && (map[y][x-1]==0)) {
        ctx.fillRect(x*blockSize+bs*0,y*blockSize+bs*1,bs,bs);
    }
    if ((y!=map.length-1) && (map[y+1][x]==0)) {
        ctx.fillRect(x*blockSize+bs*1,y*blockSize+bs*2,bs,bs);
    }
    if ((y!=0) && (map[y-1][x]==0)) {
        ctx.fillRect(x*blockSize+bs*1,y*blockSize+bs*0,bs,bs);
    }
}

function drawDoor(ctx,x,y) {
    var bs = blockSize/3;
    ctx.fillStyle = "rgb(200,200,00)";
    ctx.fillRect(x*blockSize,y*blockSize+bs,blockSize,bs);
}

function drawPoint(ctx,x,y) {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.arc(x*blockSize+blockSize/2, 
    y*blockSize+blockSize/2, blockSize/8, 0, 2 * Math.PI);
    ctx.fill(); 
}

function drawPowerUp(ctx,x,y) {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.arc(x*blockSize+blockSize/2, 
    y*blockSize+blockSize/2, blockSize/3, 0, 2 * Math.PI);
    ctx.fill(); 
}

function drawMap(ctx) {
    for(var y=0;y<map.length;y++) {
        for(var x=0;x<28;x++) {
            switch (map[y][x]) {
                case 0:
                drawWall(ctx,x,y);
                break;
                case 1:
                drawPoint(ctx,x,y);
                break;
                case 2:
                drawPowerUp(ctx,x,y);
                break;  
                case 4:
                drawDoor(ctx,x,y);
                break;  
                default:
                break;
            }
        }
    }
}

function checkKey(e){
    if(!e.repeat){
        console.log("+")
        player.checkKey(e);
    }
}

function clearKey(){
    console.log("-")
    player.clearKey();
}

function game() {
    setInterval(gameLoop, 1000/30);
    document.addEventListener("keydown", checkKey);
    document.addEventListener("keyup", clearKey);
}
