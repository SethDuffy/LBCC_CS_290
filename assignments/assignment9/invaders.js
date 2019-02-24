const surf = document.getElementById("surface");
const ctx = surf.getContext("2d");

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let bullArr = [];
var player = {
    x: surf.width/2,
    y: surf.height-30,
    dx: 5,
    score: 0,
    width: 25,
    height: 15
};
function bullet(){
    this.x = player.x+player.width/2;
    this.y = surf.height-30;
    this.dy = 5;
    this.w = 2;
    this.h = 5;
}

function drawPlayer(){
    ctx.beginPath();
    player.x = clamp(player.x, surf.width-player.width, 0);
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();
}
function drawBullets(){
    for(let i = 0; i < bullArr.length-1; i++){
        ctx.beginPath();
        ctx.rect(bullArr[i].x, bullArr[i].y, 5, 10);
        ctx.strokeStyle = "rgba(125, 125, 125, 0.7)";
        ctx.stroke();
        ctx.closePath();
    }
}
function move(){
    if(rightPressed) player.x+=player.dx;
    if(leftPressed) player.x-=player.dx;
    for(let i = 0; i < bullArr.length-1; i++){
        bullArr[i].y -= bullArr[i].dy;
        if(bullArr[i].y < 0){
            bullArr.shift();
        }

    }
}

//Clamp values to a high low range
function clamp(currVal, topVal, bottomVal){
    let returnVal = currVal;
    if(currVal > topVal)
        returnVal = topVal;
    else if(currVal < bottomVal)
        returnVal = bottomVal;
    return returnVal;
}
function createBullet(){
    let bull = new bullet();
    bullArr.push(bull);
}
setInterval(createBullet, 100);

function mainLoop() {
    ctx.clearRect(0, 0, surf.width, surf.height);
    drawBullets();
    move();
    drawPlayer();

}
setInterval(mainLoop, 20);













