window.addEventListener("load", start);

function start(){
    document.querySelector("#APC1").
        addEventListener("clicked", Explode);
    document.querySelector("#APC1").
        classList.add("movetest");
}

function Explode(){
    document.querySelector("APC1").
        classList.add("pause");
    document.querySelector("APC1").
        classList.add("clicked")

}