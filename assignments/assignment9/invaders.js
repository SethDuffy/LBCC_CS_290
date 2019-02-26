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
let enemyArr = [];

var player = {
    x: surf.width/2,
    y: surf.height-30,
    dx: 4,
    score: 0,
    width: 25,
    height: 15
};

function enemy(x, y, color) {
    this.w = 20;
    this.h = 20;
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
    this.color = color;
}
window.onload = function() {
    let tempX = 6;
    let tempY = 5;
    let greenVar = 0;
    let redVar = 255

    for(var i = 0; i < 96; i++){
        if((i % 16 == 0) && i != 0){
            tempY += 30;
            tempX = 5;
            greenVar += 255/6;
            redVar -= 255/6;
        }
        let ene = new enemy(tempX, tempY, `rgba(${redVar}, ${greenVar}, 0, 0.9)`);
        enemyArr.push(ene);
        tempX += enemyArr[0].w + 10;
    }
}


function bullet(x){
    this.w = 3;
    this.h = 11;
    this.x = x+((player.width/2)-(this.w/2));
    this.y = surf.height-30;
    this.dy = 4;

}



function drawPlayer(){
    ctx.beginPath();
    player.x = clamp(player.x, surf.width-player.width, 0);
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.strokeStyle = "rgba(0, 0, 255, 0.7)";
    ctx.stroke();
    ctx.closePath();
}
//draws the border for all bullets
function drawBullets(){
    for(let i = 0; i < bullArr.length; i++){
        ctx.beginPath();
        ctx.rect(bullArr[i].x, bullArr[i].y, bullArr[i].w, bullArr[i].h);
        ctx.strokeStyle = "rgba(125, 125, 125, 0.7)";
        ctx.stroke();
        ctx.closePath();
    }
}

function drawEnemies(){
    for(let i = 0; i < enemyArr.length; i++){
        ctx.beginPath();
        ctx.rect(enemyArr[i].x, enemyArr[i].y, enemyArr[i].w, enemyArr[i].h);
        ctx.strokeStyle = enemyArr[i].color;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawScore(){
    ctx.beginPath();
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "rgba(20, 20, 20, .4)"
    ctx.fillText("Score: " + player.score, surf.width-150, surf.height-20);
    ctx.closePath();
}
//function moveEnemies(){

//}
//steps through movement for all bullets and the player
function move(){
    if(rightPressed) player.x+=player.dx;
    if(leftPressed) player.x-=player.dx;
    for(let i = 0; i < bullArr.length; i++){
        bullArr[i].y -= bullArr[i].dy;
        if(bullArr[i].y < 0){
            bullArr.shift();
        }

    }
}
function collision(){
    for(var i = 0; i < bullArr.length; i++){
        for(var k = 0; k < enemyArr.length; k++){
            if (bullArr[i].x < enemyArr[k].x + enemyArr[k].w &&
                bullArr[i].x + bullArr[i].w > enemyArr[k].x &&
                bullArr[i].y < enemyArr[k].y + enemyArr[k].h &&
                bullArr[i].y + bullArr[i].h > enemyArr[k].y) {

                bullArr.splice(i, 1);
                enemyArr.splice(k, 1);
                player.score += 10;
            }
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
//creates a bullet object and pushes it onto the end of the bullArr
function createBullet(){
    let bull = new bullet(player.x);
    bullArr.push(bull);
}
setInterval(createBullet, 400);

//loops the logic and redraws boxes
function mainLoop() {
    ctx.clearRect(0, 0, surf.width, surf.height);
    move();
    collision();
    drawBullets();
    drawEnemies();
    drawScore();
    drawPlayer();
}
setInterval(mainLoop, 15);




