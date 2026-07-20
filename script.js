// ============================================
// 🍽️ 今天吃什么？ — 推荐引擎
// ============================================

// ---------- 推荐数据 ----------
const RECIPES = {
  happy: {
    busy: {
      breakfast: {
        title: '🍓 草莓酸奶燕麦杯',
        desc: '5分钟搞定！即食燕麦打底，铺上酸奶和新鲜草莓，再来一勺蜂蜜，清爽又管饱。',
        tags: ['快手', '健康', '甜口'],
        emoji: '🥣',
      },
      lunch: {
        title: '🍛 咖喱鸡肉饭便当',
        desc: '昨天多做了一份咖喱？今天微波炉叮一下就是完美午餐。浓郁咖喱配上白米饭，满足感拉满。',
        tags: ['便当', '浓郁', '管饱'],
        emoji: '🍱',
      },
      dinner: {
        title: '🍜 番茄鸡蛋面',
        desc: '没有什么是一碗番茄鸡蛋面解决不了的。酸甜的番茄汤底，嫩滑的鸡蛋，简单却最治愈。',
        tags: ['快手', '暖胃', '经典'],
        emoji: '🍜',
      },
    },
    leisure: {
      breakfast: {
        title: '🥚 班尼迪克蛋配手冲咖啡',
        desc: '周末就该慢慢来！酥脆的英式松饼，水波蛋戳破的瞬间蛋黄流淌，配一杯手冲咖啡，完美早晨。',
        tags: ['仪式感', '精致', '慢生活'],
        emoji: '🍳',
      },
      lunch: {
        title: '🍣 寿司拼盘',
        desc: '约上朋友或一个人，来份寿司拼盘慢慢享受。三文鱼、金枪鱼、鳗鱼，每种两块刚刚好。',
        tags: ['日料', '新鲜', '分享'],
        emoji: '🍣',
      },
      dinner: {
        title: '🍷 法式红酒炖牛肉',
        desc: '慢炖一下午，满屋飘香。牛肉软烂入味，配一杯赤霞珠，今天的快乐加倍。',
        tags: ['西餐', '慢炖', '浪漫'],
        emoji: '🥩',
      },
    },
    'no-appetite': {
      breakfast: {
        title: '🥭 芒果思慕雪碗',
        desc: '清爽开胃！冻芒果+香蕉+椰奶打成泥，铺上格兰诺拉和蓝莓，酸甜清爽，看着就心情好。',
        tags: ['清爽', '果昔', '颜值高'],
        emoji: '🥤',
      },
      lunch: {
        title: '🥟 越南春卷配花生酱',
        desc: '透明的米纸裹着虾仁、米粉和生菜，蘸上浓郁花生酱，一口一个，清爽无负担。',
        tags: ['清爽', '东南亚', '低卡'],
        emoji: '🥟',
      },
      dinner: {
        title: '🐟 柠檬烤鱼配芦笋',
        desc: '鲈鱼用柠檬汁、黑胡椒和迷迭香腌制后烤制，搭配烤芦笋，清淡鲜美又开胃。',
        tags: ['清淡', '高蛋白', '地中海'],
        emoji: '🐟',
      },
    },
    starving: {
      breakfast: {
        title: '🥪 豪华三明治',
        desc: '两片厚切吐司夹着煎蛋、培根、芝士、生菜和番茄，一口咬下去所有料一起吃到，满足！',
        tags: ['管饱', '快手', '料足'],
        emoji: '🥪',
      },
      lunch: {
        title: '🍜 大碗牛肉拉面',
        desc: '手工拉面筋道有嚼劲，牛肉汤底浓郁醇厚，加两份肉、加个蛋，饿了就要吃得痛快！',
        tags: ['管饱', '汤面', '过瘾'],
        emoji: '🍜',
      },
      dinner: {
        title: '🥩 自助烤肉',
        desc: '今天不做选择，全都要！五花肉、牛舌、鸡翅、蘑菇，想吃什么烤什么，快乐就是如此简单。',
        tags: ['聚餐', '自助', '过瘾'],
        emoji: '🥩',
      },
    },
  },
  tired: {
    busy: {
      breakfast: {
        title: '☕ 挂耳咖啡+全麦吐司',
        desc: '15分钟搞定早晨。黑咖啡提神，吐司抹上花生酱，简单却有能量的开始。',
        tags: ['极简', '提神', '快手'],
        emoji: '☕',
      },
      lunch: {
        title: '🍛 日式咖喱速食包',
        desc: '揭开即食咖喱包，微波炉加热拌白饭。虽然不是现做，但疲惫时它就是救命的存在。',
        tags: ['速食', '省事', '暖胃'],
        emoji: '🍛',
      },
      dinner: {
        title: '🌶️ 酸辣汤面',
        desc: '酸酸辣辣一碗下肚，整个人都活过来了。挂面配上蛋花、木耳、豆腐丝，暖胃又快。',
        tags: ['暖胃', '开胃', '快手'],
        emoji: '🍜',
      },
    },
    leisure: {
      breakfast: {
        title: '🥞 松饼brunch',
        desc: '睡到自然醒，给自己做一份松饼早午餐。淋上蜂蜜，摆上水果，配一杯橙汁，周末就该这样。',
        tags: ['brunch', '甜蜜', '慢生活'],
        emoji: '🥞',
      },
      lunch: {
        title: '🍚 煲仔饭',
        desc: '米饭在砂锅里慢慢煲熟，腊肠的油脂渗入米饭，锅巴焦香酥脆。慢慢吃，不着急。',
        tags: ['广式', '锅巴', '慢食'],
        emoji: '🍚',
      },
      dinner: {
        title: '🥘 部队火锅',
        desc: '边煮边吃边发呆。泡面、年糕、午餐肉、芝士片在锅里咕嘟咕嘟，疲惫都被煮化了。',
        tags: ['韩式', '边煮边吃', '治愈'],
        emoji: '🥘',
      },
    },
    'no-appetite': {
      breakfast: {
        title: '🥣 白粥配酱菜',
        desc: '什么都不想嚼的时候，一碗热乎乎的白粥就是最好的安慰。配一点酱菜，养胃又舒服。',
        tags: ['养胃', '清淡', '暖心'],
        emoji: '🥣',
      },
      lunch: {
        title: '🥟 清汤馄饨',
        desc: '薄皮大馅的馄饨漂在清汤里，撒上葱花和虾皮，暖暖的一碗，疲惫也散了一半。',
        tags: ['汤水', '清淡', '暖胃'],
        emoji: '🥟',
      },
      dinner: {
        title: '🥚 蒸蛋羹+清炒时蔬',
        desc: '嫩滑的蒸蛋像布丁一样入口即化，搭一份蒜蓉空心菜。简单清淡，吃完没有负担。',
        tags: ['清淡', '易消化', '家常'],
        emoji: '🥚',
      },
    },
    starving: {
      breakfast: {
        title: '🥟 煎饼果子加蛋加肠',
        desc: '路边的煎饼果子摊永远是最香的。薄脆、鸡蛋、火腿肠、甜面酱，一卷下肚元气满满。',
        tags: ['街头', '管饱', '碳水'],
        emoji: '🥟',
      },
      lunch: {
        title: '🍖 红烧肉配米饭',
        desc: '肥瘦相间的五花肉炖得软烂，浓油赤酱拌进米饭里，碳水带来的幸福感无可替代。',
        tags: ['硬菜', '下饭', '治愈'],
        emoji: '🍖',
      },
      dinner: {
        title: '🔥 火锅',
        desc: '没有什么疲惫是一顿火锅解决不了的。毛肚、鸭血、肥牛、虾滑，涮进红油锅底，太爽了！',
        tags: ['火锅', '过瘾', '聚餐'],
        emoji: '🍲',
      },
    },
  },
  anxious: {
    busy: {
      breakfast: {
        title: '🍌 香蕉+黑咖啡',
        desc: '简单的组合。香蕉提供即时能量，黑咖啡帮你集中注意力，焦虑的时候别想太多，先吃饱。',
        tags: ['极简', '提神', '低负担'],
        emoji: '☕',
      },
      lunch: {
        title: '🥗 鸡肉沙拉',
        desc: '清爽的烤鸡胸肉沙拉，配油醋汁。不会给身体增加负担，吃完不会犯困，下午继续战斗。',
        tags: ['健康', '清爽', '高蛋白'],
        emoji: '🥗',
      },
      dinner: {
        title: '🍙 味噌汤配饭团',
        desc: '温暖清淡的味噌汤，配上简单的三角饭团。简单、安静、没有多余刺激的一餐。',
        tags: ['日式', '清淡', '暖心'],
        emoji: '🍙',
      },
    },
    leisure: {
      breakfast: {
        title: '🌸 花茶+可颂',
        desc: '慢慢泡一杯玫瑰花茶，黄油可颂在烤箱里重新变得酥脆。让节奏慢下来，深呼吸。',
        tags: ['慢生活', '花香', '放松'],
        emoji: '🥐',
      },
      lunch: {
        title: '🍱 日式定食',
        desc: '三文鱼、渍物、味噌汤、米饭，每样一小份。看着整齐的摆盘，心情也会平静下来。',
        tags: ['日式', '精致', '均衡'],
        emoji: '🍱',
      },
      dinner: {
        title: '🐟 清蒸鲈鱼配白灼菜心',
        desc: '清淡的蒸鱼，鲜嫩原味，配白灼菜心。少油少盐，吃完身体轻松，心里也踏实。',
        tags: ['清淡', '健康', '粤式'],
        emoji: '🐟',
      },
    },
    'no-appetite': {
      breakfast: {
        title: '🍋 蜂蜜柠檬水+苏打饼干',
        desc: '喝不下的时候，先来一杯温温的蜂蜜柠檬水。苏打饼干好消化，慢慢吃别着急。',
        tags: ['温和', '开胃', '轻食'],
        emoji: '🍋',
      },
      lunch: {
        title: '🥢 凉拌荞麦面',
        desc: '冰凉的荞麦面蘸着酱汁，清爽顺口。再加点黄瓜丝和海苔，简单却有滋味。',
        tags: ['凉爽', '清淡', '日式'],
        emoji: '🥢',
      },
      dinner: {
        title: '🍲 冬瓜排骨汤',
        desc: '慢炖一锅冬瓜排骨汤，汤色清亮。冬瓜吸满了肉汤的鲜味，喝一碗，整个人都舒坦了。',
        tags: ['汤品', '清淡', '暖胃'],
        emoji: '🍲',
      },
    },
    starving: {
      breakfast: {
        title: '🥟 鸡蛋灌饼+豆浆',
        desc: '街边早餐摊的经典组合。灌饼酥脆，豆浆浓郁，吃饱了才有力气面对今天。',
        tags: ['街头', '经典', '管饱'],
        emoji: '🥟',
      },
      lunch: {
        title: '🌶️ 麻辣香锅',
        desc: '辣到忘记烦恼！自己选菜，各种食材在辣椒和花椒里翻滚，吃到大汗淋漓，心情就放晴了。',
        tags: ['麻辣', '过瘾', '发泄'],
        emoji: '🌶️',
      },
      dinner: {
        title: '🍕 披萨',
        desc: '罪恶但快乐。芝士拉丝、饼底酥脆，想放什么topping就放什么。今晚不做大人，做快乐的吃货。',
        tags: ['西餐', '罪恶', '快乐'],
        emoji: '🍕',
      },
    },
  },
  calm: {
    busy: {
      breakfast: {
        title: '🥣 隔夜燕麦',
        desc: '昨晚就准备好了，打开冰箱就能吃。燕麦+奇亚籽+牛奶+水果，营养均衡又省时。',
        tags: ['备餐', '健康', '快手'],
        emoji: '🥣',
      },
      lunch: {
        title: '🥪 鸡胸肉三明治+沙拉',
        desc: '全麦面包夹鸡胸肉、生菜、番茄，配一份小沙拉。清爽有营养，下午工作精神好。',
        tags: ['健康', '清淡', '均衡'],
        emoji: '🥪',
      },
      dinner: {
        title: '🍜 乌冬面',
        desc: '胖嘟嘟的乌冬面在清汤里滑溜溜的，加个溏心蛋和一把葱花。简单温润，刚刚好。',
        tags: ['日式', '清淡', '暖心'],
        emoji: '🍜',
      },
    },
    leisure: {
      breakfast: {
        title: '🍚 日式早餐定番',
        desc: '烤三文鱼、味噌汤、白米饭、纳豆、渍物。丰盛而克制，每样都不多，但很满足。',
        tags: ['日式', '仪式感', '精致'],
        emoji: '🍚',
      },
      lunch: {
        title: '🥗 素食能量碗',
        desc: '藜麦打底，铺上烤南瓜、牛油果、鹰嘴豆、羽衣甘蓝，淋上柠檬塔希尼酱。色彩丰富，心情愉悦。',
        tags: ['素食', '健康', '色彩'],
        emoji: '🥗',
      },
      dinner: {
        title: '🥟 自己包饺子',
        desc: '和面、调馅、擀皮、包饺子。过程比吃更治愈，一家人或一个人都可以。韭菜鸡蛋虾仁馅。',
        tags: ['手工', '治愈', '家庭'],
        emoji: '🥟',
      },
    },
    'no-appetite': {
      breakfast: {
        title: '🍎 水果拼盘+酸奶',
        desc: '各种颜色的水果切好摆在盘子里，配一小杯希腊酸奶。看着就舒服，吃着也没负担。',
        tags: ['清爽', '健康', '颜值'],
        emoji: '🍎',
      },
      lunch: {
        title: '🥶 冷面',
        desc: '冰冰凉凉的荞麦冷面，泡菜、黄瓜丝、鸡蛋、雪梨片，酸甜的汤底喝一口就开胃了。',
        tags: ['韩式', '凉爽', '酸甜'],
        emoji: '🍜',
      },
      dinner: {
        title: '🥬 蔬菜粥',
        desc: '大米慢熬到开花，加入切碎的青菜和香菇，滴几滴香油。温和养胃，吃了好入睡。',
        tags: ['养胃', '清淡', '助眠'],
        emoji: '🥬',
      },
    },
    starving: {
      breakfast: {
        title: '🍞 法式吐司',
        desc: '吐司浸泡在蛋奶液里，煎到金黄酥脆，淋上枫糖浆，摆上香蕉和蓝莓。甜蜜的早晨。',
        tags: ['甜蜜', 'brunch', '西式'],
        emoji: '🍞',
      },
      lunch: {
        title: '🍚 黯然销魂饭',
        desc: '港式茶餐厅的灵魂——叉烧配煎蛋，淋上酱汁拌饭。半熟蛋液裹着米饭和叉烧，绝了。',
        tags: ['港式', '经典', '下饭'],
        emoji: '🍚',
      },
      dinner: {
        title: '🍲 寿喜烧',
        desc: '薄切牛肉在甜酱油汤底里涮几秒，蘸上生蛋液。配豆腐、茼蒿、魔芋丝，慢慢涮，慢慢吃。',
        tags: ['日式', '涮锅', '精致'],
        emoji: '🍲',
      },
    },
  },
};

// ---------- 标签对应emoji ----------
const TAG_EMOJIS = {
  '快手': '⚡', '管饱': '💪', '健康': '🥦', '清淡': '🌿', '暖胃': '♨️',
  '治愈': '💝', '过瘾': '🔥', '精致': '✨', '经典': '⭐', '日式': '🗾',
  '韩式': '🇰🇷', '西餐': '🍷', '中式': '🇨🇳', '清爽': '💧', '甜蜜': '🍯',
  '养胃': '🫖', '提神': '☕', '硬菜': '🥩', '素食': '🥬', '火锅': '🫕',
  '慢生活': '🌅', '仪式感': '🎀', '家常': '🏠', '街头': '🏮',
};

// ---------- 状态 ----------
let selectedMood = null;
let selectedState = null;
let selectedMeal = null;

// ---------- DOM 引用 ----------
const moodBtns = document.querySelectorAll('#mood-options .opt-btn');
const stateBtns = document.querySelectorAll('#state-options .opt-btn');
const mealBtns = document.querySelectorAll('#meal-options .opt-btn');
const recommendBtn = document.getElementById('recommend-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.getElementById('btn-spinner');
const resultEl = document.getElementById('result');
const resultEmoji = document.getElementById('result-emoji');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const resultTags = document.getElementById('result-tags');
const reshuffleBtn = document.getElementById('reshuffle-btn');
const randomBtn = document.getElementById('random-btn');

// ---------- 工具函数 ----------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomMeal() {
  const moods = Object.keys(RECIPES);
  const states = Object.keys(RECIPES.happy);
  const meals = ['breakfast', 'lunch', 'dinner'];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const meal = meals[Math.floor(Math.random() * meals.length)];
  return RECIPES[mood][state][meal];
}

// ---------- 推荐逻辑 ----------
function getRecommendation(mood, state, meal) {
  const data = RECIPES[mood]?.[state]?.[meal];
  return data || null;
}

function displayResult(data) {
  resultEmoji.textContent = data.emoji;
  resultTitle.textContent = data.title;
  resultDesc.textContent = data.desc;

  // Tags
  resultTags.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    const emoji = TAG_EMOJIS[tag] || '🏷️';
    span.textContent = `${emoji} ${tag}`;
    resultTags.appendChild(span);
  });

  resultEl.classList.remove('hidden');
  resultEl.style.animation = 'none';
  requestAnimationFrame(() => {
    resultEl.style.animation = 'fadeInUp 0.5s ease';
  });

  spawnConfetti();
}

function recommend() {
  const data = getRecommendation(selectedMood, selectedState, selectedMeal);
  if (data) {
    displayResult(data);
  }
}

function reshuffle() {
  if (selectedMood && selectedState && selectedMeal) {
    recommend();
  }
}

// ---------- 彩屑效果 ----------
function spawnConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#ff7b5a', '#ff5f6d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b9d'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.width = (Math.random() * 6 + 4) + 'px';
    piece.style.height = (Math.random() * 6 + 4) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 3000);
}

// ---------- 按钮状态更新 ----------
function updateButtonState() {
  if (selectedMood && selectedState && selectedMeal) {
    recommendBtn.disabled = false;
    btnText.textContent = '✨ 今天吃什么？';
  } else {
    recommendBtn.disabled = true;
    const parts = [];
    if (!selectedMood) parts.push('心情');
    if (!selectedState) parts.push('状态');
    if (!selectedMeal) parts.push('餐别');
    btnText.textContent = `👆 请选择${parts.join('、')}`;
  }
}

// ---------- 选择处理 ----------
function handleSelect(btns, value, type) {
  btns.forEach(b => b.classList.remove('selected'));
  const btn = [...btns].find(b => b.dataset.value === value);
  if (btn) btn.classList.add('selected');

  if (type === 'mood') selectedMood = value;
  if (type === 'state') selectedState = value;
  if (type === 'meal') selectedMeal = value;

  updateButtonState();
}

// ---------- 事件绑定 ----------
moodBtns.forEach(btn => {
  btn.addEventListener('click', () => handleSelect(moodBtns, btn.dataset.value, 'mood'));
});

stateBtns.forEach(btn => {
  btn.addEventListener('click', () => handleSelect(stateBtns, btn.dataset.value, 'state'));
});

mealBtns.forEach(btn => {
  btn.addEventListener('click', () => handleSelect(mealBtns, btn.dataset.value, 'meal'));
});

recommendBtn.addEventListener('click', recommend);

reshuffleBtn.addEventListener('click', reshuffle);

randomBtn.addEventListener('click', () => {
  const data = getRandomMeal();
  displayResult(data);

  // 清除所有选择
  [...moodBtns, ...stateBtns, ...mealBtns].forEach(b => b.classList.remove('selected'));
  selectedMood = null;
  selectedState = null;
  selectedMeal = null;
  updateButtonState();
});

// ---------- 键盘支持 ----------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !recommendBtn.disabled) {
    recommend();
  }
});
