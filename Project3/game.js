//ES6 card class
class Card {
    constructor(element, currentPos, futurePos) {
        this.element = element;
        this.currentPos = currentPos;
        this.futurePos = futurePos;
    }
}
//let card4 = new Card(document.querySelector("#card1"));


//start button
let startButton = document.querySelector("#startBtn");
let replayButton = document.querySelector("#replayBtn");
//number of possible random functions
let swapnum = 3;
//how many times the game has changed direction
let moveCounter = 0;
//bool that becomes true when the game has swapped enough times
//so that the player can guess which card has the coin.
let reachedEndpoint = false;
//number of times the player has won
let numWins = 0;

//the cards arranged from left to right
let card1 = document.querySelector("#card1");
let card2 = document.querySelector("#card2");
let card3 = document.querySelector("#card3");

let cardA = new Card(card1, 0, null);
let cardB = new Card(card2, 200, null);
let cardC = new Card(card3, 400, null);

let deck = [];
deck.push(cardA);
deck.push(cardB);
deck.push(cardC);

let tempCard = null;
//Text that displays whether you won or lost
let endText = document.querySelector("#endText");

let guessText = document.querySelector("#guessTime");

let sound = document.querySelector("audio");


//returns a random number
function getRandom(swapnum) {
    return Math.floor(Math.random() * swapnum);
}

//starts the game when the start button is clicked
startButton.onclick = function () {
    //hides a coin behind a card
    sound.play();

    cardA.element.innerHTML = '<img src="Card.png">';

    card1.innerHTML = '<img src="Card.png">';
    //moves the card
    move();
    //increases move counter after each move
    moveCounter++;

    //After 10 moves, the player gets to decide where the coin is
    if (moveCounter > 10) {
        guessText.innerHTML = 'Time to guess.';
        //if the player guesses the right card, win text appears
        cardA.element.onclick = function () {
            numWins++;
            cardA.element.innerHTML = '<img src="Coin.png">';
            endText.innerHTML = `<p>You win! <br> You have won ${numWins} times.<p>`;
            endText.style.color = 'lime';
            moveCounter = 0;
        }
        //if the player guesses wrong, losing text appears
        cardB.element.onclick = function () {
            endText.innerHTML = 'You Lose.';
            endText.style.color = 'red';
            moveCounter = 0;
        }
        cardC.element.onclick = function () {
            endText.innerHTML = 'You Lose.';
            endText.style.color = 'red';
            moveCounter = 0;
        }
    }
    replayButton.onclick = function () {
        guessText.innerHTML= '';
        endText.innerHTML = '';
        endText.style.color = 'white';

        moveCounter = 0;
        card1.innerHTML = '<img src="Card.png">';
        
        
    }
}

//moves the card
function move() {

    //total positions that the card can move to
    let positions = [0, 200, 400];

    //a random number between 0 and 2
    let randNum = getRandom(swapnum);

    //how long it takes for a card to move
    let time = null;
    let time2 = null;
    let times = [null, null, null];
    //the initial position of each card

    //stops timer after each move
    for (let i = 0; i < times.length; i++) {
        clearInterval(times[i]);
    }

    clearInterval(time);
    clearInterval(time2);

    movement();
    
    //current method
    function movement() {
        let usedPositions = [];
        let notUsedPositions = [0, 200, 400];
        let quantity = 1;
        let newPos1 = null;
        let newPos2 = null;
        let newPos3 = null;

        for (let i = 0; i < swapnum; i++) {
            cut();
        }


    //previous method
/*
    //randomly simulates two cards swapping positions.
    switch (getRandom(swapnum)) {
        case 0:
            time = setInterval(oneToTwo, 3);
            time2 = setInterval(twoToOne, 3);
            console.log(0);
            break;
        case 1:
            time = setInterval(twotoThree, 3);
            time2 = setInterval(threeToTwo, 3);
            console.log(1);
            break;
        case 2:
            time = setInterval(threeToOne, 3);
            time2 = setInterval(onetoThree, 3);
            console.log(2);
            break;
        //the number cannot be larger than 5
        default:
            console.log("This is illegal");
    }
*/
        //potential solution
        /*
        if (card1pos != card2pos || card1pos != card3pos){
            times[0] = setInterval(moveCard1, 3);
        }

        if (card2pos != card1pos || card2pos != card3pos){
            times[1] = setInterval(moveCard2, 3); 
        }
        
        if (card3pos != card1pos || card3pos != card2pos){
            times[2] = setInterval(moveCard3, 3);
        }
        */

        times[0] = setInterval(moveCard1, 3);
        times[1] = setInterval(moveCard2, 3);
        times[2] = setInterval(moveCard3, 3);


        function moveCard1() {
            if (cardA.currentPos == usedPositions[0]) {
                reachedEndpoint = true;
                clearInterval(times[0]);
                newPos1 = usedPositions[0];
            }
            else if (cardA.currentPos < usedPositions[0]) {
                cardA.currentPos++;
                cardA.element.style.left = cardA.currentPos + 'px';
            }
            else if (cardA.currentPos > usedPositions[0]) {
                cardA.currentPos--;
                cardA.element.style.left = cardA.currentPos + 'px';
            }
        }
        function moveCard2() {
            if (cardB.currentPos == usedPositions[1]) {
                reachedEndpoint = true;
                clearInterval(times[1]);
                newPos2 = usedPositions[1];

            }
            else if (cardB.currentPos < usedPositions[1]) {
                cardB.currentPos++;
                cardB.element.style.left = cardB.currentPos + 'px';
            }
            else if (cardB.currentPos > usedPositions[1]) {
                cardB.currentPos--;
                cardB.element.style.left = cardB.currentPos + 'px';

            }
        }

        function moveCard3() {
            if (cardC.currentPos == usedPositions[2]) {
                reachedEndpoint = true;
                clearInterval(times[2]);
                newPos3 = usedPositions[2];

            }
            else if (cardC.currentPos < usedPositions[2]) {
                cardC.currentPos++;
                cardC.element.style.left = cardC.currentPos + 'px';
            }
            else if (cardC.currentPos > usedPositions[2]) {
                cardC.currentPos--;
                cardC.element.style.left = cardC.currentPos + 'px';

            }
        }
        
        function cut() {
            let cutNum = notUsedPositions.length;
            let numberFound = getRandom(cutNum);
            usedPositions.push(notUsedPositions[numberFound]);
            notUsedPositions.splice(numberFound, quantity);
            cutNum--;
        }
    }

    /*Old Method*/

    //moves the card from one position to the the next
    //function name describes what card is moving to where
    function oneToTwo() {
        //stops timer if the player reaches its destination
        if (cardA.currentPos == 200) {
            reachedEndpoint = true;
            clearInterval(time);
        }
        //otherwise increases the card's position frame by frame
        else {
            cardA.currentPos++;
            cardA.element.style.left = cardA.currentPos + 'px';
        }
    }

    function twoToOne() {
        if (cardB.currentPos == 0) {
            reachedEndpoint = true;
            clearInterval(time2);
        }
        //if a card is moving to the right, the frames decrease instead of increase
        else {
            cardB.currentPos--;
            cardB.element.style.left = cardB.currentPos + 'px';
        }
    }

    function onetoThree() {
        if (cardA.currentPos == 400) {
            reachedEndpoint = true;
            clearInterval(time);
        }
        else {
            cardA.currentPos++;
            cardA.element.style.left = cardA.currentPos + 'px';
        }
    }

    function threeToOne() {
        if (cardC.currentPos == 0) {
            reachedEndpoint = true;
            clearInterval(time2);
        }
        else {
            cardC.currentPos--;
            cardC.element.style.left = cardC.currentPos + 'px';
        }
    }

    function twotoThree() {
        if (cardB.currentPos == 400) {
            reachedEndpoint = true;
            clearInterval(time);
        }
        else {
            cardB.currentPos++;
            cardB.element.style.left = cardC.currentPos + 'px';
        }
    }

    function threeToTwo() {
        if (cardC.currentPos == 200) {
            reachedEndpoint = true;
            clearInterval(time2);
        }
        else {
            reachedEndpoint = true;
            cardC.currentPos--;
            cardC.element.style.left = cardB.currentPos + 'px';
        }
    }
    /*end of old method*/
}
