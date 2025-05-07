// level.js - Quản lý cấp độ người chơi và AI

import { playSound } from './soundManager.js';

export let gameState = {
  lastPlayerLevel: 1,
  lastAILevel: 1,
  initialized: false,
};

export function updateLevelDisplay(playerWins, playerLosses) {
  const playerLevel = Math.floor(playerWins / 3) + 1;
  const aiLevel = Math.floor(playerLosses / 3) + 1;

  const playerLevelEl = document.getElementById('player-level');
  const aiLevelEl = document.getElementById('ai-level');

  if (playerLevelEl) playerLevelEl.textContent = `Level ${playerLevel}`;
  if (aiLevelEl) aiLevelEl.textContent = `Level ${aiLevel}`;

  if (!gameState.initialized) {
    gameState.lastPlayerLevel = playerLevel;
    gameState.lastAILevel = aiLevel;
    gameState.initialized = true;
    return;
  }

  if (playerLevel > gameState.lastPlayerLevel) {
    showLevelUpOverlay('Player', playerLevel);
    gameState.lastPlayerLevel = playerLevel;
  }

  if (aiLevel > gameState.lastAILevel) {
    showLevelUpOverlay('Nova', aiLevel);
    gameState.lastAILevel = aiLevel;
  }
}

export function showLevelUpOverlay(who, newLevel) {
  playSound('levelup'); // 🔊 Gọi ngay trong overlay (giữ hiệu ứng đồng bộ)

  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';
  overlay.innerHTML = `<span>🎉 ${who} đã lên Level ${newLevel}!</span>`;
  document.body.appendChild(overlay);

  const avatarId = who === 'Player' ? 'player-avatar' : 'ai-avatar';
  const avatar = document.getElementById(avatarId);
  if (avatar) {
    avatar.classList.add('level-up-glow');
    setTimeout(() => avatar.classList.remove('level-up-glow'), 2000);
  }

  setTimeout(() => {
    overlay.remove();
  }, 2500);
}
