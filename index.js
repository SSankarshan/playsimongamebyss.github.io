alert("In Simon, you watch and listen to the colors and sounds, then try to remember and do them yourself—it's like a colorful memory challenge !");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["blue", "red", "yellow", "green"];
var level = 0;
var count = 0;
var maxLevelReached = 0;

$(".btn").on("click", function (event) {
    incrementCount();
    var iD = event.target.id;
    playSound(iD);
    blinkEffect(iD);
    handler(iD, count);
});

$("#btn1").on("click", function (event) {
    var btn = event.target.id;
    fadeEffect(btn);
    playGame();
});


$(".btn2").on("click", function (event) {
    var btn = event.target.id;
    fadeEffect(btn);
    replay();
});

$(document).on("keydown", function (event) {
    if (event.key === "Enter") {
        playGame();
    } else if (event.key === "r" || event.key === "R") {
        replay();
    }

});

$("#btn3").on("click", function (event) {
    alert("Repeat the sequence of colors that have blinked so far ! ");
});

function incrementCount() {
    count += 1;
}
function resetCount() {
    count = 0;
}
function displayPlayAgain() {
    $("#level-title").text(" Click 'start' to play again..");
}

function replay() {
    playSoundReplay();
    $("#level-title").text("Replay of last level. Click 'start' to play again. Press 'Replay' to see again");
    for (var i = 0; i < gamePattern.length; i++) {
        setTimeout(function (color) {
            return function () {
                blinkEffect(color);
            };
        }(gamePattern[i]), 1500 * (i + 1));
    }
}

function handler(btnId, count) {
    var userClickedColor = btnId;
    userClickedPattern.push(userClickedColor);
    console.log("> userClickedPattern is " + userClickedPattern + " > count is " + count);
    if (count == level) {
        resetCount();
        if (gamePattern.every((element, index) => element === userClickedPattern[index])) {
            userClickedPattern = [];
            console.log("count is " + count);
            setTimeout(nextSequence, 1000);
        } else {
            playSoundGameOver();
            incrementCount();
            maxLevelReached = Math.max(maxLevelReached, level);
            $("#level-title").html("Game Over! <br>your score = " + (level - 1)  + " <br>Max score = " + (maxLevelReached - 1) + "<br> Click 'Replay' to see last level. Click 'Start' to play again!");
            $(".btn2").css("visibility","visible");
        }
    } else if(count > level) {
        alert("Please 'start' the game again !");
    }
}


function blinkEffect(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function fadeEffect(btn) {
    $("#" + btn).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
    const audio = new Audio("sounds\\" + color + ".mp3");
    audio.play();
}
function playSoundGameOver() {
    const audio = new Audio("sounds\\negative_beeps-6008.mp3");
    audio.play();
}   

function playSoundReplay() {
    const audio = new Audio("sounds\\rewind.mp3");
    audio.play();
}

function nextSequence() {
    $("#level-title").text("Level : " + level);
    level += 1;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    playSound(randomChoosenColour);
    blinkEffect(randomChoosenColour);
    gamePattern.push(randomChoosenColour);
    console.log("> game pattern is " + gamePattern + " > level is " + level + " > count is " + count);
}

function playGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    count = 0;
    $(".btn2").css("visibility","hidden");
    nextSequence();
}

