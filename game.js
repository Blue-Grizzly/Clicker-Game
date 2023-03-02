"use strict";
window.addEventListener("load", StartScreen);

let points = 0;
let HealthPoints = 0;


function StartScreen(){
    console.log("start");
    document.querySelector("#start_btn").
        addEventListener("click", GameStarter);    
}

function GameStarter() {
    document.querySelector("#lvl_complete_btn").
        removeEventListener("click", GameStarter);
    document.querySelector("#gameOver_btn").
        removeEventListener("click", GameStarter);
    document.querySelector("#start_btn").
        removeEventListener("click", GameStarter);    

    points = 0;
    HealthPoints = 10;

    listeners();
    animationStarter();
    ResetHealth();
    startTimer();
    DisplayPoints();

    document.querySelector("#Music").currentTime = 0;
    document.querySelector("#Music").play();  

    document.querySelector("#game").classList.remove("hidden");
    document.querySelector("#start").classList.add("hidden");
    document.querySelector("#LevelComplete").classList.add("hidden");
    document.querySelector("#GameOver").classList.add("hidden");
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
        .addEventListener("click", GoodClicked);
    document
        .querySelector("#APC2_container")
        .addEventListener("click", GoodClicked);
    document
        .querySelector("#RedCross_container")
        .addEventListener("click", BadClicked);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("click", BadClicked);


    document
        .querySelector("#APC1_container")
        .addEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#APC2_container")
        .addEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#RedCross_container")
        .addEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("animationiteration", ObjectReset);

    document
        .querySelector("#APC1_container")
        .addEventListener("animationiteration", PlayerDamage);
    document
        .querySelector("#APC2_container")
        .addEventListener("animationiteration", PlayerDamage);    

 }



function GoodClicked() {
    console.log("Click Good");
    let Good = this;
    Good.removeEventListener("click", GoodClicked);
    Good.classList.add("paused");
    Good.querySelector("img").classList.add("clicked");
    Good.addEventListener("animationend", GoodGone);
    GivePoints();
    document.querySelector("#Explosion_Sound").currentTime = 0;
    document.querySelector("#Explosion_Sound").play(); 
  }
  
  function GoodGone() {
    let Good = this;
    Good.removeEventListener("animationend", GoodGone);
    Good.querySelector("img").classList.remove("clicked");
    Good.classList.remove("paused");
    Good.addEventListener("click", GoodClicked);
    ObjectReset.call(this);
  }

  function BadClicked() {
    console.log("Click Bad");
    let Bad = this;
    Bad.removeEventListener("click", BadClicked);
    Bad.classList.add("paused");
    Bad.querySelector("img").classList.add("clicked");
    Bad.addEventListener("animationend", BadGone);
    PlayerDamage();
    document.querySelector("#Explosion_Sound").currentTime = 0;
    document.querySelector("#Explosion_Sound").play();
  }
  
  function BadGone() {
    let Bad = this;
    Bad.removeEventListener("animationend", BadGone);
    Bad.querySelector("img").classList.remove("clicked");
    Bad.classList.remove("paused");
    Bad.addEventListener("click", BadClicked);
    ObjectReset.call(this);
  }

  
  function ObjectReset(){
    let Thing = this;
    Thing.classList.remove
    ("movetest1", "movetest2", "movetest3", "movetest4");
    Thing.offsetWidth;
    let pos1 = Math.floor(Math.random()*4+1);
    Thing.classList.add("movetest"+pos1);
  }


function GivePoints(){
    points++;
    console.log(points);
    DisplayPoints();
}

function PlayerDamage(){
    HealthPoints--;
    console.log("damage");
    let Rando = Math.floor(Math.random()*2+1);
    document.querySelector("#BadClicked"+Rando).currentTime = 0;
    document.querySelector("#BadClicked"+Rando).play(); 
    UpdateHealth();
    CheckHealth();
}

function DisplayPoints(){
    let message = `Points: ${points}`;
    console.log(message);
    document.querySelector("#score").
        textContent = message;
}

function UpdateHealth(){
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

function CheckHealth(){
    if (HealthPoints <= 0){
        GameOver();
    }
}

function ResetHealth(){
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

function GameOver(){
    // window.clearTimeout(GameTime);
    document.querySelector("#game").
        classList.add("hidden");
    document.querySelector("#GameOver").
        classList.remove("hidden");    
    console.log("Game Over");
    document.querySelector("#gameOver_btn").
        addEventListener("click", GameStarter);
    StopGame();
}

function Level_Complete(){
    document.querySelector("#game").
        classList.add("hidden");
    document.querySelector("#LevelComplete").
        classList.remove("hidden");
    console.log("Level Complete");
    document.querySelector("#lvl_complete_btn").
        addEventListener("click", GameStarter);
    StopGame();
}

function startTimer() {
    document.querySelector("#timer_sprite").
        classList.add("shrink");
    document.querySelector("#timer_sprite").
        addEventListener("animationend", Level_Complete);
}


function StopGame(){
    document
        .querySelector("#APC1_container")
        .removeEventListener("click", GoodClicked);
    document
        .querySelector("#APC2_container")
        .removeEventListener("click", GoodClicked);
    document
        .querySelector("#RedCross_container")
        .removeEventListener("click", BadClicked);
    document
        .querySelector("#PeaceKeeper_container")
        .addEventListener("click", BadClicked);


    document
        .querySelector("#APC1_container")
        .removeEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#APC2_container")
        .removeEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#RedCross_container")
        .removeEventListener("animationiteration", ObjectReset);
    document
        .querySelector("#PeaceKeeper_container")
        .removeEventListener("animationiteration", ObjectReset);

    document
        .querySelector("#APC1_container")
        .removeEventListener("animationiteration", PlayerDamage);
    document
        .querySelector("#APC2_container")
        .removeEventListener("animationiteration", PlayerDamage);    


    document.querySelector("#APC1_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#APC2_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#RedCross_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");
    document.querySelector("#PeaceKeeper_container").
        classList.remove("movetest1", "movetest2", "movetest3", "movetest4");

}