alert("In Simon, you watch and listen to the colors and sounds, then try to remember and do them yourself—it's like a colorful memory challenge !");

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["blue", "red", "yellow", "green"];
var level = 0;
var count = 0;
var maxLevelReached = 0;
var start = false;

$(".btn").on("click", function (event) {
    if(start == true) {
        incrementCount(1);
        var iD = event.target.id;
        playSound(iD);
        blinkEffect(iD);
        handler(iD, count);
    } else {
        if(level == 0) {
            alert("Please click 'START' to play !");
        }
    }
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
    alert("Click the colors in the sequence that they have blinked so far, till the current level !");
});

function incrementCount(x) {
    count += x;
}
function resetCount() {
    count = 0;
}

function startToggler() {
    if( start == false ) {
        start = true;
    } else {
        start = false;
    }
}
function displayReplayAgain() {
    $(".btn2").css("visibility", "visible");
}

function replay() {
    $(".btn2").css("visibility", "hidden");
    playSoundReplay();
    $("#level-title").html("Viewing replay of last level. <br>" + "Click 'Start' to play again.<br> " + "Press 'Replay' to see again");
    for (var i = 0; i < gamePattern.length; i++) {
        setTimeout(function (color) {
            return function () {
                blinkEffect(color);
            };
        }(gamePattern[i]), 1000 * (i + 1));
    }
    setTimeout(displayReplayAgain, (gamePattern.length) * 1000);
}

function handler(btnId, count) {
    var userClickedColor = btnId;
    userClickedPattern.push(userClickedColor);
    if (count == level) {
        resetCount();
        if (gamePattern.every((element, index) => element === userClickedPattern[index])) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        } else {
            playSoundGameOver();
            maxLevelReached = Math.max(maxLevelReached, level);
            $("#level-title").html("Game Over! <br>your score = " + (level - 1)  + " <br>Max score = " + (maxLevelReached - 1) + "<br> Click 'Replay' to see last level.<br> Click 'Start' to play again!");
            $(".btn2").css("visibility","visible");
            incrementCount(1000000);
            startToggler();
        }
    }
}


function blinkEffect(color) {
    $("#" + color).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
}

function fadeEffect(btn) {
    $("#" + btn).fadeIn(50).fadeOut(50).fadeIn(50);
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
}

function playGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    count = 0;
    startToggler();
    $(".btn2").css("visibility","hidden");
    nextSequence();
}

