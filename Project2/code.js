"use strict";

//list of html ids converted into querySelectors for the program to use
let favbox = document.querySelector("#favbox");
let checkMark = document.querySelector("#checkmark");
let xMark = document.querySelector("#x-mark");
let answer = document.querySelector(".answer");
let dropdown = document.querySelector("#dropdown");
let nsfwButton = document.querySelector("#NSFWBtn");
let enterBtn = document.querySelector("#enterBtn");

//opens up the favorites link when the favorites button is pressed
favbox.onclick = function (e) {
    window.open("favorites.html");
}

//when the checkmarck is clicked, the joke's background becomes yellow
checkMark.onclick = function (e) {
    answer.style.backgroundColor = "yellow";
}

//when the x mark is clicked, the joke's background returns to it's original color
xMark.onclick = function (e) {
    answer.style.backgroundColor = "lightblue";
}

//joke key
const SERVICE_URL = "https://v2.jokeapi.dev/joke/";
//sets url equal to base key, can find any joke
let url = SERVICE_URL;

//loads javascript information when enter button is pressed
window.onload = enter;

//runs findInfo method when the enter button is pressed
function enter() { enterBtn.onclick = findInfo; }

function findInfo() {

    //search bar is currently empty
    let searchTerm = "";

    //contains all of the different categories of jokes
    let catList = ['Any', 'Programming', 'Pun', 'Dark', 'Spooky', 'Christmas', 'Miscellaneous'];
    //if a category is selected it's name is added to the back of the URL
    for (let i = 0; i < catList.length; i++) {
        if (dropdown.querySelector(`option[value=${catList[i]}]`).selected == true) {
            url += catList[i];
        }
    }

    //previous method trying to access catList
    /*
    let selectedCat = "";
    
    for (let j = 0; j < categories.length; j++){
        for(let i = 0; i < catList.length; i++){
            if(categories[j].value == catList[i]){ 
                url += categories[j].value;
                break;
            }
        }
        break; 
    }
    */

    //finds what is written in the search bar
    let searchBar = document.querySelector("#search").value;

    //trims,encodes, and stores searchbar response
    searchTerm = searchBar;
    searchTerm = searchTerm.trim();
    searchTerm = encodeURIComponent(searchTerm);
    const savedSearch = localStorage.getItem(searchTerm);

    //welcome back message for when the same person writes the same tag
    if (savedSearch){
        document.querySelector("#welcomeTag").innerHTML = "Welcome back!";
    }

    //all nsfw tags
    const NSFW_TAG = "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    //special character that comes before a tag
    let linkchar2 = "";

    //used to filter out all nsfw jokes
    if (nsfwButton.checked == true) {
        linkchar2 = "&";
        url += NSFW_TAG + linkchar2 + `contains=${searchTerm}`;
    }
    //only adds search term if the nsfw button is not selected
    else {
        linkchar2 = "?";
        url += linkchar2 + `contains=${searchTerm}`;
    }

    //changes the debug line to having the complete url
    document.querySelector("#debug").innerHTML = `Querying with: <a href="${url}" target="_blank">${url}</a>`;
    
    getData(url);

}

function getData(e){
    //creates request for API to retrieve a joke
    let xhr = new XMLHttpRequest();

    //ran if the API has information
    xhr.onload = hasLoaded;

    //ran if the API has an error
    xhr.onerror = hasError;

    //sends request
    xhr.open("GET", url);
    xhr.send()
}

//displays an error message if the API is unable to retrieve information
function hasError(e) {
    document.querySelector("#debug").innerHTML = "An error has happened";
}

function hasLoaded(e) {

    //obtains response from API
    let xhr = e.target;

    //console.log(xhr.response);

    //parses response into a JSON file
    let obj = JSON.parse(xhr.response);
    
    console.log(obj);

    //console.log(e.target.response)

    //writes message if information from the JSON file is not recieved or doesn't exist
    if(!obj.error == true){
        document.querySelector(".answer").innerHTML = "There is no joke. :(";
        return;
    }

    //replaces sample joke with the joke generated from the API
    let response = obj.type;

    if (response == "single"){
        let jokeOutput = `<p>"${obj.joke}}"</p> <img src="Images/check-mark.png" alt="checkmark" id="checkmark"> <img src="Images/red-x.png" alt="x-mark" id="x-mark"> <br>"`;
        document.querySelector(".answer").innerHTML = jokeOutput;
    }
    else if (response == "double"){
        let jokeOutput = `<p>"${obj.setup}"<br>"${obj.delivery}</p> <img src="Images/check-mark.png" alt="checkmark" id="checkmark"> <img src="Images/red-x.png" alt="x-mark" id="x-mark"> <br>"`;
        document.querySelector(".answer").innerHTML = jokeOutput;
    }
    
}


