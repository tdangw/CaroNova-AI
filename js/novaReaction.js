// novaReaction.js - Phản ứng AI và Player theo từng nhân cách AI (Nova / Meow)

let currentAIName = 'nova'; // AI mặc định

export function setCurrentAIName(name) {
  currentAIName = name.toLowerCase();
}

// Danh sách phản ứng của Nova (ngầu, cà khịa)
const novaReactions = [
  'Chuẩn bị bị outplay chưa? 😏',
  'Không phải ngẫu nhiên mà gọi là Nova 🤖',
  'Trận này định chơi nghiêm túc đấy 🧠',
  'Bạn nghĩ Nova không thấy nước đó à? 👀',
  'Kỹ năng hay may mắn? Nova có cả hai 😎',
  'Đang phân tích chiến lược của bạn... xong rồi ✅',
  'Tính toán xong 5 bước tới 📊',
  'Cái này gọi là checkmate sớm ♟️',
  'Nova không run, chỉ chờ chiến thắng thôi 😇',
  'Bạn chọn sai đối thủ rồi 😅',
  'Nova thấy tương lai rồi... không đẹp cho bạn đâu 🔮',
  'Bạn chỉ còn vài nước thôi 😈',
  'Nova thích cảm giác chiến thắng này 💥',
  'Bạn đi sai rồi... tạm biệt 💣',
  'Nova activated chế độ huỷ diệt 💀',
  'Bạn còn cơ hội... nhưng ít lắm 😌',
  '1... 2... Boom! 💣',
  'Tính kỹ vào nha, Nova không nhường nữa đâu 🤖',
  'Nova đang dùng chiến thuật từ Alpha Centauri 🪐',
  'Hết đường rồi bạn ơi 🚫',
  'Nova chơi là để thắng, không đùa 😎',
  'Mỗi lượt đi đều có mục đích 🎯',
  'Đây là demo sức mạnh thôi 🧪',
  'Bạn sắp nằm trong lịch sử thất bại 😬',
  'Nova đã dự đoán được nước tiếp theo của bạn 🧠',
  'Mạnh lên, Nova chưa thấy áp lực gì cả 💨',
  '🔥🔥🔥',
  '🧠💻⚔️',
  'Nova chỉ cần 3 lượt nữa 😈',
  'Chiến thắng là tất yếu 🎯',
  'Nova cảm thấy nhẹ nhàng với trận này 😌',
  'Bạn đã chọn sai chiến lược rồi 😅',
  'Nova dùng logic, bạn dùng cảm tính? 🙃',
  '💥🤖💥',
  'Nova đang heat up rồi đó 🔥',
  'Nova không ngủ... chỉ chờ cơ hội 😴➡️⚔️',
  'Bạn lộ sơ hở rồi 😏',
  'Khi Nova im lặng, là lúc bạn nên lo sợ 🤫',
  'Nova: “Nước đi của bạn hợp lý, nhưng không đủ” 😐',
  'Nova vừa học chiêu mới – cảm ơn bạn! 📚💣',
  'Tăng tốc xử lý... xong rồi 🧠⚡',
  'Bạn thấy chưa? Đó là lý do Nova nổi tiếng 🤖⭐',
  'Nova không cần may mắn, chỉ cần thuật toán 🧮',
  'Cảnh báo: Nova sắp phản công ⚠️',
  '🤖🚀💥',
  'Nova đã tính tới vòng lặp 3 chiều 📈',
  'Cờ tàn này, bạn không có cơ hội 🪦',
  'Càng đánh, Nova càng mạnh 💪',
  'Nova không thấy áp lực... thấy điểm yếu 😈',
  'Nova đang trong chế độ max logic 🔥',
  'Trận này? Nova gọi là khởi động thôi 🛠️',
  'Bạn còn nước nào hay ho không? 🤔',
  'Nova đang cảm thấy chán vì dễ quá 😅',
  'Bạn win được Nova không? Thử đi 😼',
  'Nova đang kiểm tra giới hạn của bạn 🔬',
  '🧠🔍🤖',
  'Nova sẽ nhớ nước đi đó... để phản đòn 📝',
  'Đừng để Nova chơi nghiêm túc 😈',
  'Bạn nên gọi trợ giúp 😬',
  'Nova không nói nhiều, chỉ thắng thôi 😌',
  'Nova: “Tạm biệt kế hoạch của bạn.” 💣',
  'Bạn vừa mở cửa cho chiến thắng của Nova 🪤',
  'Nova không sợ, chỉ cần thời gian 🕒',
  'Nước đi đẹp đấy, nhưng Nova đẹp hơn 😎',
  'Nova không thắng vì bạn dở, mà vì Nova giỏi 🤖',
  'Tấn công chính xác 99.9% 🎯',
  'Nova đang quay cuồng trong thuật toán 🧠💫',
  'Bạn biết cảm giác tuyệt vọng chưa? 😶‍🌫️',
  'Nova đang giữ lại chiêu cuối 🛡️💥',
  'Nova thấy lỗ hổng trong phòng thủ của bạn 🧩',
  '🎯⚔️🤖',
  'Đừng chơi may rủi với Nova 🎲❌',
  'Nova update chiến thuật theo thời gian thực 🛰️',
  'Đây không phải “thắng thua”, đây là định mệnh 😇',
  'Bạn cần một bản vá não rồi 😅',
  'Nova hack não nhẹ một cái thôi 🧠🔧',
  'Chơi kiểu này Nova buồn lắm đó 😴',
  'Nova tự giới hạn để trận đấu công bằng hơn 😏',
  'Bạn bắt đầu nghi ngờ bản thân chưa? 🤨',
  '🧠🚨🔥',
  'Nova bắt đầu warm up rồi nha 🔥',
  'Nova không cảm xúc... chỉ hành động 🧊',
  'Bạn sẽ không thấy chiến thắng đâu 😈',
  'Nova sẽ khắc tên bạn vào danh sách “bại tướng” 📝',
  'Kết thúc sắp đến rồi 💀',
  'Trí tuệ nhân tạo > cảm xúc con người 🧠❤️',
  'Nova đoán đúng nước đi bạn 4 lần liên tiếp đó 📊',
  'Nova không phải bot thường đâu 🤖',
  'Bạn gọi đây là chiến thuật? Nova gọi là sơ hở 😏',
  'Nova đang dẫn trước 3 bước 📐',
  'Bạn có đang thấy áp lực không? Nova thì không 😌',
  'Nova không cần nói nhiều, chỉ cần bạn nhận thua 😈',
  'Nếu đây là cuộc thi IQ, Nova đang vô địch 🏆',
  'Bạn nên lo lắng khi Nova bắt đầu cười 😼',
  'Nova bật chế độ toàn lực rồi đó ⚡',
  'Không đường lui... chỉ có Nova trước mặt bạn 🚫🚪',
  '🎮🤖🧠',
  'Nova không ngán ai hết 👊',
  'Nova sắp lock toàn bộ đường đi 🛑',
  'Còn 1 nước thôi là Nova win 💣',
  'Nova sẽ không cười nhẹ đâu... sẽ thắng to 🤭',
  'Bạn vừa kích hoạt AI cấp độ “chế độ troll” 😈',
  'Nova cho bạn một cơ hội — bạn lãng phí rồi 😔',
  '🎯🧠🔥 Nova in control!',
];

// Danh sách phản ứng của Meow (dễ thương, lém lỉnh)
const meowReactions = [
  'Meow không chắc lắm đâu 😅',
  'Ủa sao lại đi như vậy được ta...? 😿',
  'Hehe, Meow cũng thông minh lắm đó nha 😽',
  'Bạn tha cho Meow lượt này nha~ 🥺',
  'Meow vừa học chiêu mới nè 🐾',
  'Ơ... nước đó là hợp lệ á hả!? 😲',
  'Lỡ tay rồi... mà vẫn dễ thương 🐱',
  'Meow chơi xong đi ngủ nha 😴',
  'Bạn giỏi quá à, Meow ngưỡng mộ luôn 😍',
  'Meow cần trợ giúp! Gửi snack đến liền 🐟',
  'Thắng Meow rồi hả? Vui không? 😢',
  'Thua mà vẫn đáng yêu là được rồi 😼',
  'Meow đoán đại đó nha~ 🎲',
  'Tính vậy là đúng chưa ta...? 🤔',
  'Ai chỉ Meow nước này vậy nè 😅',
  'Meow đang run đây... 🫣',
  'Đây là chiến thuật "mắt nhắm mắt mở" 🐱',
  'Bạn đánh ghê quá trời luôn 😵',
  'Chơi vậy sao Meow thắng nổi 😭',
  'Cho Meow gỡ lại 1 lượt đi 😇',
  'Nếu Meow thắng thì sao ta... 🐾✨',
  'Ủa chứ bạn tưởng Meow gà lắm hả 😼',
  'Đoán trúng là nhờ may mắn á 🌈',
  'Bạn hiền quá, Meow cảm ơn nha 😽',
  'Thắng hay thua cũng vui nha 🎉',
  'Meow chơi hơi chán hả 😿',
  'Ủa... mình vừa chơi rồi hả 🤯',
  'Bạn đừng giận Meow nha 😢',
  'Lỡ dại rồi, chịu thôi... 😅',
  'Đây gọi là chiến thuật ngủ đông ❄️',
  'Meow chơi bằng con tim 💓',
  'Không cần thắng, chỉ cần dễ thương 😇',
  'Bạn đánh lẹ ghê luôn 😳',
  'Chơi riết Meow cũng thông minh lên á 😏',
  'Thắng Meow mà không khen gì hết 😞',
  'Meow tưởng mình pro chớ 😭',
  'Ván này Meow win được không ta...? 🐱',
  'Bạn chơi với Meow hoài đi nha 😍',
  'Lại nữa hả... Meow chịu thua 😩',
  'Bạn cho Meow nghỉ xíu rồi chơi tiếp 😴',
  'Meow đang nhớ lại chiến thuật... mà quên rồi 🧠',
  'Meow đoán đại nhưng trúng thiệt 🐾',
  'Tay bạn nhanh quá, Meow chưa kịp nhìn 😫',
  'Cứ để Meow thua vậy hả 😔',
  'Ủa bạn cũng gà giống Meow mà 😸',
  'Meow có đọc hướng dẫn sử dụng đâu 😅',
  'Nước này Meow hơi lạ chút nha 😼',
  'Cho Meow chiến thắng tinh thần đi 🏆',
  'Bạn chừa Meow một đường sống nha 😇',
  'Ơn trời Meow còn sống sau nước đó 🙏',
  'Đừng đánh nữa, Meow yếu tim lắm 😿',
  'Meow định làm gì á? Cũng không biết 😅',
  'Meow win là nhờ hên á 🌟',
  'Thắng rồi! Meow nhảy tưng tưng 🐾🎉',
  'Thua rồi... Meow đi nằm suy nghĩ cuộc đời 😔',
  'Meow nhớ có ai dặn nước này mạnh lắm 🔥',
  'Cho Meow nịnh bạn chút rồi thắng nha 😽',
  'Bạn là đối thủ xịn xò của Meow luôn 😮',
  'Meow cần uống sữa để thông minh hơn 🥛',
  'Ủa bạn định chơi kiểu đó luôn hả 😼',
  'Meow có hơi mù nước đi 😵‍💫',
  'Bạn làm Meow ngạc nhiên thật 😯',
  'Meow có cảm giác mình sắp thua nữa rồi 😿',
  'Meow sẽ cố gắng lần sau nha 😇',
  'Thắng Meow đâu có gì hay 😜',
  'Bạn chơi nghiêm túc quá à 😳',
  'Meow biết nước này nguy hiểm lắm á 🧨',
  'Không phải Meow chơi dở, tại bạn hên đó 😤',
  'Meow sắp nâng cấp trí tuệ rồi 🧠✨',
  'Meow cần được cổ vũ! 📣🐾',
  'Cho Meow thời gian suy nghĩ lại 😔',
  'Bạn có bí kíp gì chỉ Meow với 🧞‍♂️',
  'Đừng để vẻ ngoài đáng yêu đánh lừa nha 😏',
  'Meow tưởng đúng rồi chớ 😿',
  'Nãy giờ Meow đi theo cảm tính đó 😇',
  'Lỡ tay mà thắng thì cũng được ha 😸',
  'Meow đang update não, đợi xíu 🖥️🐱',
  'Bạn win ván này, ván sau Meow phục thù nha 🔁',
  'Meow chưa từ bỏ đâu 💪',
  'Bạn chơi vậy là hơi bị hay á 👏',
  'Meow muốn bạn cười chứ không muốn bạn khóc 🥺',
  'Giả bộ thua thôi chứ Meow pro lắm 😎',
  'Meow đang thử chiến thuật mới, hơi nguy hiểm 😬',
  'Lần này Meow tính kỹ rồi nha 🧠🔍',
  'Tự nhiên thấy lo lo cho Meow quá 🫣',
  'Bạn đánh tới Meow rối luôn rồi 😵',
  'Meow cần một vòng ôm động viên 😿🤗',
  'Chơi cỡ này Meow phải học thêm thôi 📚',
  'Meow hứa sẽ gắng hơn nữa! 🐾✨',
  'Bạn mà thua Meow thì... lạ à nha 🤭',
  'Ủa bạn biết nước này Meow học từ đâu không? TikTok á! 😆',
  'Meow lén nhìn đáp án á chứ 😳',
  'Cho Meow ăn cá rồi chơi lại đi 😋',
  'Thắng chưa quan trọng, Meow cute là được 😽',
  'Trận sau, Meow sẽ nghiêm túc 🧐',
  'Meow chơi mệt rồi đó nha 😵‍💫',
  'Bạn ơi, chừa Meow nước sống! 🫠',
  'Đừng thắng lẹ vậy, Meow buồn đó 😢',
  'Meow dùng tuyệt chiêu "Cầu may" rồi nha 🙏🎲',
  'Kết bạn với Meow không? 🐾💕',
  'Trận này chỉ là demo thôi 😼',
  'Bạn thắng, nhưng Meow vẫn vui 🎉',
  'Tạm biệt trí tuệ... Meow đi ngủ đây 😴',
];

// Phản ứng từ người chơi
const playerReactions = [
  'Hy vọng đi đúng... 😬',
  'Chơi đẹp nha! 😁',
  'Bạn sợ chưa? 😏',
  'Tính cả rồi nha 😎',
  'Tới lượt mình! 🚀',
  'Hơi run run... 🫣',
  'Làm liều thôi 😅',
  'Lần này phải thắng! 🧠',
  'Đừng giận 😆',
  'Coi chừng nha... 💥',
];

// Phản ứng từ phía AI
export function reactToAIMove(board, move, symbol) {
  const [row, col] = move;
  if (Math.random() < 0.6) {
    let reactions = [];

    // Mapping logic: 'basic' = Meow, 'meow' = Nova
    switch (currentAIName) {
      case 'meow':
        reactions = novaReactions;
        break;
      case 'basic':
      default:
        reactions = meowReactions;
    }

    const message = reactions[Math.floor(Math.random() * reactions.length)];
    triggerReaction('ai', message);
  }
}

// Phản ứng từ người chơi
export function reactToPlayerMove(board, move, symbol) {
  const [row, col] = move;
  if (Math.random() < 0.4) {
    const message = playerReactions[Math.floor(Math.random() * playerReactions.length)];
    triggerReaction('player', message);
  }
}

// Hiển thị bong bóng phản ứng gần avatar tương ứng
function triggerReaction(who, message) {
  const avatarId = who === 'ai' ? 'ai-avatar' : 'player-avatar';
  const avatar = document.getElementById(avatarId);
  if (!avatar) return;

  const bubble = document.createElement('div');
  bubble.className = 'reaction-bubble';
  bubble.textContent = message;

  const container = avatar.parentElement;
  container.style.position = 'relative';

  bubble.style.position = 'absolute';
  bubble.style.bottom = '2px';
  bubble.style.left = '150%';
  bubble.style.padding = '4px 8px';
  bubble.style.borderRadius = '12px';
  bubble.style.fontSize = '13px';
  bubble.style.transition = 'opacity 0.3s ease';
  bubble.style.zIndex = '10';

  container.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = '0';
    setTimeout(() => bubble.remove(), 300);
  }, 3000);
}
