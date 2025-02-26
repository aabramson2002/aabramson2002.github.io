//html elements
let card1 = document.querySelector("#card1");
let card2 = document.querySelector("#card2");
let card3 = document.querySelector("#card3");
let card4 = document.querySelector("#card4");
let card5 = document.querySelector("#card5");
let card6 = document.querySelector("#card6");
let card7 = document.querySelector("#card7");
let card8 = document.querySelector("#card8");
let card9 = document.querySelector("#card9");
let coin = document.querySelector("#the_coin");

//initial board


//win condition
let wintext = "You Win! Want to play again?"
coin.onclick() = function(){
    coin.innerHTML = wintext;
}

let pos;
const movementX = 300;
const movementY = 300;
let randMin = 1;
let randMax = 16;
//random function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandom(min, max){
    return Math.random() * (max-min) + min;
}



let currentspot;
let futureSpot = getRandom(randMin, randMax);

//movement classes and numbers
//1 = up 1
//2 = down 1
//3 = left 1
//4 = right 1
//5 = up 2
//6 = down 2
//7 = left 2
//8 = right 2
//9 = up 1 right 1
//10 = up 1 left 1 
//11 = down 1 right 1
//12 = down 1 left 1
//13 = up 2 right 2
//14 = up 2 left 2
//15 = down 2 right 2
//16 = down 2 left 2
//17 = up 2 left 1
//18 = up 2 right 1
//19 = up 1 left 2
//20 = up 1 right 2
//21 = down 2 left 1
//22 = down 2 right 1
//23 = down 1 left 2
//24 = down 1 right 2

//can do 2,4,6,8,11,15,22,24
if (currentspot == 1){
    switch(futureSpot){
        case 2:
            moveDown();
            break;
        case 4: 
            moveRight();
            break;
        case 6:
            down2();
            break;
        case 8:
            right2();
            break;
        case 11:
            diag3();
            break;
        case 15:
            diag7();
            break;
        case 22:
            diag14();
            break;
        case 24:
            diag16();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//2,3,4,6,11,12,21,22
else if (currentspot == 2)
{
    switch(futureSpot){
        case 2:
            moveDown();
            break;
        case 3:
            moveLeft();
            break;
        case 4: 
            moveRight();
            break;
        case 6:
            down2();
            break;
        case 11:
            diag3();
            break;
        case 12:
            diag4();
            break;
        case 21:
            diag13();
            break;
        case 22:
            diag14();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//2,3,6,7,12,16,21,23
else if (currentspot == 3)
{
    switch(futureSpot){
        case 2:
            moveDown();
            break;
        case 3: 
            moveLeft();
            break;
        case 6:
            down2();
            break;
        case 7:
            left2();
            break;
        case 12:
            diag4();
            break;
        case 16:
            diag8();
            break;
        case 21:
            diag13();
            break;
        case 23:
            diag15();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }   
}
//1,2,4,8,9,11,20,24
else if (currentspot == 4)
{
    switch(futureSpot){
        case 1:
            moveUp();
            break;
        case 2:
            moveDown();
        case 4: 
            moveRight();
            break;
        case 8:
            right2();
            break;
        case 11:
            diag3();
            break;
        case 20:
            diag12();
            break;
        case 24:
            diag16();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//1,2,3,4,9,10,11,12
else if (currentspot == 5)
{
    switch(futureSpot){
        case 1:
            moveUp;
            break;
        case 2:
            moveDown();
            break;
        case 3:
            moveLeft();
            break;
        case 4: 
            moveRight();
            break;
        case 9:
            diag1();
            break;
        case 10:
            diag2();
            break;
        case 11:
            diag3();
            break;
        case 12:
            diag4();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//1,2,3,7,10,12,19,23
else if (currentspot == 6)
{
    switch(futureSpot){
        case 1:
            moveUp();
            break;
        case 2:
            moveDown();
            break;
        case 3: 
            moveLeft();
            break;
        case 7:
            left2();
            break;
        case 10:
            diag2();
            break;
        case 12:
            diag4();
            break;
        case 19:
            diag11();
            break;
        case 23:
            diag15();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//1,4,5,8,9,13,18,20
else if (currentspot == 7)
{
    switch(futureSpot){
        case 1:
            moveUp();
            break;
        case 4: 
            moveRight();
            break;
        case 5:
            up2();
            break;
        case 8:
            right2();
            break;
        case 9:
            diag1();
            break;
        case 13:
            diag5();
            break;
        case 18:
            diag9();
            break;
        case 20:
            diag12();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//1,3,4,5,9,10,17,18
else if (currentspot == 8)
{
    switch(futureSpot){
        case 1:
            moveUp();
            break;
        case 3:
            moveUp();
            break;
        case 4: 
            moveRight();
            break;
        case 5:
            up2();
            break;
        case 9:
            diag1();
            break;
        case 10:
            diag2();
            break;
        case 17:
            diag9();
            break;
        case 18:
            diag10();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
//1,3,5,7,10,14,17,19
else if (currentspot == 9)
{
    switch(futureSpot){
        case 1:
            moveUp();
            break;
        case 3: 
            moveLeft();
            break;
        case 5:
            up2();
            break;
        case 7:
            left2();
            break;
        case 10:
            diag2();
            break;
        case 14:
            diag6();
            break;
        case 17:
            diag9();
            break;
        case 19:
            diag11();
            break;
        default:
            //roll again
            console.log("Can't make this movement");
    }
}
else
{
    console.log("Impossible location");
}

function moveUp(){
    pos += movementY;
}

function moveDown(){
    pos -= movementY
}

function moveLeft(){
    pos += movementX;
}

function moveRight(){
    pos -= movementX;
}

function up2(){
    moveUp();
    moveUp();
}

function down2(){
    moveDown();
    moveDown();
}

function left2(){
    moveLeft();
    moveLeft();
}

function right2(){
    moveRight();
    moveRight();
}

function diag1(){
    moveUp();
    moveRight();
}
function diag2(){
    moveUp();
    moveLeft();
}
function diag3(){
    moveDown();
    moveLeft();
}
function diag4(){
    moveDown();
    moveRight();
}
function diag5(){
    up2();
    left2();
}
function diag6(){
    up2();
    right2();
}
function diag7(){
    down2();
    left2();
}
function diag8(){
    down2();
    right2();   
}
function diag9(){
    up2();
    moveLeft();
}
function diag10(){
    up2();
    moveRight();
}
function diag11(){
    moveUp();
    left2();
}
function diag12(){
    moveUp();
    right2();
}
function diag13(){
    moveDown();
    left2();
}
function diag14(){
    moveDown();
    right2();
}
function diag15(){
    down2();
    moveLeft();
}
function diag16(){
    down2();
    moveRight();
}

function cardPosition(pos){
    return pos;
}