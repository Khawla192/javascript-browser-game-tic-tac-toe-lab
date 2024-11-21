/*-------------------------------- Constants --------------------------------*/
const playerX = 'X'
const playerO = 'O'
const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

/*---------------------------- Variables (state) ----------------------------*/
let currentPlayer = playerX
let winner = false
let tie = false
let board
let gameActive = true
let playerXScore = 0
let playerOScore = 0

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')
const newGameBtnEl = document.getElementById('newGame')
const playerXNameEl = document.getElementById('playerXName')
const playerONameEl = document.getElementById('playerOName')
const playerXScoreEl = document.getElementById('playerXScore')
const playerOScoreEl = document.getElementById('playerOScore')
const displayPlayerNameEl = document.querySelector('.display-Player-name')

/*-------------------------------- Functions --------------------------------*/

const render = () => {
    updateBoard()
    updateMessage()
    updateScores()
    updatePlayerDisplay()
}

const updatePlayerDisplay = () => {
    const xName = playerXNameEl.value || 'Player X'
    const oName = playerONameEl.value || 'Player O'
    displayPlayerNameEl.textContent = `${xName} vs ${oName}`
}

const init = () => {
    // Reset the Game including the scores
    board = ['', '', '', '', '', '', '', '', '']
    currentPlayer = playerX
    winner = false
    tie = false
    gameActive = true
    playerXScore = 0
    playerOScore = 0
    
    // Clear all squares
    squareEls.forEach(square => {
        square.textContent = ''
        square.style.backgroundColor = ''
        square.style.color = ''
    })
    
    playerXNameEl.value = ''
    playerONameEl.value = ''

    render()
}

const startNewGame = () => {
    // Reset the game state but keep scores
    board = ['', '', '', '', '', '', '', '', '']
    currentPlayer = playerX
    winner = false
    tie = false
    gameActive = true
    
    squareEls.forEach(square => {
        square.textContent = ''
        square.style.backgroundColor = ''
        square.style.color = ''
    })
    
    render()
}

const updateBoard = () => {
    board.forEach((cell, index) => {
        const square = squareEls[index]
        if (cell !== square.textContent) {
            square.textContent = cell
            if (cell === playerX) {
                square.style.color = '#1a73e8'
            } else if (cell === playerO) {
                square.style.color = '#e82b1a'
            } 
        }
    })  
}


const updateScores = () => {
    playerXScoreEl.textContent = playerXScore
    playerOScoreEl.textContent = playerOScore
}

const getPlayerName = (player) => {
    if (player === playerX) {
        return playerXNameEl.value || 'Player X'
    } else {
        return playerONameEl.value || 'Player O'
    }
}

const updateMessage = () => {
    if (winner) {
        const winnerName = getPlayerName(currentPlayer)
        messageEl.textContent = `Congrats ${winnerName} Wins!`
        messageEl.style.color = currentPlayer === playerX ? '#1a73e8' : '#e82b1a'
        // Update score
        if (currentPlayer === playerX) {
            playerXScore++
        } else {
            playerOScore++
        }
        updateScores()
    } else if (tie) {
        messageEl.textContent = "It's a Tie!"
        messageEl.style.color = 'green'
    } else {
        const playerName = getPlayerName(currentPlayer)
        messageEl.textContent = `${playerName}'s Turn`
        messageEl.style.color = currentPlayer === playerX ? '#1a73e8' : '#e82b1a'
    }
}

const handleClick = (event) => {
    if (!gameActive) return

    const square = event.target
    const squareIndex = parseInt(square.id)

    if (board[squareIndex] !== '') {
        const playerName = getPlayerName(currentPlayer)
        messageEl.textContent = `Square already taken! ${playerName}'s turn`
        return
    }

    board[squareIndex] = currentPlayer

    placePiece(squareEls)
    checkForWinner()
    checkForWinner()
    if (!winner) {
        checkForTie()
    }
    if (winner || tie) {
        gameActive = false
    } else {
        switchPlayerTurn()
    }
    render()
}


const placePiece = (index) => {
    board[index] = currentPlayer
    const square = squareEls[index]
    if (!board[index]) {
        board[index] = currentPlayer
        return true
    }
    return false
}

const checkForWinner = () => {
    winningCombos.forEach((combos) => {
        const [a, b, c] = combos
        if (board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winner = true
            return
        }
    })
}

const checkForTie = () => {
    tie = !board.includes('')
}

const switchPlayerTurn = () => {
        if (currentPlayer === playerX) {
            currentPlayer = playerO
        } else {
            currentPlayer = playerX
        }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
})


resetBtnEl.addEventListener('click', init)
newGameBtnEl.addEventListener('click', startNewGame)

// Add input event listeners to update player names
playerXNameEl.addEventListener('input', updatePlayerDisplay)
playerONameEl.addEventListener('input', updatePlayerDisplay)

// Initialize the game
init()

// window.onload = init