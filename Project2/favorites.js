"use strict"

//query selectors for HTML elements
let xBtn = document.querySelector("img");
let joke = document.querySelector("#favJokes");
let returnbox = document.querySelector("#jokebox");

//gets rid of joke if x button is pressed
xBtn.onclick = function(e){
    joke.innerHTML = "";
}

//returns to index.html when the return button is pressed
returnbox.onclick = function(e){
    window.open("index.html");
}