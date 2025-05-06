// ai-nova.js
// AI nâng cao với điểm tấn công, phòng thủ và gần quân
// AI Nova nâng cấp: tấn công mạnh, phòng thủ tốt, ưu tiên ô gần quân cờ đã đánh

// Lưu trữ lịch sử các nước đi
const moveHistory = new Set();
const gameHistory = [];

// Hàm lấy nước đi của AI
export function getAIMove(board) {
  const size = board.length;
  let bestMove = null;
  let bestScore = -Infinity;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] !== '') continue;

      // Kiểm tra nước đi thắng ngay lập tức
      if (isWinningMove(board, row, col, 'O')) {
        return [row, col]; // Ưu tiên đánh thắng ngay
      }

      // Kiểm tra nước đi chặn đối thủ thắng ngay lập tức
      if (isWinningMove(board, row, col, 'X')) {
        return [row, col]; // Ưu tiên chặn đối thủ thắng
      }

      // Kiểm tra nước đi nguy hiểm (combo 2+2 = 5 hoặc đường 3 quân nguy hiểm)
      const threatLevel = isThreatMove(board, row, col, 'X');
      if (threatLevel > 0) {
        return [row, col]; // Ưu tiên chặn nước đi nguy hiểm
      }

      // Kiểm tra nước đi có thể dẫn đến chiến thắng nhanh hơn
      const potentialWin = evaluatePotentialWin(board, row, col, 'O');
      if (potentialWin > 0) {
        return [row, col]; // Ưu tiên nước đi dẫn đến chiến thắng nhanh hơn
      }

      // Nếu không có nước đi nguy hiểm, tính điểm tấn công/phòng thủ
      const attackScore = evaluate(board, row, col, 'O') * 1.6;
      const defendScore = evaluate(board, row, col, 'X') * 1.2;
      const nearBonus = isNearExistingMove(board, row, col) ? 5 : 0;

      const moveKey = `${row},${col}`;
      const historyPenalty = moveHistory.has(moveKey) ? -10 : 0;

      const total = attackScore + defendScore + nearBonus + historyPenalty;

      if (total > bestScore) {
        bestScore = total;
        bestMove = [row, col];
      }
    }
  }

  if (bestMove) {
    moveHistory.add(`${bestMove[0]},${bestMove[1]}`);
  }

  return bestMove || [Math.floor(size / 2), Math.floor(size / 2)];
}

// Hàm Minimax với Alpha-Beta Pruning
export function minimax(board, depth, isMaximizing, alpha, beta) {
  const winner = checkWinner(board);
  if (winner === 'O') return 100 - depth; // AI thắng
  if (winner === 'X') return depth - 100; // Đối thủ thắng
  if (isBoardFull(board)) return 0; // Hòa

  if (depth === 3) return evaluateBoard(board); // Giới hạn độ sâu

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          board[row][col] = 'O'; // AI đi
          const evaluation = minimax(board, depth + 1, false, alpha, beta);
          board[row][col] = ''; // Hoàn tác nước đi
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) break; // Cắt tỉa Alpha-Beta
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          board[row][col] = 'X'; // Đối thủ đi
          const evaluation = minimax(board, depth + 1, true, alpha, beta);
          board[row][col] = ''; // Hoàn tác nước đi
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) break; // Cắt tỉa Alpha-Beta
        }
      }
    }
    return minEval;
  }
}

// Hàm lưu lịch sử ván đấu
export function saveGameResult(board, result) {
  gameHistory.push({ board, result });
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

// Hàm tải lịch sử ván đấu
export function loadGameHistory() {
  const savedHistory = localStorage.getItem('gameHistory');
  if (savedHistory) {
    return JSON.parse(savedHistory);
  }
  return [];
}

// Hàm phân tích lịch sử ván đấu để điều chỉnh chiến lược
export function analyzeGameHistory() {
  const history = loadGameHistory();
  let attackWeight = 1.6;
  let defenseWeight = 1.2;

  history.forEach((game) => {
    if (game.result === 'win') {
      attackWeight += 0.1; // Tăng trọng số tấn công nếu thắng
    } else if (game.result === 'lose') {
      defenseWeight += 0.1; // Tăng trọng số phòng thủ nếu thua
    }
  });

  return { attackWeight, defenseWeight };
}

// Hàm kiểm tra người thắng
export function checkWinner(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (evaluate(board, row, col, 'O') >= 25) return 'O'; // AI thắng
      if (evaluate(board, row, col, 'X') >= 25) return 'X'; // Đối thủ thắng
    }
  }
  return null; // Không có người thắng
}

// Hàm kiểm tra bàn cờ đã đầy hay chưa
export function isBoardFull(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '') return false;
    }
  }
  return true;
}

// Hàm kiểm tra nước đi thắng ngay lập tức
function isWinningMove(board, row, col, symbol) {
  board[row][col] = symbol; // Tạm thời đặt quân cờ
  const isWin = evaluate(board, row, col, symbol) >= 25; // 5 quân liên tiếp
  board[row][col] = ''; // Hoàn tác nước đi
  return isWin;
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
  return evaluateAttack(board, row, col, symbol) + evaluateDefense(board, row, col, symbol);
}

// Hàm kiểm tra ô trống ở cuối chuỗi
function isOpenEnd(board, row, col, dr, dc) {
  const r = row + dr;
  const c = col + dc;
  return r >= 0 && c >= 0 && r < board.length && c < board.length && board[r][c] === '';
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

function evaluateAttack(board, row, col, symbol) {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal (top-left to bottom-right)
    [1, -1], // Diagonal (top-right to bottom-left)
  ];
  let score = 0;

  for (const [dr, dc] of directions) {
    let count = 1;
    let openEnds = 0;

    // Đếm số quân liên tiếp theo hướng chính
    count += countDirection(board, row, col, dr, dc, symbol);
    // Đếm số quân liên tiếp theo hướng ngược lại
    count += countDirection(board, row, col, -dr, -dc, symbol);

    // Kiểm tra các ô trống ở hai đầu chuỗi
    if (isOpenEnd(board, row, col, dr, dc)) openEnds++;
    if (isOpenEnd(board, row, col, -dr, -dc)) openEnds++;

    // Tăng điểm dựa trên độ dài chuỗi và số ô trống xung quanh
    if (count >= 5) {
      score += 1000; // Ưu tiên thắng ngay
    } else if (count === 4 && openEnds > 0) {
      score += 800; // Ưu tiên tạo chuỗi 4 quân mở
    } else if (count === 3 && openEnds > 1) {
      score += 400; // Ưu tiên tạo chuỗi 3 quân mở
    } else if (count === 2 && openEnds > 1) {
      score += 150; // Ưu tiên tạo chuỗi 2 quân mở
    }
  }

  return score;
}

function evaluateDefense(board, row, col, symbol) {
  const opponent = symbol === 'O' ? 'X' : 'O';
  return evaluateAttack(board, row, col, opponent); // Phòng thủ dựa trên chiến lược tấn công của đối thủ
}

function isThreatMove(board, row, col, symbol) {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal (top-left to bottom-right)
    [1, -1], // Diagonal (top-right to bottom-left)
  ];

  let maxThreatLevel = 0;

  for (const [dr, dc] of directions) {
    const count1 = countDirection(board, row, col, dr, dc, symbol);
    const count2 = countDirection(board, row, col, -dr, -dc, symbol);

    // Tính số ô trống ở hai đầu chuỗi
    const openEnds = (isOpenEnd(board, row, col, dr, dc) ? 1 : 0) + (isOpenEnd(board, row, col, -dr, -dc) ? 1 : 0);

    // Đánh giá mức độ nguy hiểm
    const threatLevel = count1 + count2; // Tổng số quân liên tiếp
    if (threatLevel === 3 && openEnds > 0) {
      maxThreatLevel = Math.max(maxThreatLevel, 3); // Đường 3 quân nguy hiểm
    } else if (count1 === 2 && count2 === 2) {
      maxThreatLevel = Math.max(maxThreatLevel, 4); // Combo 2+2 = 5
    }
  }

  return maxThreatLevel; // Trả về mức độ nguy hiểm cao nhất
}

function evaluatePotentialWin(board, row, col, symbol) {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal (top-left to bottom-right)
    [1, -1], // Diagonal (top-right to bottom-left)
  ];

  for (const [dr, dc] of directions) {
    const count1 = countDirection(board, row, col, dr, dc, symbol);
    const count2 = countDirection(board, row, col, -dr, -dc, symbol);

    // Nếu tổng số quân liên tiếp >= 4, nước đi này có thể dẫn đến chiến thắng
    if (count1 + count2 >= 4) {
      return 1; // Ưu tiên nước đi này
    }
  }

  return 0; // Không có nước đi tiềm năng dẫn đến chiến thắng
}

// Hàm tính điểm tổng thể của bàn cờ
function evaluateBoard(board) {
  let score = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 'O') {
        score += evaluateAttack(board, row, col, 'O'); // Điểm tấn công của AI
      } else if (board[row][col] === 'X') {
        score -= evaluateAttack(board, row, col, 'X'); // Điểm tấn công của đối thủ
      }
    }
  }

  return score;
}
