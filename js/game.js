// game.js
// Quản lý trò chơi, bao gồm logic trò chơi, AI và đồng hồ đếm ngược
//import { getAIMove } from './ai.js';

const boardSize = 15;
const board = [];
let currentPlayer = 'X';
let gameOver = false;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const timerElement = document.getElementById('timer');
const turnProgress = document.getElementById('turn-progress-bar');

let playerWins = 0;
let aiWins = 0;

let totalTime = 300;
let turnTime = 30;
let totalTimerId = null;
let turnTimerId = null;

window.createBoard = function createBoard() {
  document.getElementById('game-container').style.display = 'block';
  boardElement.innerHTML = '';
  board.length = 0;

  for (let row = 0; row < boardSize; row++) {
    board[row] = [];
    for (let col = 0; col < boardSize; col++) {
      board[row][col] = '';
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }

  currentPlayer = 'X';
  gameOver = false;
  updateTurnLabel(true);
  updateTotalTimer();
  resetTimers();
};

function handleCellClick(e) {
  if (gameOver) return;

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  if (board[row][col] !== '') return;

  makeMove(row, col, currentPlayer);

  if (checkWin(row, col, currentPlayer)) {
    endGame(`🎉 Bạn thắng!`, 'player');
    return;
  }

  currentPlayer = 'O';
  updateTurnLabel(false);
  runAI();
}

function makeMove(row, col, player) {
  board[row][col] = player;
  const index = row * boardSize + col;
  const cells = boardElement.querySelectorAll('.cell');
  cells[index].textContent = player;
  cells[index].classList.add(player);
  if (typeof window.playPlaceSound === 'function') {
    window.playPlaceSound();
  }
}

function checkWin(row, col, player) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ];

  for (const [dRow, dCol] of directions) {
    let count = 1;
    let cells = [[row, col]];

    let r = row + dRow,
      c = col + dCol;
    while (count < 5 && inBounds(r, c) && board[r][c] === player) {
      cells.push([r, c]);
      r += dRow;
      c += dCol;
      count++;
    }

    r = row - dRow;
    c = col - dCol;
    while (count < 5 && inBounds(r, c) && board[r][c] === player) {
      cells.unshift([r, c]);
      r -= dRow;
      c -= dCol;
      count++;
    }

    if (count === 5) {
      highlightCells(cells);
      return true;
    }
  }

  return false;
}

function inBounds(row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function highlightCells(cells) {
  const allCells = boardElement.querySelectorAll('.cell');
  cells.forEach(([r, c]) => {
    const index = r * boardSize + c;
    allCells[index].classList.remove('ai-move');
    allCells[index].classList.add('win');
  });
}

function endGame(message, winner) {
  gameOver = true;
  statusElement.textContent = message;
  clearInterval(totalTimerId);
  clearInterval(turnTimerId);

  if (winner === 'player') {
    playerWins++;
  } else if (winner === 'ai') {
    aiWins++;
  }

  updateScoreboard();
  saveScoreboard();
}

function updateTurnLabel(isPlayerTurn) {
  statusElement.textContent = `Lượt: ${isPlayerTurn ? '❌ Bạn' : '⭕ AI'}`;
}

function updateScoreboard() {
  const winsEl = document.getElementById('player-wins');
  const lossesEl = document.getElementById('player-losses');
  const timeEl = document.getElementById('player-time');

  if (winsEl) winsEl.textContent = playerWins;
  if (lossesEl) lossesEl.textContent = aiWins;
  if (timeEl) timeEl.textContent = 300 - totalTime;
}

function saveScoreboard() {
  localStorage.setItem(
    'caro-scoreboard',
    JSON.stringify({
      playerWins,
      aiWins,
    })
  );
}

function loadScoreboard() {
  const saved = JSON.parse(localStorage.getItem('caro-scoreboard'));
  if (saved) {
    playerWins = saved.playerWins || 0;
    aiWins = saved.aiWins || 0;
    updateScoreboard();
  }
}

function resetTimers() {
  clearInterval(turnTimerId);
  clearInterval(totalTimerId);

  let turnRemaining = turnTime;
  turnProgress.style.width = '100%';

  turnTimerId = setInterval(() => {
    turnRemaining--;
    turnProgress.style.width = `${(turnRemaining / turnTime) * 100}%`;

    if (turnRemaining <= 0) {
      clearInterval(turnTimerId);
      handleTurnTimeout();
    }
  }, 1000);

  totalTimerId = setInterval(() => {
    totalTime--;
    updateTotalTimer();

    if (totalTime <= 0) {
      clearInterval(totalTimerId);
      clearInterval(turnTimerId);
      endGame('⏱️ Hết giờ!', 'ai');
    }
  }, 1000);
}

function updateTotalTimer() {
  const min = String(Math.floor(totalTime / 60)).padStart(2, '0');
  const sec = String(totalTime % 60).padStart(2, '0');
  timerElement.textContent = `⏱️ ${min}:${sec}`;
}

function handleTurnTimeout() {
  if (gameOver) return;

  if (currentPlayer === 'X') {
    endGame('❌ Hết giờ! Thua cuộc!', 'ai');
  } else {
    endGame('⭕ Hết giờ! ❌ Bạn thắng!', 'player');
  }
}

function runAI() {
  const aiThinkTime = Math.floor(Math.random() * 300) + 600;
  resetTimers();

  setTimeout(() => {
    if (!gameOver && currentPlayer === 'O') {
      const [aiRow, aiCol] = window.getAIMove(board);
      makeMove(aiRow, aiCol, 'O');

      const index = aiRow * boardSize + aiCol;
      const cells = boardElement.querySelectorAll('.cell');
      cells[index].classList.add('ai-move');

      setTimeout(() => {
        if (!cells[index].classList.contains('win')) {
          cells[index].classList.remove('ai-move');
        }
      }, 500);

      if (checkWin(aiRow, aiCol, 'O')) {
        endGame('⭕ AI thắng!', 'ai');
      } else {
        currentPlayer = 'X';
        updateTurnLabel(true);
        resetTimers();
      }
    }
  }, aiThinkTime);
}

resetBtn.addEventListener('click', () => {
  totalTime = 300;
  window.createBoard();
});

document.getElementById('reset-stats-btn')?.addEventListener('click', () => {
  document.getElementById('confirm-overlay')?.classList.remove('hidden');
});

function createConfirmPopup() {
  const confirmOverlay = document.createElement('div');
  confirmOverlay.id = 'confirm-overlay';
  confirmOverlay.className = 'overlay hidden';
  confirmOverlay.innerHTML = `
    <div class="confirm-box">
      <p>Bạn có chắc muốn xóa toàn bộ thống kê?</p>
      <div class="confirm-actions">
        <button id="confirm-yes">✅ Đồng ý</button>
        <button id="confirm-no">❌ Hủy</button>
      </div>
    </div>
  `;
  document.body.appendChild(confirmOverlay);

  document.getElementById('confirm-no').addEventListener('click', () => {
    confirmOverlay.classList.add('hidden');
  });

  document.getElementById('confirm-yes').addEventListener('click', () => {
    playerWins = 0;
    aiWins = 0;
    updateScoreboard();
    saveScoreboard();
    confirmOverlay.classList.add('hidden');
  });
}

createConfirmPopup();
loadScoreboard();
