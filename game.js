"use strict";
window.addEventListener("load", start);

let points = 0;
let HealthPoints = 0;
// let GameTime = setTimeout(Level_Complete, 10000);

function start() {
    console.log("start");

    points = 0;
    HealthPoints = 3;

    listeners();
    animationStarter();
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

}



function GoodClicked() {
    console.log("Click Good");
    let Good = this;
    Good.removeEventListener("click", GoodClicked);
    Good.classList.add("paused");
    Good.querySelector("img").classList.add("clicked");
    Good.addEventListener("animationend", GoodGone);
    GivePoints();
  }

  function BadClicked() {
    console.log("Click Good");
    let Bad = this;
    Bad.removeEventListener("click", BadClicked);
    Bad.classList.add("paused");
    Bad.querySelector("img").classList.add("clicked");
    Bad.addEventListener("animationend", BadGone);
    PlayerDamage();
  }
  
  function BadGone() {
    let Bad = this;
    Bad.removeEventListener("animationend", BadGone);
    Bad.querySelector("img").classList.remove("clicked");
    Bad.classList.remove("paused");
    Bad.addEventListener("click", BadClicked);
    ObjectReset.call(this);
  }

  function GoodGone() {
    let Good = this;
    Good.removeEventListener("animationend", GoodGone);
    Good.querySelector("img").classList.remove("clicked");
    Good.classList.remove("paused");
    Good.addEventListener("click", GoodClicked);
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
    if(HealthPoints == 2){
        document.querySelector("#health1").classList.add("hidden");
    } else if(HealthPoints == 1){
        document.querySelector("#health2").classList.add("hidden");
    } else{
        document.querySelector("#health3").classList.add("hidden");
    }
}

function CheckHealth(){
    if (HealthPoints <= 0){
        GameOver();
    }
}

function GameOver(){
    document.querySelector("#game_id").
        classList.add("hidden");
    window.clearTimeout(GameTime);
    console.log("Game Over");
    
}

function Level_Complete(){
    document.querySelector("#game_id").
        classList.add("hidden");
    document.querySelector("#LevelComplete").
        classList.add("Level_Complete");
    console.log("Level Complete");
}