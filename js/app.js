/*-------------------------------- Constants --------------------------------*/

const playerX = 'X'
const playerO = 'O'
const gridSize = 3
const winningCombos  = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

/*---------------------------- Variables (state) ----------------------------*/

let currentPlayer = playerX
let winner = false
let tie = false
let board = ['', '', '', '', '', '', '', '', '', ]
// let boardArray = Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
let timer
let timeLeft = 5
let gameActive = true

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')

/*-------------------------------- Functions --------------------------------*/

// Create a function called render
const render = () => {
    //  Invoke both the updateBoard and the updateMessage functions inside your render function
    updateBoard()
    updateMessage()
}

// Create a function called init
const init = () => {
    // Call a function named render() at the end of the init() function
    render()
}

// Create a function called updateBoard
const updateBoard = () => {
    // In the updateBoard function, loop over board and for each element:
    board.forEach((cell, index) => {
        // Use the current index of the iteration to access the corresponding square in the squareEls
        let square = squareEls[index]
        if (cell === playerX) {
            square.textContent = playerX 
        } else if (cell === playerO) {
            square.textContent = playerO 
        } else {
            square.textContent = '' 
        }
    })
    
    // Style that square however you wish, dependent on the value contained in the current cell being iterated over ('X', 'O', or ''). 
}
// To keep it simple, start by just putting a letter in each square depending on the value of each cel
// board = ['X', 'O', '', 'X', '', 'O', 'O', 'X', '']

// Create a function called updateMessage
const updateMessage = () => {
    // If both winner and tie have a value of false (meaning the game is still in progress), render whose turn it is
    if (winner === tie) {
        messageEl.textContent = `It ${currentPlayer} turn`
    } 
    // If winner is false, but tie is true, render a tie message
    else if (winner === false && tie === true) {
        messageEl.textContent = 'It is a TIE'
    } 
    // Otherwise, render a congratulatory message to the player that has won
    else {
        messageEl.textContent = `Congrats ${currentPlayer}`
    } 
}

// Create a function called handleClick. It will have an event parameter
const handleClick = (event) => {
    // the first player he should play "X" and the second one will play "O"
    // the game will continue for every square less than the total square number or until one of the player win
    // if the game start the first value should be "X" and the value after it shoul dbe "O"
    const squareIndex = event.target.id
    if (squareIndex === 'X' || squareIndex === 'O' ) {
        return
    }
    if (winner === true) {
        return
    }
    
    // If the board has a value of 'X' or 'O' at the squareIndex position, immediately return out of handleClick "That square is already taken"
    if (squareIndex.textContent === playerX || squareIndex.textContent === playerO) {
        return
    }
    // Also, if winner is true, immediately return out of handleClick because the game is over
    if (winner === true) {
        return
    }
    
    // In the handleClick function, call the placePiece function. Pass squareIndex to it as an argument
    placePiece(squareEls)
    // In the handleClick function, call the checkForWinner function immediately after calling the placePiece function
    checkForWinner()
    // In the handleClick function, call the checkForTie function immediately after calling the checkForWinner function
    checkForTie()
    // In the handleClick function, call the switchPlayerTurn function immediately after calling the checkForTie function
    switchPlayerTurn()
}


// Create a function named placePiece that accepts an index parameter
const placePiece = (index) => {
    board[index] = currentPlayer
    console.log(board)
}

// Create a function called checkForWinner
const checkForWinner = () => {
    // Option 2 - Level Up 🚀 This method takes advantage of the winningCombos array you wrote in step 5.
    // 1. Loop through each of the winning combination arrays defined in the winningCombos array. Use the three values in each winning combination to retrieve the values held in those index positions of the board array.
    // For example, the first winning combination is [0, 1, 2], representing the top row. Using that winning combination as a guide, you’ll need to access the values held in the board array’s 0, 1, and 2 indexes.
    // 2. Check the following for each of the eight winning combinations:
    // 2.1. Check to see if the value held in the first position is not an empty string ''.
    // 2.2. Also, check to see if the value held in the first position equals the value held in the second position.
    // 2.3. Also, check to see if the value held in the first position equals the value held in the third position.
    // 2.4. If those three conditions are all true, then someone has won. Set winner to true
        
    winningCombos.forEach((combos) => {
        const [a, b, c] = combos

        if (board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = true
        }
    })
}

// Create a function named checkForTie
const checkForTie = () => {
    // Check if there is a winner. If there is, return out of the function
    if (winner === true) {
        return
    }
    // Check if the board array still contains any elements with a value of ''. If it does, we can leave tie as false. Otherwise, tie should be set to true
    if (board.textContent === '') {
        tie = false
    } else {
        tie = true
    }
}

// Create a function called switchPlayerTurn
const switchPlayerTurn = () => {
    // If winner is true, return out of the function - we don’t need to switch the turn anymore because the person that just played won!
    if (winner === true){
        return
    }
    //  If winner is false, change the turn by checking the current value of turn. If it is 'X' then change turn to 'O'. If it is 'O' then change turn to 'X'
    if (winner === false) {
        if (currentPlayer === playerX) {
            currentPlayer = playerO
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX
        }
    }
}

/*----------------------------- Event Listeners -----------------------------*/

// Attach an event listener to the game board

// Option 1: Add an event listener to each of the existing squareEls with a loop
//  Set up the event listener to respond to the 'click' event
//  The event listener should call the handleClick function
squareEls.forEach((element) => {
    element.addEventListener('click', handleClick)
})

// Option 2 - Level Up 🚀: Add a new cached element reference that will allow you to take advantage of event bubbling
//  Set up an event listener on it that responds to the 'click' event 
// On the 'click' event, it should call the handleClick function 
// If you use this method, you’ll need to ensure the element the user clicks is a square! If they click anywhere else on the board, return out of the function to disallow the move 
// This can be accomplished more easily once you obtain the index of the square clicked in the next step!

// Obtain the index of the clicked square. To do this, get the index from an id assigned to the target element in the HTML
// Assign this to a constant called squareIndex
squareEls.forEach((element) => {
    // let index = element.target
    element.addEventListener('click', handleClick)
})


// Call the init function when the app loads
window.onload = init

resetBtnEl.addEventListener('click', init)