let inputDir = {x:0, y:0};
const foodSound = new Audio("assets/food.mp3");
const gameoverSound = new Audio("assets/gameover.mp3");
const moveSound = new Audio("assets/move.mp3");
const musicSound = new Audio("assets/music.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
food = {x:6, y:7};


// Game functions 

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    // If you bump into yourself

    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
    }

    // If you bump into the wall

    if(sarr[0].x >=18 || sarr[0].x <=0 || sarr[0].y >=18 || sarr[0].y <=0 ){
        return true;
    }
}

function gameEngine(){
    // Updating the snake array and food 

    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over, Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        food = {x:6, y:7};
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        // musicSound.play();
    }

    // If you have eaten the food, increment the score and regenerate the food
    
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highscoreVal){
            highscoreVal = score;
            localStorage.setItem('highscore', JSON.stringify(highscoreVal));
            highscoreBox.innerHTML = "High Score : " + highscoreVal;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())};
    }

    // Moving the snake

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // display the snake 

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y ;
        snakeElement.style.gridColumnStart = e.x ;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food 
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y ;
        foodElement.style.gridColumnStart = food.x ;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}


// Main logic 

// musicSound.play();
let highscore = localStorage.getItem('highscore');
if(highscore===null){
    highscoreVal = 0;
    localStorage.setItem('highscore', JSON.stringify(highscoreVal))
}
else{
    highscoreVal = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score : " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

