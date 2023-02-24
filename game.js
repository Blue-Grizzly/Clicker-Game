"use strict";

window.addEventListener("load", start);


let points = 0;
let Health = 3;
let GameTime = setTimeout(Level_Complete, 10000);

function start(){

    points = 0;
    Health = 3;
    document.querySelector("#APC1").
        addEventListener("mousedown", ClickFunction1);
    document.querySelector("#APC2").
        addEventListener("mousedown", ClickFunction2);
    document.querySelector("#RedCross").
        addEventListener("mousedown", ClickFunction3);
    document.querySelector("#PeaceKeeper").
        addEventListener("mousedown", ClickFunction4);
    console.log("start");
}

function ClickFunction1(){
    console.log("click");
    document.querySelector("#APC1").classList.
        add("pause");
    document.querySelector("#APC_sprite_G").
        classList.add("clicked");
    pointplus();
    console.log("click2");
}

function ClickFunction2(){
    console.log("click");
    document.querySelector("#APC2").classList.
        add("pause");
    document.querySelector("#APC_sprite_T").
        classList.add("clicked");
    pointplus();
    console.log("click2");
}

function ClickFunction3(){
    console.log("click");
    // document.querySelector("#RedCross").classList.
    //     add("pause");
    // document.querySelector("#RedCross_sprite").
    //     classList.add("clicked");
    // console.log("click2");
    PlayerDamage();
}

function ClickFunction4(){
    console.log("click");
    document.querySelector("#PeaceKeeper").classList.
        add("pause");
    document.querySelector("#PeaceKeeper_sprite").
        classList.add("clicked");
    console.log("click2");
    PlayerDamage();
}

function pointplus(){
    points++;
    console.log(points);
    DisplayPoints();
}

function PlayerDamage(){
    Health--;
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
    let HealthPoints = `You have ${Health} Lives left`;
    console.log(Health);
    document.querySelector("#health").textContent = HealthPoints;
}

function CheckHealth(){
    if (Health <= 0){
        GameOver();
    }

}



function GameOver(){
    document.querySelector(".game").
        classList.add("hidden");
    window.clearTimeout(GameTime);
    console.log("Game Over");
    
}

function Level_Complete(){
    document.querySelector(".game").
        classList.add("background");
    document.querySelector("#LevelComplete").
        classList.add("Level_Complete");
    console.log("Level Complete");
}