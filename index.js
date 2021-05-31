let gamePattern = []
let level = 0
let randcolour = ["red", "blue", "green", "yellow"]
let wrong = new Audio("sounds/wrong.mp3")
let randomNum
let randomChosenColour
let match = true
let started = false
let clicks = 0

$(document).keypress(function (e) {
    if (started == false) {
        cycleLevel()
        started = true
    }
    e.preventDefault()
})

function randNum() {
    return Math.floor(Math.random() * 4)
}

function playSound(colourName) {
    $(`#${colourName}`).fadeOut(80).fadeIn(100)
    play =  new Audio(`sounds/${colourName}.mp3`).play()
}

let animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function(){
        $(`#${currentColour}`).removeClass('pressed');
    }, 100)
}

$(".btn").click(function (e) {
    e.preventDefault();
    let userChosenColour = e.target.id
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkPattern(userChosenColour, gamePattern, clicks)
    clicks++
    if (clicks === level || match === false) {
        clicks = 0
        match = true
    }
});

let checkPattern = (userClick, randomGen, clicks) => {
    if (userClick !== randomGen[clicks]){
        match = false
    }
    if (match === false) {
        gameOver()
    }
   
    if (clicks === level - 1 && match === true){
        setTimeout(() => {
            cycleLevel()
        }, 500);
    }  
}

let cycleLevel = ()=> {
    level++
    $("h1").html("level " + level);
    randomNum = randNum()
    randomChosenColour = randcolour[randomNum]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)  
}

let gameOver = () => {
    $("body").addClass('game-over');
    setTimeout(() => {
        $("body").removeClass('game-over');
    }, 200);
    wrong.play()
    gamePattern = []
    level = 0
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false
}