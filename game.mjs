//--SET UP--/
let symbol
let gameIsOver = false
let sunTurn = randomBool()
let sunWins = 0
let moonWins = 0

import {randomBool, upperCase, classChange, winPossibilities } from "./functions.mjs"

document.getElementById("subtitle").innerHTML = `It's ${sunTurn ? "Sun" : "Moon"}'s turn first.`
document.getElementById("instructions").innerHTML = "Click any cell to start."
const scoreCard = document.getElementsByClassName('scorecard'); 

//--CELL CLICKING--//
const cells = document.getElementsByTagName("TD")

for (let i = 0; i < cells.length; i++) {
    cells[i].onclick = cellClicked
}

function cellClicked(e) {
    const cell = e.target
    if (cell.classList.contains("empty")){
        symbol = sunTurn ? "sun" : "moon"
        if(!gameIsOver) {
            cell.classList = classChange(cell, symbol);}
        checkForWin(symbol)
        if(!gameIsOver){
            sunTurn = !sunTurn
            sunTurn ? symbol = "sun": symbol = "moon"
            document.getElementById("subtitle").innerHTML =  `It's ${sunTurn ? "Sun" : "Moon"}'s turn.`
            document.getElementById("instructions").innerHTML = ""
        }  
    }   
  }


//--CHECK FOR WIN - GAME END--//
function checkForWin(symbol){
    for (let i = 0; i < winPossibilities.length; i++) {
        const cellWin = winPossibilities[i]
        if (cells[cellWin[0]].classList.contains(symbol) && cells[cellWin[1]].classList.contains(symbol) && cells[cellWin[2]].classList.contains(symbol)){
            gameIsOver = true
        } 
    }
    if (gameIsOver) {
        if(!scoreCard[0].classList.contains("visible")){
            document.getElementById("sunScore").innerHTML = `Sun: ${sunWins}`
            document.getElementById("moonScore").innerHTML = `Moon: ${moonWins}`
        }
        if(symbol == "sun"){
            sunWins ++ 
            document.getElementById("sunScore").innerHTML = `Sun: ${sunWins}`
        } else {
            moonWins ++
            document.getElementById("moonScore").innerHTML = `Moon: ${moonWins}`
        }
        document.getElementById("subtitle").innerHTML = `${upperCase(symbol)} is the winner`
        document.getElementById("instructions").innerHTML = "Would you like to restart?"
        const button = document.getElementsByTagName('button')
        button[0].classList.add("visible")
    } else {
        cellCheck()
    }
}

function cellCheck() {
    let cellCount = 0
    for (let i = 0; i < cells.length; i++) {
        if(cells[i].classList.contains("empty")){
            cellCount = cellCount + 1
        }
    }
    if(cellCount == 0){
        gameIsOver = true
        document.getElementById("subtitle").innerHTML = "Stalemate! There is no winner for this round."
        document.getElementById("instructions").innerHTML = "Would you like to restart?"
        const button = document.getElementsByTagName('button')
        if(!button[0].classList.contains("visible")){
            button[0].classList.add("visible");
        }
    }
} 

//--RESTART GAME--//
function restart(){
    if(!scoreCard[0].classList.contains("visible")){
        scoreCard[0].classList.add("visible")
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("class")
        cells[i].classList.add("empty")
        const pic = cells[i].getElementsByTagName('IMG')
        if(pic.length > 0){
            cells[i].removeChild(pic[0])
        }
    }
    gameIsOver = false
    sunTurn = randomBool()
    sunTurn ? symbol = "sun": symbol = "moon"
    document.getElementById("subtitle").innerHTML = `It's ${upperCase(symbol)}'s turn first.`
    document.getElementById("instructions").innerHTML = "Click any cell to start."
    const button = document.getElementsByTagName('button')
    button[0].removeAttribute("class");
}

const restartButton = document.getElementById('restart')
restartButton.addEventListener('click', restart)
