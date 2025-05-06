import '../js/game.js';

let selectedAI = 'basic';

const aiCards = document.querySelectorAll('.ai-card');
const nextBtn = document.getElementById('next-to-name-btn');
const nameOverlay = document.getElementById('name-input-overlay');
const confirmBtn = document.getElementById('confirm-name-btn');
const playerNameInput = document.getElementById('player-name-input');
const aiMenu = document.getElementById('ai-menu');
const gameContainer = document.getElementById('game-container');

// Tự động điền tên gần nhất đã dùng
function autoFillLastUsedName() {
  const lastName = localStorage.getItem('playerName');
  if (lastName) {
    playerNameInput.value = lastName;
  }
}

// Chọn AI
aiCards.forEach((card) => {
  card.addEventListener('click', () => {
    aiCards.forEach((c) => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedAI = card.dataset.ai;
  });
});

// Tiếp theo → sang nhập tên
nextBtn.addEventListener('click', () => {
  aiMenu.style.display = 'none';
  nameOverlay.style.display = 'flex';
  autoFillLastUsedName();
});

// Bắt đầu game
confirmBtn.addEventListener('click', async () => {
  let name = playerNameInput.value.trim();
  if (!name) name = 'Player';

  const selectedCard = document.querySelector('.ai-card.selected');
  const aiName = selectedCard.dataset.name;
  const aiAvatar = selectedCard.dataset.avatar;

  localStorage.setItem('playerName', name);
  localStorage.setItem('selectedAI', selectedAI);
  localStorage.setItem('aiName', aiName);
  localStorage.setItem('aiAvatar', aiAvatar);

  const mod = await (selectedAI === 'meow' ? import('./ai-nova.js') : import('./ai.js'));
  window.getAIMove = mod.getAIMove;

  nameOverlay.style.display = 'none';
  gameContainer.style.display = 'block';

  updatePlayerInfo(name, aiName, aiAvatar);
  window.createBoard();
  const placeSound = document.getElementById('place-sound');
  if (placeSound) {
    // Chỉ gán hàm vào global để dùng về sau
    window.playPlaceSound = () => {
      placeSound.currentTime = 0;
      placeSound.play().catch(() => {});
    };
  }
});

function updatePlayerInfo(playerName, aiName, aiAvatar) {
  const leftInfo = document.createElement('div');
  leftInfo.className = 'player-info player';
  leftInfo.innerHTML = `
    <img src="assets/avatars/player.png" class="avatar" id="player-avatar" />
    <div class="player-name">${playerName}<br><span id="player-level">Level 1</span></div>
  `;

  const rightInfo = document.createElement('div');
  rightInfo.className = 'player-info ai';
  rightInfo.innerHTML = `
    <img src="${aiAvatar}" class="avatar" id="ai-avatar" />
    <div class="player-name">${aiName}<br><span id="ai-level">Level 1</span></div>
  `;

  const timer = document.getElementById('timer');
  const wrapper = timer.parentElement;
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'space-between';
  wrapper.style.gap = '10px';
  wrapper.prepend(leftInfo);
  wrapper.append(rightInfo);
}
