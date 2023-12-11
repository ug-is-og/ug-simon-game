let buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
var randomChosenColor;
let level=0;
let gameStarted=false;

// check if any of the buttons are clicked
    
$(document).on("keydown",function(){
    if(!gameStarted)
    {
        nextSequence();
        gameStarted=true;
    }
});
$(".btn").on("click",function(event){
    let userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(color){
    // to play sound corresponding to a random color chosen
    let audioFilePath="./sounds/"+color+".mp3";
    let audio=new Audio(audioFilePath);
    audio.play();
}
function nextSequence(){
    level++;
    $("h1").html("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor); // add nahi push hoga
    let randomButton=$("#"+randomChosenColor); // "#" bhul ja ra tha baar baar
    // to show the animation effect
    randomButton.fadeOut(50).fadeIn(50); // 50 denotes the delay before that event is triggered
    playSound(randomChosenColor);
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    // Set a timeout to remove the class after the specified delay
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
        else
        {
            console.log("Keep Going, Great Work");
        }
    }
    else
    {
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("h1").html("Game Over, Press Any Key to Restart");
        restartGame();
    }
}
function restartGame(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    gameStarted=false;
}