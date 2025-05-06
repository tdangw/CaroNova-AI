// ai-nova.js
// AI nâng cao với điểm tấn công, phòng thủ và gần quân
// AI Nova nâng cấp: tấn công mạnh, phòng thủ tốt, ưu tiên ô gần quân cờ đã đánh
export function getAIMove(board) {
  const size = board.length;
  let bestScore = -Infinity;
  let bestMove = null;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] !== '') continue;

      const attackScore = evaluate(board, row, col, 'O') * 1.6;
      const defendScore = evaluate(board, row, col, 'X') * 1.2;
      const nearBonus = isNearExistingMove(board, row, col) ? 5 : 0;
      const total = attackScore + defendScore + nearBonus;

      if (total > bestScore) {
        bestScore = total;
        bestMove = [row, col];
      }
    }
  }

  return bestMove || [Math.floor(size / 2), Math.floor(size / 2)];
}

// Ưu tiên ô gần quân cờ đã đánh
function isNearExistingMove(board, row, col) {
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r === row && c === col) continue;
      if (r >= 0 && r < board.length && c >= 0 && c < board.length) {
        if (board[r][c] !== '') return true;
      }
    }
  }
  return false;
}

// Tính điểm dựa vào chuỗi cờ liên tục theo các hướng
function evaluate(board, row, col, symbol) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  let score = 0;

  for (const [dr, dc] of directions) {
    let count = 1;
    count += countDirection(board, row, col, dr, dc, symbol);
    count += countDirection(board, row, col, -dr, -dc, symbol);
    score = Math.max(score, count);
  }

  return score * score;
}

function countDirection(board, row, col, dr, dc, symbol) {
  let count = 0;
  for (let i = 1; i < 5; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || c < 0 || r >= board.length || c >= board.length) break;
    if (board[r][c] === symbol) count++;
    else break;
  }
  return count;
}
