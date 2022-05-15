var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSquence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSquence();
            } , 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//colour chosing and flashing it to user
function nextSquence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed");
    } , 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};







