"use strict";

//variables for favorites and output
let favbox = document.querySelector("#favbox");
let checkMark = document.querySelector("#checkmark");
let xMark = document.querySelector("#x-mark");
let answer = document.querySelector(".answer");

//related to jokes being serarched for
let jokeType = document.querySelector("#jokeType");
let numSearched = document.querySelector("#num-searched");
let dropdown = document.querySelector("#dropdown");
let enterBtn = document.querySelector("#enterBtn");

//opens up the favorites link when the favorites button is pressed
favbox.onclick = () => { window.open("favorites.html") };

//when the checkmarck is clicked, the joke's background becomes yellow
checkMark.onclick = () => { answer.style.backgroundColor = "yellow" };

//when the x mark is clicked, the joke's background returns to it's original color
xMark.onclick = () => { answer.style.backgroundColor = "lightblue" };

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

    //adds safe mode to filter out NSFW jokes
    url += '?safe-mode';

    //highlights if a value is selected in joke type dropdown
    if (jokeType.querySelector(`option[value=one]`).selected == true) {
        url += '&type=single';
    }
    else if (jokeType.querySelector(`option[value=two]`).selected == true) {
        url += '&type=twopart';
    }

    //finds what is written in the search bar
    let searchBar = document.querySelector("#search").value;

    //trims,encodes, and stores searchbar response
    searchTerm = searchBar;
    searchTerm = searchTerm.trim();
    searchTerm = encodeURIComponent(searchTerm);
    const savedSearch = localStorage.getItem(searchTerm);

    //welcome back message for when the same person writes the same tag
    if (savedSearch) {
        document.querySelector("#welcomeTag").innerHTML = "Welcome back!";
    }

    url += `&contains=${searchTerm}`;

    //changes the debug line to having the complete url
    document.querySelector("#debug").innerHTML = `Querying with: <a href="${url}" target="_blank">${url}</a>`;

    searchTerm = "";

    getData(url);
}

function getData(data) {
    let xhr = new XMLHttpRequest(); //creates request for API to retrieve a joke

    //ran if the API has information
    //xhr.onload = hasLoaded;

    xhr.onload = (e) => {
        console.log(`Loaded - HTTP Staus Code: ${e.target.status}`);

        //parses response into a JSON file
        //let obj = JSON.parse(xhr.response);

        const text = e.target.responseText;
        let json;
        try{
            json = JSON.parse(text);
        }
        //writes message if information from the JSON file is not recieved or doesn't exist
        catch{
            document.querySelector(".answer").innerHTML = "JSON parse error."
            return;
        }


        console.log(json);

        //replaces sample joke with the joke generated from the API
        if (json.type == "single") {
            let jokeOutput = `<p>"${json.joke}}"</p> <img src="Images/check-mark.png" alt="checkmark" id="checkmark"> <img src="Images/red-x.png" alt="x-mark" id="x-mark"> <br>"`;
            document.querySelector(".answer").innerHTML = jokeOutput;
            return;
        }
        else if (json.type == "double") {
            let jokeOutput = `<p>"${json.setup}"<br>"${json.delivery}</p> <img src="Images/check-mark.png" alt="checkmark" id="checkmark"> <img src="Images/red-x.png" alt="x-mark" id="x-mark"> <br>"`;
            document.querySelector(".answer").innerHTML = jokeOutput;
            return;
        }
    }

    //ran if the API has an error
    xhr.onerror = (e) => document.querySelector("#debug").innerHTML = `Error: ${e.target.status}`;
    xhr.open("GET", data);    //sends request
    xhr.send();
}

function hasLoaded(e) {

}

