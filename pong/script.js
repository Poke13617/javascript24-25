/*
Title: JS Tennis
By: Mason Curtis
Created: Spring 2025
From the book: "Javascript Crash Course"
*/

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width
let height = canvas.height

ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);

const BALL_SIZE = 5

//a JS Array is a group of key: value pairs inside of {}

let ballPosition = {x: 20, y: 30}

let xSpeed = 4;
let ySpeed = 2;

const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;
let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove", e => {
    rightPaddleTop = e.y - canvas.offsetTop
})
//document.addEventListener("key")
/*
    Refactoring - a software development term for modifying some code without changing it's behavior, usually to make the code easier to understand and update.
*/

function draw(){
    //Fill the canvas with black
    ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
    
    // Everything else will be white
    ctx.fillStyle = "white";

    // Draw the ball
        ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

    //Draw the paddles
        ctx.fillRect(
            PADDLE_OFFSET, 
            leftPaddleTop, 
            PADDLE_WIDTH,
            PADDLE_HEIGHT
        )
    
        ctx.fillRect(
            width - PADDLE_WIDTH - PADDLE_OFFSET,
            rightPaddleTop,
            PADDLE_WIDTH,
            PADDLE_HEIGHT
        )
}

function update(){
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed
}


function checkPaddleCollision(ball, paddle){
    //check if the paddle and ball overlap vertically and horizontally
    return (ball.left   < paddle.right && ball.right    < paddle.left && ball.top < paddle.bottom && ball.bottom < paddle.top)
}
//Create collisions for bouncing ball
function checkCollision(){
    let ball = {
        left: ballPosition.x ,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y , 
        bottom: ballPosition.y + BALL_SIZE
    }
    if (ball.left < 0 || ball.right > width){
        xSpeed = -xSpeed;
    }
    if (ball.top < 0 || ball.bottom > height){
        ySpeed = -ySpeed;
    }
    let leftPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    }
    let rightPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: rightPaddleTop,
        bottom: rightPaddleTop + PADDLE_HEIGHT
    }

    if (checkPaddleCollision(ball, leftPaddle)){
        //left paddle collision happene 
        xSpeed = Math.abs(xSpeed)
    }
    if (checkPaddleCollision(ball, rightPaddle)){
        //left paddle collision happene 
        xSpeed = -Math.abs(xSpeed)
    }
}
function gameLoop(){
    draw();
    update();
    checkCollision();
    //Call this function again after a timeout
    setTimeout(gameLoop, 30);
}
gameLoop()

/*
    The Game Loop - it orchestrates everything that has to happen for each frame of the game. Basic steps or a Game Loop:
    1. Clear Canvas
    2. Draw Image(s)
    3. Get player input (Like how I enjoy DFJK for rhythm games)
    4. Update state
    5. Check collisions
    6. Wait a short time (ms)
    7. Repeat 1-6
*/