//=================== Window Load ===========================//
"use strict";
window.addEventListener("load", startScreen);

//===================== Variables ==========================//

let points = 0;
let HealthPoints = 0;

//==================== Start Screen ===========================//

function startScreen(){
    console.log("start");
    document.querySelector("#start_btn").
        addEventListener("click", screenSwitch1);    
}

//==================== Game Start Functions ===================//

function gameStarter() {   
    document.querySelector("#start").
        addEventListener("animationend", gameStarter);
    document.querySelector("#LevelComplete").
        addEventListener("animationend", gameStarter);
    document.querySelector("#GameOver").
        addEventListener("animationend", gameStarter);
    points = 0;
    HealthPoints = 10;

    listeners();
    animationStarter();
    resetHealth();
    startTimer();
    displayPoints();

    document.querySelector("#Music").currentTime = 0;
    document.querySelector("#Music").play();  

    document.querySelector("#game").
        classList.remove("hidden");
    document.querySelector("#start").
        classList.add("hidden");
    document.querySelector("#LevelComplete").
        classList.add("hidden");
    document.querySelector("#GameOver").
        classList.add("hidden");


    document.querySelector("#GameOver").
        classList.remove("screenSwitch");
    document.querySelector("#LevelComplete").
        classList.remove("screenSwitch");
    document.querySelector("#start").
        classList.remove("screenSwitch");
}

function resetHealth(){
    document.querySelector("#health1").
        classList.remove("lost_heart");
    document.querySelector("#health2").
        classList.remove("lost_heart");
    document.querySelector("#health3").
        classList.remove("lost_heart");
    document.querySelector("#health4").
        classList.remove("lost_heart");
    document.querySelector("#health5").
        classList.remove("lost_heart");
    document.querySelector("#health6").
        classList.remove("lost_heart");
    document.querySelector("#health7").
        classList.remove("lost_heart");
    document.querySelector("#health8").
        classList.remove("lost_heart");
    document.querySelector("#health9").
        classList.remove("lost_heart");
    document.querySelector("#health10").
        classList.remove("lost_heart");
}

function animationStarter(){

    let pos1 = Math.floor(Math.random()*4+1);
    let pos2 = Math.floor(Math.random()*4+1);
    let pos3 = Math.floor(Math.random()*4+1);
    let pos4 = Math.floor(Math.random()*4+1);



    document.querySelector("#APC1_container").
        classList.add("movetest"+pos1);
    document.querySelector("#APC2_container").
        classList.add("movetest"+pos2);
    document.querySelector("#RedCross_container").
        classList.add("movetest"+pos3);
    document.querySelector("#PeaceKeeper_container").
        classList.add("movetest"+pos4);
}

function listeners(){
    document
        .querySelector("#APC1_container")
        .addEventListener("mousedown", goodClicked);
    document
        .querySelector("#APC2_container")
        .addEventListener("mousedown", goodClicked);
    document
        .querySelector("#RedCross_container")
        .addEventListener("mousedown", badClicked);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("mousedown", badClicked);


    document
        .querySelector("#APC1_container")
        .addEventListener("animationiteration", objectReset);
    document
        .querySelector("#APC2_container")
        .addEventListener("animationiteration", objectReset);
    document
        .querySelector("#RedCross_container")
        .addEventListener("animationiteration", objectReset);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("animationiteration", objectReset);

    document
        .querySelector("#APC1_container")
        .addEventListener("animationiteration", playerDamage);
    document
        .querySelector("#APC2_container")
        .addEventListener("animationiteration", playerDamage);    

 }

 function startTimer() {
    document.querySelector("#timer_sprite").
        classList.add("shrink");
    document.querySelector("#timer_sprite").
        addEventListener("animationend", pointCheck);
}

//====================== Screen Transitions ===================//

function screenSwitch1(){
    document.querySelector("#start_btn").
        removeEventListener("click", screenSwitch1);
    document.querySelector("#start").
        classList.add("screenSwitch");
    document.querySelector("#start").
        addEventListener("animationend", gameStarter);
 }

function screenSwitch2(){
    document.querySelector("#gameOver_btn").
        removeEventListener("click", screenSwitch2);
    document.querySelector("#GameOver").
        classList.add("screenSwitch");
    document.querySelector("#GameOver").
        addEventListener("animationend", gameStarter);
 }
function screenSwitch3(){
    document.querySelector("#lvl_complete_btn").
        removeEventListener("click", screenSwitch3);
    document.querySelector("#LevelComplete").
        classList.add("screenSwitch");
    document.querySelector("#LevelComplete").
        addEventListener("animationend", gameStarter);
 }

 //===================== Element Events ==========================//

function goodClicked() {
    console.log("Click Good");
    let Good = this;
    Good.removeEventListener("mousedown", goodClicked);
    Good.classList.add("paused");
    Good.querySelector("img").classList.add("clicked");
    Good.addEventListener("animationend", goodGone);
    givePoints();
    document.querySelector("#Explosion_Sound").currentTime = 0;
    document.querySelector("#Explosion_Sound").play(); 
  }
  
function goodGone() {
    let Good = this;
    Good.removeEventListener("animationend", goodGone);
    Good.querySelector("img").classList.remove("clicked");
    Good.classList.remove("paused");
    Good.addEventListener("mousedown", goodClicked);
    objectReset.call(this);
  }

function badClicked() {
    console.log("Click Bad");
    let Bad = this;
    Bad.removeEventListener("mousedown", badClicked);
    Bad.classList.add("paused");
    Bad.querySelector("img").classList.add("badclicked");
    Bad.addEventListener("animationend", badGone);
    playerDamage();
    document.querySelector("#Explosion_Sound").currentTime = 0;
    document.querySelector("#Explosion_Sound").play();
  }
  
function badGone() {
    let Bad = this;
    Bad.removeEventListener("animationend", badGone);
    Bad.querySelector("img").classList.remove("badclicked");
    Bad.classList.remove("paused");
    Bad.addEventListener("mousedown", badClicked);
    objectReset.call(this);
  }

  
function objectReset(){
    let Thing = this;
    Thing.classList.remove
    ("movetest1", "movetest2", "movetest3", "movetest4");
    Thing.offsetWidth;
    let pos1 = Math.floor(Math.random()*4+1);
    Thing.classList.add("movetest"+pos1);
  }

//=================== Player stats Health/Points =====================//

function givePoints(){
    points++;
    console.log(points);
    displayPoints();
}

function displayPoints(){
    let message = `Points: ${points}`;
    console.log(message);
    document.querySelector("#score").
        textContent = message;
}

function playerDamage(){
    HealthPoints--;
    console.log("damage");
    let Rando = Math.floor(Math.random()*2+1);
    document.querySelector("#BadClicked"+Rando).currentTime = 0;
    document.querySelector("#BadClicked"+Rando).play(); 
    checkHealth();
    updateHealth();
}

function updateHealth(){
    console.log(HealthPoints);
    if(HealthPoints == 9){
        document.querySelector("#health1").classList.add("lost_heart");
    } else if(HealthPoints == 8){
        document.querySelector("#health2").classList.add("lost_heart");
    } else if(HealthPoints == 7){
        document.querySelector("#health3").classList.add("lost_heart");
    } else if(HealthPoints == 6){
        document.querySelector("#health4").classList.add("lost_heart");
    } else if(HealthPoints == 5){
        document.querySelector("#health5").classList.add("lost_heart");
    } else if(HealthPoints == 4){
        document.querySelector("#health6").classList.add("lost_heart");
    } else if(HealthPoints == 3){
        document.querySelector("#health7").classList.add("lost_heart");
    } else if(HealthPoints == 2){
        document.querySelector("#health8").classList.add("lost_heart");
    } else if(HealthPoints == 1){
        document.querySelector("#health9").classList.add("lost_heart");
    } else{
        document.querySelector("#health10").classList.add("lost_heart");
    }
}

function checkHealth(){
    if (HealthPoints <= 0){
        gameOver();
    }
}

//=================== End screen related ============================//

function pointCheck() {
    console.log("Time!");

    if (points >= 15) {
        level_Complete();
    } else {
        gameOver();
    }
}

function gameOver(){
    // window.clearTimeout(GameTime);
    document.querySelector("#game").
        classList.add("hidden");
    document.querySelector("#GameOver").
        classList.remove("hidden");
    console.log("Game Over");
    document.querySelector("#gameOver_btn").
        addEventListener("click", screenSwitch2);
    StopGame();
}

function level_Complete(){
    document.querySelector("#game").
        classList.add("hidden");
    document.querySelector("#LevelComplete").
        classList.remove("hidden");
    console.log("Level Complete");
    document.querySelector("#lvl_complete_btn").
        addEventListener("click", screenSwitch3);
    StopGame();
}

function StopGame(){
    document
        .querySelector("#APC1_container")
        .removeEventListener("click", goodClicked);
    document
        .querySelector("#APC2_container")
        .removeEventListener("click", goodClicked);
    document
        .querySelector("#RedCross_container")
        .removeEventListener("click", badClicked);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("click", badClicked);


    document
        .querySelector("#APC1_container")
        .removeEventListener("animationiteration", objectReset);
    document
        .querySelector("#APC2_container")
        .removeEventListener("animationiteration", objectReset);
    document
        .querySelector("#RedCross_container")
        .removeEventListener("animationiteration", objectReset);
    document
        .querySelector("#PeaceKeeper_container")
        .removeEventListener("animationiteration", objectReset);

    document
        .querySelector("#APC1_container")
        .removeEventListener("animationiteration", playerDamage);
    document
        .querySelector("#APC2_container")
        .removeEventListener("animationiteration", playerDamage);    


    document.querySelector("#APC1_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#APC2_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#RedCross_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#PeaceKeeper_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");

}