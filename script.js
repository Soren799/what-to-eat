// ========== 数据 ==========
const MOODS = ['happy','tired','anxious','calm'];
const STATES = ['busy','leisure','no-appetite','starving'];
const MEALS = ['breakfast','lunch','dinner'];

const RECIPES = {
  happy: {
    busy: {
      breakfast: { title:'🍓 草莓酸奶燕麦杯', desc:'即食燕麦打底，铺上酸奶和新鲜草莓，再来一勺蜂蜜，清爽又管饱。', emoji:'🥣', tags:['快手','健康','甜口'] },
      lunch:     { title:'🍛 咖喱鸡肉饭便当', desc:'微波炉叮一下就是完美午餐。浓郁咖喱配上白米饭，满足感拉满。', emoji:'🍱', tags:['便当','浓郁','管饱'] },
      dinner:    { title:'🍜 番茄鸡蛋面', desc:'酸甜的番茄汤底，嫩滑的鸡蛋，简单却最治愈。', emoji:'🍜', tags:['快手','暖胃','经典'] },
    }, leisure: {
      breakfast: { title:'🥚 班尼迪克蛋配手冲咖啡', desc:'酥脆英式松饼，水波蛋蛋黄流淌，配一杯手冲咖啡。', emoji:'🍳', tags:['仪式感','精致','慢生活'] },
      lunch:     { title:'🍣 寿司拼盘', desc:'三文鱼、金枪鱼、鳗鱼，每种两块刚刚好。', emoji:'🍣', tags:['日料','新鲜','分享'] },
      dinner:    { title:'🍷 法式红酒炖牛肉', desc:'慢炖一下午，牛肉软烂入味，配一杯赤霞珠。', emoji:'🥩', tags:['西餐','慢炖','浪漫'] },
    }, 'no-appetite': {
      breakfast: { title:'🥭 芒果思慕雪碗', desc:'冻芒果+香蕉+椰奶打成泥，铺上格兰诺拉和蓝莓。', emoji:'🥤', tags:['清爽','果昔','颜值高'] },
      lunch:     { title:'🥟 越南春卷配花生酱', desc:'米纸裹着虾仁、米粉和生菜，蘸花生酱。', emoji:'🥟', tags:['清爽','东南亚','低卡'] },
      dinner:    { title:'🐟 柠檬烤鱼配芦笋', desc:'鲈鱼用柠檬汁黑胡椒烤制，搭配芦笋。', emoji:'🐟', tags:['清淡','高蛋白','地中海'] },
    }, starving: {
      breakfast: { title:'🥪 豪华三明治', desc:'厚切吐司夹煎蛋、培根、芝士、生菜和番茄。', emoji:'🥪', tags:['管饱','快手','料足'] },
      lunch:     { title:'🍜 大碗牛肉拉面', desc:'手工拉面筋道，牛肉汤底浓郁醇厚，加两份肉！', emoji:'🍜', tags:['管饱','汤面','过瘾'] },
      dinner:    { title:'🥩 自助烤肉', desc:'五花肉、牛舌、鸡翅，想吃什么烤什么。', emoji:'🥩', tags:['聚餐','自助','过瘾'] },
    },
  }, tired: {
    busy: {
      breakfast: { title:'☕ 挂耳咖啡+全麦吐司', desc:'黑咖啡提神，吐司抹花生酱，简单有能量。', emoji:'☕', tags:['极简','提神','快手'] },
      lunch:     { title:'🍛 日式咖喱速食包', desc:'微波炉加热拌白饭，疲惫时的救命存在。', emoji:'🍛', tags:['速食','省事','暖胃'] },
      dinner:    { title:'🌶️ 酸辣汤面', desc:'酸酸辣辣一碗下肚，整个人都活过来了。', emoji:'🍜', tags:['暖胃','开胃','快手'] },
    }, leisure: {
      breakfast: { title:'🥞 松饼brunch', desc:'睡到自然醒，松饼淋蜂蜜摆水果，配橙汁。', emoji:'🥞', tags:['brunch','甜蜜','慢生活'] },
      lunch:     { title:'🍚 煲仔饭', desc:'腊肠油脂渗入米饭，锅巴焦香酥脆。', emoji:'🍚', tags:['广式','锅巴','慢食'] },
      dinner:    { title:'🥘 部队火锅', desc:'泡面、年糕、午餐肉、芝士咕嘟咕嘟。', emoji:'🥘', tags:['韩式','边煮边吃','治愈'] },
    }, 'no-appetite': {
      breakfast: { title:'🥣 白粥配酱菜', desc:'一碗热乎乎的白粥就是最好的安慰。', emoji:'🥣', tags:['养胃','清淡','暖心'] },
      lunch:     { title:'🥟 清汤馄饨', desc:'薄皮大馅漂在清汤里，撒葱花和虾皮。', emoji:'🥟', tags:['汤水','清淡','暖胃'] },
      dinner:    { title:'🥚 蒸蛋羹+清炒时蔬', desc:'蒸蛋入口即化，搭蒜蓉空心菜。', emoji:'🥚', tags:['清淡','易消化','家常'] },
    }, starving: {
      breakfast: { title:'🥟 煎饼果子加蛋加肠', desc:'薄脆鸡蛋火腿肠甜面酱，一卷下肚。', emoji:'🥟', tags:['街头','管饱','碳水'] },
      lunch:     { title:'🍖 红烧肉配米饭', desc:'五花肉炖得软烂，浓油赤酱拌米饭。', emoji:'🍖', tags:['硬菜','下饭','治愈'] },
      dinner:    { title:'🔥 火锅', desc:'毛肚鸭血肥牛虾滑，涮进红油锅底！', emoji:'🍲', tags:['火锅','过瘾','聚餐'] },
    },
  }, anxious: {
    busy: {
      breakfast: { title:'🍌 香蕉+黑咖啡', desc:'香蕉即时能量，黑咖啡集中注意力。', emoji:'☕', tags:['极简','提神','低负担'] },
      lunch:     { title:'🥗 鸡肉沙拉', desc:'烤鸡胸肉沙拉配油醋汁，不会犯困。', emoji:'🥗', tags:['健康','清爽','高蛋白'] },
      dinner:    { title:'🍙 味噌汤配饭团', desc:'温暖清淡的味噌汤配三角饭团。', emoji:'🍙', tags:['日式','清淡','暖心'] },
    }, leisure: {
      breakfast: { title:'🌸 花茶+可颂', desc:'泡一杯玫瑰花茶，可颂烤到酥脆。', emoji:'🥐', tags:['慢生活','花香','放松'] },
      lunch:     { title:'🍱 日式定食', desc:'三文鱼、渍物、味噌汤、米饭各一小份。', emoji:'🍱', tags:['日式','精致','均衡'] },
      dinner:    { title:'🐟 清蒸鲈鱼配白灼菜心', desc:'蒸鱼鲜嫩原味，配白灼菜心，少油少盐。', emoji:'🐟', tags:['清淡','健康','粤式'] },
    }, 'no-appetite': {
      breakfast: { title:'🍋 蜂蜜柠檬水+苏打饼干', desc:'温温的柠檬水，苏打饼干好消化。', emoji:'🍋', tags:['温和','开胃','轻食'] },
      lunch:     { title:'🥢 凉拌荞麦面', desc:'冰凉的荞麦面蘸酱汁，加黄瓜丝海苔。', emoji:'🥢', tags:['凉爽','清淡','日式'] },
      dinner:    { title:'🍲 冬瓜排骨汤', desc:'冬瓜吸满肉汤鲜味，喝一碗舒坦了。', emoji:'🍲', tags:['汤品','清淡','暖胃'] },
    }, starving: {
      breakfast: { title:'🥟 鸡蛋灌饼+豆浆', desc:'灌饼酥脆豆浆浓郁，经典早餐。', emoji:'🥟', tags:['街头','经典','管饱'] },
      lunch:     { title:'🌶️ 麻辣香锅', desc:'各种食材在辣椒花椒里翻滚。', emoji:'🌶️', tags:['麻辣','过瘾','发泄'] },
      dinner:    { title:'🍕 披萨', desc:'芝士拉丝饼底酥脆，今晚不做大人。', emoji:'🍕', tags:['西餐','罪恶','快乐'] },
    },
  }, calm: {
    busy: {
      breakfast: { title:'🥣 隔夜燕麦', desc:'昨晚准备好，打开冰箱就能吃。', emoji:'🥣', tags:['备餐','健康','快手'] },
      lunch:     { title:'🥪 鸡胸肉三明治+沙拉', desc:'全麦面包夹鸡胸肉生菜番茄配沙拉。', emoji:'🥪', tags:['健康','清淡','均衡'] },
      dinner:    { title:'🍜 乌冬面', desc:'胖嘟嘟乌冬面在清汤里，加溏心蛋葱花。', emoji:'🍜', tags:['日式','清淡','暖心'] },
    }, leisure: {
      breakfast: { title:'🍚 日式早餐定番', desc:'烤三文鱼、味噌汤、米饭、纳豆、渍物。', emoji:'🍚', tags:['日式','仪式感','精致'] },
      lunch:     { title:'🥗 素食能量碗', desc:'藜麦烤南瓜牛油果鹰嘴豆，色彩丰富。', emoji:'🥗', tags:['素食','健康','色彩'] },
      dinner:    { title:'🥟 自己包饺子', desc:'和面调馅擀皮，韭菜鸡蛋虾仁馅。', emoji:'🥟', tags:['手工','治愈','家庭'] },
    }, 'no-appetite': {
      breakfast: { title:'🍎 水果拼盘+酸奶', desc:'各种水果摆盘，配希腊酸奶。', emoji:'🍎', tags:['清爽','健康','颜值'] },
      lunch:     { title:'🥶 冷面', desc:'荞麦冷面配泡菜黄瓜丝鸡蛋雪梨片。', emoji:'🍜', tags:['韩式','凉爽','酸甜'] },
      dinner:    { title:'🥬 蔬菜粥', desc:'大米慢熬到开花加青菜香菇，滴香油。', emoji:'🥬', tags:['养胃','清淡','助眠'] },
    }, starving: {
      breakfast: { title:'🍞 法式吐司', desc:'吐司浸泡蛋奶液煎到金黄，淋枫糖浆。', emoji:'🍞', tags:['甜蜜','brunch','西式'] },
      lunch:     { title:'🍚 黯然销魂饭', desc:'叉烧配煎蛋淋酱汁拌饭，绝了。', emoji:'🍚', tags:['港式','经典','下饭'] },
      dinner:    { title:'🍲 寿喜烧', desc:'薄切牛肉蘸生蛋液，配豆腐茼蒿。', emoji:'🍲', tags:['日式','涮锅','精致'] },
    },
  },
};

// ========== UI ==========
const moodBtns = document.getElementById('mood-options');
const stateBtns = document.getElementById('state-options');
const mealBtns = document.getElementById('meal-options');
const recommendBtn = document.getElementById('recommend-btn');
const btnText = document.getElementById('btn-text');
const resultEl = document.getElementById('result');
const reshuffleBtn = document.getElementById('reshuffle-btn');
const randomBtn = document.getElementById('random-btn');

let selMood = null, selState = null, selMeal = null;

function renderOpts(container, items, names, onClick) {
  items.forEach((v, i) => {
    const b = document.createElement('button');
    b.className = 'opt-btn'; b.dataset.value = v; b.textContent = names[i];
    b.onclick = () => onClick(v, b);
    container.appendChild(b);
  });
}
renderOpts(moodBtns, MOODS, ['😊 开心','😴 疲惫','😰 焦虑','🧘 平静'], (v,b)=>{ selMood=v; toggle(moodBtns,b); update(); });
renderOpts(stateBtns, STATES, ['⏰ 赶时间','🌿 悠闲','😑 没胃口','🤤 饿极了'], (v,b)=>{ selState=v; toggle(stateBtns,b); update(); });
renderOpts(mealBtns, MEALS, ['🌅 早餐','☀️ 午餐','🌙 晚餐'], (v,b)=>{ selMeal=v; toggle(mealBtns,b); update(); });

function toggle(container, btn) {
  container.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function update() {
  if (selMood && selState && selMeal) {
    recommendBtn.disabled = false;
    btnText.textContent = '✨ 今天吃什么？';
  } else {
    recommendBtn.disabled = true;
    const p = [];
    if (!selMood) p.push('心情');
    if (!selState) p.push('状态');
    if (!selMeal) p.push('餐别');
    btnText.textContent = '👆 请选择' + p.join('、');
  }
}

function showResult(dish) {
  document.getElementById('result-emoji').textContent = dish.emoji;
  document.getElementById('result-title').textContent = dish.title;
  document.getElementById('result-desc').textContent = dish.desc;
  const tags = document.getElementById('result-tags');
  tags.innerHTML = '';
  dish.tags.forEach(t => {
    const s = document.createElement('span'); s.textContent = t; tags.appendChild(s);
  });
  resultEl.classList.remove('hidden');
  resultEl.style.animation = 'none';
  requestAnimationFrame(() => resultEl.style.animation = 'fadeInUp 0.5s ease');
  spawnConfetti();
}

recommendBtn.onclick = () => {
  const dish = RECIPES[selMood][selState][selMeal];
  if (dish) showResult(dish);
};
reshuffleBtn.onclick = () => {
  if (selMood && selState && selMeal) {
    const dish = RECIPES[selMood][selState][selMeal];
    if (dish) showResult(dish);
  }
};
randomBtn.onclick = () => {
  const m = MOODS[Math.floor(Math.random()*4)];
  const s = STATES[Math.floor(Math.random()*4)];
  const me = MEALS[Math.floor(Math.random()*3)];
  showResult(RECIPES[m][s][me]);
};

function spawnConfetti() {
  const c = document.createElement('div'); c.className = 'confetti-container';
  document.body.appendChild(c);
  const colors = ['#ff7b5a','#ff5f6d','#ffd93d','#6bcb77','#4d96ff'];
  for (let i=0;i<30;i++) {
    const p = document.createElement('div'); p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;width:${4+Math.random()*6}px;height:${4+Math.random()*6}px;background:${colors[Math.floor(Math.random()*5)]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
    c.appendChild(p);
  }
  setTimeout(() => c.remove(), 3000);
}
