// novaReaction.js - Quan sát nước đi của AI & Player và tạo phản ứng ngẫu nhiên vui nhộn

const aiReactions = [
  'Hehe 😼',
  'Tới công chuyện rồi nè! 💥',
  'Đừng khinh thường Nova nha~ 🤖',
  'Hên xui thôi... 😅',
  'Chuẩn bị khóc đi 🐱',
  'Nova mệt rồi, đi bừa á 😵',
  'Sắp thua rồi đó... nhưng vẫn cute 😢✨',
  'Lần này Nova nghiêm túc 😎',
  'Đây là chiêu ta học được từ Meow đại sư! 🐾',
];

const playerReactions = [
  'Hy vọng đi đúng... 😬',
  'Chơi đẹp nha! 😁',
  'Nova sợ chưa? 😏',
  'Tính cả rồi nha 😎',
  'Tới lượt mình! 🚀',
  'Hơi run run... 🫣',
  'Làm liều thôi 😅',
  'Lần này phải thắng! 🧠',
  'Nova đừng giận 😆',
  'Coi chừng nha... 💥',
];

// Tương tác từ phía AI
export function reactToAIMove(board, move, symbol) {
  const [row, col] = move;
  if (Math.random() < 0.6) {
    const message = aiReactions[Math.floor(Math.random() * aiReactions.length)];
    triggerReaction('ai', message);
  }
}

// Tương tác từ phía người chơi
export function reactToPlayerMove(board, move, symbol) {
  const [row, col] = move;
  if (Math.random() < 0.4) {
    const message = playerReactions[Math.floor(Math.random() * playerReactions.length)];
    triggerReaction('player', message);
  }
}

// Hiển thị bong bóng phản ứng gần avatar
function triggerReaction(who, message) {
  const avatarId = who === 'ai' ? 'ai-avatar' : 'player-avatar';
  const avatar = document.getElementById(avatarId);
  if (!avatar) return;

  const bubble = document.createElement('div');
  bubble.className = 'reaction-bubble';
  bubble.textContent = message;

  // Hiển thị ở bên trong cùng khối cha chứa avatar
  const container = avatar.parentElement;
  container.style.position = 'relative';
  bubble.style.position = 'absolute';
  bubble.style.bottom = '2px';
  bubble.style.left = '150%';
  bubble.style.transform = 'translateX(-50%)';
  bubble.style.background = '#fff2';
  bubble.style.color = '#fff';
  bubble.style.padding = '4px 8px';
  bubble.style.borderRadius = '12px';
  bubble.style.fontSize = '13px';
  bubble.style.backdropFilter = 'blur(4px)';
  bubble.style.boxShadow = '0 0 8px #0008';
  bubble.style.transition = 'opacity 0.3s ease';
  bubble.style.zIndex = '10';

  container.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = '0';
    setTimeout(() => bubble.remove(), 300);
  }, 2500);
}
