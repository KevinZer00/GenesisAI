document.addEventListener('DOMContentLoaded', () => {
    const returnHomeButton = document.getElementById('return-home');
    const boardElement = document.getElementById('tic-tac-toe-board');
    const restartButton = document.getElementById('restart-game');
    const thinkingMessage = document.getElementById('ai-thinking-message');
    const gameResultElement = document.getElementById('game-result');


    let isBoardInteractive = true; // Flag to control board interactivity
    let isHardMode = false; // Flag for AI difficulty

    const boardSize = 3;
    let board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
    let currentPlayer = 'X'; // Player is 'X', AI is 'O'

    const createBoard = () => {
        boardElement.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('tic-tac-toe-cell');
                cellElement.textContent = cell;
                cellElement.addEventListener('click', () => cellClicked(rowIndex, colIndex));
                boardElement.appendChild(cellElement);
            });
        });
    };

    const cellClicked = (rowIndex, colIndex) => {
        const gameResultElement = document.getElementById('game-result');
    
        if (!isBoardInteractive || board[rowIndex][colIndex] || checkWinner()) return;
    
        board[rowIndex][colIndex] = currentPlayer;
        createBoard();
    
        let winner = checkWinner();
        if (winner) {
            if (winner === 'Tie') {
                gameResultElement.textContent = "It's a tie!";
            } else if (winner === 'X') {
                gameResultElement.textContent = "You win!";
            } else if (winner === 'O') {
                gameResultElement.textContent = "Genesis wins!";
            }
            isBoardInteractive = false; // Disable further interactions
            return;
        }
    
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        isBoardInteractive = false; // Disable board interaction
        thinkingMessage.textContent = "Genesis is thinking...";
    
        setTimeout(() => {
            aiMove();
            isBoardInteractive = true; // Re-enable board interaction
            createBoard(); // Update the board after AI move
            thinkingMessage.textContent = "";
        }, 1000); // Simulate AI thinking time
    };
    

    
    
    

    const aiMove = () => {
        if (isHardMode) {
            if (!makeStrategicMove()) {
                makeRandomMove();
            }
        } else {
            makeRandomMove();
        }
        let winner = checkWinner();
        if (winner) {
            updateGameResult(winner);
        } else {
            currentPlayer = 'X'; // Switch back to the player
        }
    };

    const makeRandomMove = () => {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (!board[i][j]) {
                    board[i][j] = 'O';
                    return true;
                }
            }
        }
        return false;
    };

    const makeStrategicMove = () => {
        // Check for potential win or block in rows, columns, and diagonals
        for (let i = 0; i < boardSize; i++) {
            if (checkAndMakeMove(i, 0, i, 1, i, 2)) return true; // Check rows
            if (checkAndMakeMove(0, i, 1, i, 2, i)) return true; // Check columns
        }
    
        // Check diagonals
        if (checkAndMakeMove(0, 0, 1, 1, 2, 2) || checkAndMakeMove(0, 2, 1, 1, 2, 0)) return true;
    
        // If no immediate win or block, take a corner or center if available
        if (tryTakeCornerOrCenter()) return true;
    
        return false;
    };
    
    const checkAndMakeMove = (row1, col1, row2, col2, row3, col3) => {
        // Check if two cells are 'O' and one is empty, or two are 'X' and one is empty
        if (board[row1][col1] && board[row1][col1] === board[row2][col2] && !board[row3][col3]) {
            board[row3][col3] = 'O';
            return true;
        } else if (board[row1][col1] && board[row1][col1] === board[row3][col3] && !board[row2][col2]) {
            board[row2][col2] = 'O';
            return true;
        } else if (board[row2][col2] && board[row2][col2] === board[row3][col3] && !board[row1][col1]) {
            board[row1][col1] = 'O';
            return true;
        }
        return false;
    };
    
    const tryTakeCornerOrCenter = () => {
        // Center position
        if (!board[1][1]) {
            board[1][1] = 'O';
            return true;
        }
    
        // Corners
        const corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
        for (let corner of corners) {
            if (!board[corner[0]][corner[1]]) {
                board[corner[0]][corner[1]] = 'O';
                return true;
            }
        }
    
        return false;
    };
    

    const checkWinner = () => {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < boardSize; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                return board[i][0]; // Winner in a row
            }
            if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                return board[0][i]; // Winner in a column
            }
        }
        // Check diagonals
        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2] ||
            board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return board[1][1]; // Winner in a diagonal
        }
    
        // Check for a tie
        if (board.every(row => row.every(cell => cell))) {
            return 'Tie';
        }
    
        return null; // No winner yet
    };

    const updateGameResult = (winner) => {
        const gameResultElement = document.getElementById('game-result');
        if (winner === 'Tie') {
            gameResultElement.textContent = "It's a tie!";
        } else if (winner === 'X') {
            gameResultElement.textContent = "You win!";
        } else if (winner === 'O') {
            gameResultElement.textContent = "Genesis wins!";
        }
        isBoardInteractive = false; // Disable further interactions
    };
    
    
    

    restartButton.addEventListener('click', () => {
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
        currentPlayer = 'X';
        isBoardInteractive = true;
        isHardMode = true; // Enable hard mode after restarting the game
        document.getElementById('game-result').textContent = '';
        createBoard();
    });

    returnHomeButton.addEventListener('click', function() {
        // Redirect to index.html when the button is clicked
        window.location.href = 'index.html';
    });

    createBoard();
});
