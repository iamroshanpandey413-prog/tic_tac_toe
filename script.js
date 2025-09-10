const board = document.getElementById('game-board');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, i) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => makeMove(i));
        board.appendChild(cellDiv);
    });
}

function makeMove(idx) {
    if (cells[idx] || gameOver) return;
    cells[idx] = currentPlayer;
    renderBoard();
    if (checkWinner(currentPlayer)) {
        statusEl.textContent = `${currentPlayer} wins!`;
        gameOver = true;
    } else if (cells.every(cell => cell)) {
        statusEl.textContent = 'It\'s a draw!';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusEl.textContent = `Turn: ${currentPlayer}`;
    }
}

function checkWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    return winPatterns.some(pattern =>
        pattern.every(i => cells[i] === player)
    );
}

function restartGame() {
    cells = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = `Turn: ${currentPlayer}`;
    renderBoard();
}

restartBtn.addEventListener('click', restartGame);

restartGame();