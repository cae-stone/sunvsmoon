function createImage(symbol){
    let symbolPic = new Image(100, 100)
    symbolPic.src = `./images/${symbol}.png`
    return symbolPic
}

function upperCase(word) {
    const capital = word[0].toUpperCase()
    const result = capital + word.slice(1)
    return result
  }

function classChange(cell, symbol) {
    cell.classList.remove("empty")
    cell.classList.add(symbol);
    cell.appendChild(createImage(symbol))
    return cell.classList
}


function randomBool() {
    const value = Math.floor(Math.random() * 2) + 1
    if(value == 1){
        return true
    } 
    else {
        return false
    }
}

const winPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export {upperCase, classChange, randomBool, winPossibilities}