document.addEventListener('DOMContentLoaded', () => {
    const returnHomeButton = document.getElementById('return-home');
    const boardElement = document.getElementById('tic-tac-toe-board');
    const restartButton = document.getElementById('restart-game');
    const thinkingMessage = document.getElementById('ai-thinking-message');
    const gameResultElement = document.getElementById('game-result');

    let isBoardInteractive = true; // Flag to control board interactivity
    let gameCount = 0; // Keep track of the number of games played
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
        if (!isBoardInteractive || board[rowIndex][colIndex] || checkWinner()) return;

        board[rowIndex][colIndex] = currentPlayer;
        createBoard();

        let winner = checkWinner();
        if (winner) {
            gameResultElement.textContent = winner === 'Tie' ? "It's a tie!" : winner === 'X' ? "You win!" : "Genesis wins!";
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
        }, 1000);
    };

    const aiMove = () => {
        if (gameCount >= 2) {
            let bestMove = minimax(board, 'O');
            board[bestMove.index[0]][bestMove.index[1]] = 'O';
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
        let emptyCells = emptyIndices(board);
        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let cell = emptyCells[randomIndex];
            board[cell[0]][cell[1]] = 'O';
        }
    };

    const minimax = (newBoard, player) => {
        const availSpots = emptyIndices(newBoard);

        if (checkWin(newBoard, 'X')) {
            return { score: -10 };
        } else if (checkWin(newBoard, 'O')) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }

        let moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = availSpots[i];
            newBoard[move.index[0]][move.index[1]] = player;

            let result = minimax(newBoard, player === 'O' ? 'X' : 'O');
            move.score = result.score;

            newBoard[move.index[0]][move.index[1]] = '';

            moves.push(move);
        }

        let bestMove = moves[0];
        if (player === 'O') {
            let bestScore = -10000;
            for (let move of moves) {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            }
        } else {
            let bestScore = 10000;
            for (let move of moves) {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            }
        }
        return bestMove;
    };

    const emptyIndices = (board) => {
        let empty = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === '') {
                    empty.push([i, j]);
                }
            }
        }
        return empty;
    };

    const checkWin = (board, player) => {
        // Horizontal, vertical, and diagonal check
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
            if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
        }
        if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
        if (board[2][0] === player && board[1][1] === player && board[0][2] === player) return true;
        return false;
    };

    const checkWinner = () => {
        if (checkWin(board, 'X')) return 'X';
        if (checkWin(board, 'O')) return 'O';
        if (board.every(row => row.every(cell => cell !== ''))) return 'Tie';
        return null;
    };

    const updateGameResult = (winner) => {
        gameResultElement.textContent = winner === 'Tie' ? "It's a tie!" : winner === 'X' ? "You win!" : "Genesis wins!";
        isBoardInteractive = false;
    };

    restartButton.addEventListener('click', () => {
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
        currentPlayer = 'X';
        isBoardInteractive = true;
        gameCount++; // Increase the game count
        gameResultElement.textContent = ''; // Clear the game status message
        createBoard();
    });


    returnHomeButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    createBoard();
});
