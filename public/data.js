// ============================================
// 🍽️ 推荐数据 — v2 (带 attrs + category)
// ============================================

const MOODS = [
  { value: 'happy',   label: '😊 开心' },
  { value: 'tired',   label: '😴 疲惫' },
  { value: 'anxious', label: '😰 焦虑' },
  { value: 'calm',    label: '🧘 平静' },
  { value: 'excited', label: '🔥 兴奋',    mapTo: 'happy' },
  { value: 'sad',     label: '😢 难过',    mapTo: 'tired' },
  { value: 'stressed',label: '🤯 压力大',  mapTo: 'anxious' },
];
const STATES = [
  { value: 'busy',         label: '⏰ 赶时间' },
  { value: 'leisure',      label: '🌿 悠闲' },
  { value: 'no-appetite',  label: '😑 没胃口' },
  { value: 'starving',     label: '🤤 饿极了' },
  { value: 'workout',      label: '💪 健身完',  mapTo: 'starving' },
  { value: 'lazy',         label: '🛋️ 摆烂',   mapTo: 'leisure' },
  { value: 'sick',         label: '🤒 不舒服',  mapTo: 'no-appetite' },
  { value: 'celebrate',    label: '🎉 想庆祝',  mapTo: 'leisure' },
];
const MEALS = [
  { value: 'breakfast', label: '🌅 早餐' },
  { value: 'lunch',     label: '☀️ 午餐' },
  { value: 'dinner',    label: '🌙 晚餐' },
];

const CATEGORIES = [
  '日式料理', '韩式料理', '西餐', '中式面食', '中式米饭',
  '火锅', '麻辣', '清淡汤品', '甜食烘焙', '烧烤', '东南亚', '家常菜'
];

const RECIPES = {
  happy: {
    busy: {
      breakfast: { title:'🍓 草莓酸奶燕麦杯', desc:'即食燕麦打底，铺上酸奶和新鲜草莓，再来一勺蜂蜜，清爽又管饱。', emoji:'🥣', tags:['快手','健康','甜口'], category:'甜食烘焙', attrs:['味:甜蜜','烹:生食','热:中','适:快手','适:清爽'], calories:'约 280 千卡' },
      lunch:     { title:'🍛 咖喱鸡肉饭便当', desc:'昨天多做了一份咖喱？微波炉叮一下就是完美午餐。浓郁咖喱配上白米饭，满足感拉满。', emoji:'🍱', tags:['便当','浓郁','管饱'], category:'中式米饭', attrs:['味:浓郁','烹:煮','热:高','适:管饱','系:中式'], calories:'约 650 千卡' },
      dinner:    { title:'🍜 番茄鸡蛋面', desc:'酸甜的番茄汤底，嫩滑的鸡蛋，简单却最治愈。', emoji:'🍜', tags:['快手','暖胃','经典'], category:'中式面食', attrs:['味:酸甜','烹:煮','热:中','适:暖胃','适:快手'], calories:'约 400 千卡' },
    },
    leisure: {
      breakfast: { title:'🥚 班尼迪克蛋配手冲咖啡', desc:'酥脆的英式松饼，水波蛋戳破的瞬间蛋黄流淌，配一杯手冲咖啡。', emoji:'🍳', tags:['仪式感','精致','慢生活'], category:'西餐', attrs:['味:清淡','烹:煮','热:中','系:西餐','适:慢生活'], calories:'约 450 千卡' },
      lunch:     { title:'🍣 寿司拼盘', desc:'三文鱼、金枪鱼、鳗鱼，每种两块刚刚好，慢慢享受。', emoji:'🍣', tags:['日料','新鲜','分享'], category:'日式料理', attrs:['味:清淡','烹:生食','热:低','系:日式','适:清爽'], calories:'约 500 千卡' },
      dinner:    { title:'🍷 法式红酒炖牛肉', desc:'慢炖一下午，满屋飘香。牛肉软烂入味，配一杯赤霞珠。', emoji:'🥩', tags:['西餐','慢炖','浪漫'], category:'西餐', attrs:['味:浓郁','烹:炖','热:高','系:西餐','适:慢生活'], calories:'约 650 千卡' },
    },
    'no-appetite': {
      breakfast: { title:'🥭 芒果思慕雪碗', desc:'冻芒果+香蕉+椰奶打成泥，铺上格兰诺拉和蓝莓，酸甜清爽。', emoji:'🥤', tags:['清爽','果昔','颜值高'], category:'甜食烘焙', attrs:['味:甜蜜','烹:生食','热:低','适:清爽','适:快手'], calories:'约 320 千卡' },
      lunch:     { title:'🥟 越南春卷配花生酱', desc:'透明的米纸裹着虾仁、米粉和生菜，蘸上浓郁花生酱。', emoji:'🥟', tags:['清爽','东南亚','低卡'], category:'东南亚', attrs:['味:清淡','烹:生食','热:低','系:东南亚','适:清爽'], calories:'约 350 千卡' },
      dinner:    { title:'🐟 柠檬烤鱼配芦笋', desc:'鲈鱼用柠檬汁、黑胡椒和迷迭香腌制后烤制，搭配烤芦笋。', emoji:'🐟', tags:['清淡','高蛋白','地中海'], category:'清淡汤品', attrs:['味:清淡','烹:烤','热:低','适:清淡','适:养胃'], calories:'约 350 千卡' },
    },
    starving: {
      breakfast: { title:'🥪 豪华三明治', desc:'厚切吐司夹着煎蛋、培根、芝士、生菜和番茄，一口下去全都有。', emoji:'🥪', tags:['管饱','快手','料足'], category:'西餐', attrs:['味:清淡','烹:炒','热:高','适:管饱','适:快手'], calories:'约 550 千卡' },
      lunch:     { title:'🍜 大碗牛肉拉面', desc:'手工拉面筋道有嚼劲，牛肉汤底浓郁醇厚，加两份肉！', emoji:'🍜', tags:['管饱','汤面','过瘾'], category:'中式面食', attrs:['味:浓郁','烹:煮','热:高','适:管饱','系:中式'], calories:'约 600 千卡' },
      dinner:    { title:'🥩 自助烤肉', desc:'五花肉、牛舌、鸡翅、蘑菇，想吃什么烤什么，快乐如此简单。', emoji:'🥩', tags:['聚餐','自助','过瘾'], category:'烧烤', attrs:['味:浓郁','烹:烤','热:高','系:韩式','适:聚餐'], calories:'约 750 千卡' },
    },
  },
  tired: {
    busy: {
      breakfast: { title:'☕ 挂耳咖啡+全麦吐司', desc:'黑咖啡提神，吐司抹上花生酱，简单却有能量的开始。', emoji:'☕', tags:['极简','提神','快手'], category:'家常菜', attrs:['味:清淡','烹:烤','热:中','适:快手','适:提神'], calories:'约 220 千卡' },
      lunch:     { title:'🍛 日式咖喱速食包', desc:'揭开即食咖喱包，微波炉加热拌白饭。疲惫时它就是救命的存在。', emoji:'🍛', tags:['速食','省事','暖胃'], category:'日式料理', attrs:['味:浓郁','烹:煮','热:高','适:快手','系:日式'], calories:'约 550 千卡' },
      dinner:    { title:'🌶️ 酸辣汤面', desc:'酸酸辣辣一碗下肚，整个人都活过来了。挂面配上蛋花、木耳、豆腐丝。', emoji:'🍜', tags:['暖胃','开胃','快手'], category:'中式面食', attrs:['味:麻辣','烹:煮','热:中','适:暖胃','适:开胃'], calories:'约 380 千卡' },
    },
    leisure: {
      breakfast: { title:'🥞 松饼brunch', desc:'睡到自然醒，给自己做一份松饼早午餐，淋上蜂蜜，摆上水果。', emoji:'🥞', tags:['brunch','甜蜜','慢生活'], category:'甜食烘焙', attrs:['味:甜蜜','烹:烤','热:中','适:慢生活','系:西餐'], calories:'约 480 千卡' },
      lunch:     { title:'🍚 煲仔饭', desc:'米饭在砂锅里慢慢煲熟，腊肠油脂渗入米饭，锅巴焦香酥脆。', emoji:'🍚', tags:['广式','锅巴','慢食'], category:'中式米饭', attrs:['味:浓郁','烹:煮','热:高','适:慢生活','系:中式'], calories:'约 700 千卡' },
      dinner:    { title:'🥘 部队火锅', desc:'泡面、年糕、午餐肉、芝士片在锅里咕嘟咕嘟，疲惫都被煮化了。', emoji:'🥘', tags:['韩式','边煮边吃','治愈'], category:'韩式料理', attrs:['味:浓郁','烹:煮','热:高','系:韩式','适:治愈'], calories:'约 650 千卡' },
    },
    'no-appetite': {
      breakfast: { title:'🥣 白粥配酱菜', desc:'什么都不想嚼的时候，一碗热乎乎的白粥就是最好的安慰。', emoji:'🥣', tags:['养胃','清淡','暖心'], category:'清淡汤品', attrs:['味:清淡','烹:煮','热:低','适:养胃','适:清淡'], calories:'约 150 千卡' },
      lunch:     { title:'🥟 清汤馄饨', desc:'薄皮大馅的馄饨漂在清汤里，撒上葱花和虾皮，暖暖的一碗。', emoji:'🥟', tags:['汤水','清淡','暖胃'], category:'中式面食', attrs:['味:清淡','烹:煮','热:低','适:暖胃','适:养胃'], calories:'约 300 千卡' },
      dinner:    { title:'🥚 蒸蛋羹+清炒时蔬', desc:'嫩滑的蒸蛋像布丁一样入口即化，搭一份蒜蓉空心菜。', emoji:'🥚', tags:['清淡','易消化','家常'], category:'家常菜', attrs:['味:清淡','烹:蒸','热:低','适:养胃','适:清淡'], calories:'约 200 千卡' },
    },
    starving: {
      breakfast: { title:'🥟 煎饼果子加蛋加肠', desc:'薄脆、鸡蛋、火腿肠、甜面酱，一卷下肚元气满满。', emoji:'🥟', tags:['街头','管饱','碳水'], category:'家常菜', attrs:['味:浓郁','烹:炒','热:高','适:管饱','适:快手'], calories:'约 450 千卡' },
      lunch:     { title:'🍖 红烧肉配米饭', desc:'肥瘦相间的五花肉炖得软烂，浓油赤酱拌进米饭里。', emoji:'🍖', tags:['硬菜','下饭','治愈'], category:'中式米饭', attrs:['味:浓郁','烹:炖','热:高','适:管饱','系:中式'], calories:'约 750 千卡' },
      dinner:    { title:'🔥 火锅', desc:'毛肚、鸭血、肥牛、虾滑，涮进红油锅底，太爽了！', emoji:'🍲', tags:['火锅','过瘾','聚餐'], category:'火锅', attrs:['味:麻辣','烹:煮','热:高','系:中式','适:聚餐'], calories:'约 700 千卡' },
    },
  },
  anxious: {
    busy: {
      breakfast: { title:'🍌 香蕉+黑咖啡', desc:'香蕉提供即时能量，黑咖啡帮你集中注意力。', emoji:'☕', tags:['极简','提神','低负担'], category:'家常菜', attrs:['味:清淡','烹:生食','热:低','适:快手','适:提神'], calories:'约 180 千卡' },
      lunch:     { title:'🥗 鸡肉沙拉', desc:'清爽的烤鸡胸肉沙拉配油醋汁，吃完不会犯困，下午继续战斗。', emoji:'🥗', tags:['健康','清爽','高蛋白'], category:'西餐', attrs:['味:清淡','烹:烤','热:低','适:清爽','系:西餐'], calories:'约 350 千卡' },
      dinner:    { title:'🍙 味噌汤配饭团', desc:'温暖清淡的味噌汤，配上简单的三角饭团。安静、没有多余刺激的一餐。', emoji:'🍙', tags:['日式','清淡','暖心'], category:'日式料理', attrs:['味:清淡','烹:煮','热:低','系:日式','适:暖胃'], calories:'约 300 千卡' },
    },
    leisure: {
      breakfast: { title:'🌸 花茶+可颂', desc:'慢慢泡一杯玫瑰花茶，黄油可颂重新烤到酥脆，让节奏慢下来。', emoji:'🥐', tags:['慢生活','花香','放松'], category:'甜食烘焙', attrs:['味:甜蜜','烹:烤','热:中','适:慢生活','系:西餐'], calories:'约 350 千卡' },
      lunch:     { title:'🍱 日式定食', desc:'三文鱼、渍物、味噌汤、米饭，每样一小份，看着整齐的摆盘心情也平静了。', emoji:'🍱', tags:['日式','精致','均衡'], category:'日式料理', attrs:['味:清淡','烹:煮','热:中','系:日式','适:治愈'], calories:'约 550 千卡' },
      dinner:    { title:'🐟 清蒸鲈鱼配白灼菜心', desc:'清淡的蒸鱼，鲜嫩原味，配白灼菜心。少油少盐，吃完身体轻松。', emoji:'🐟', tags:['清淡','健康','粤式'], category:'清淡汤品', attrs:['味:清淡','烹:蒸','热:低','适:养胃','适:清淡'], calories:'约 280 千卡' },
    },
    'no-appetite': {
      breakfast: { title:'🍋 蜂蜜柠檬水+苏打饼干', desc:'喝不下的时候，先来一杯温温的蜂蜜柠檬水，苏打饼干好消化。', emoji:'🍋', tags:['温和','开胃','轻食'], category:'甜食烘焙', attrs:['味:酸甜','烹:生食','热:低','适:清爽','适:开胃'], calories:'约 160 千卡' },
      lunch:     { title:'🥢 凉拌荞麦面', desc:'冰凉的荞麦面蘸着酱汁，清爽顺口，加黄瓜丝和海苔。', emoji:'🥢', tags:['凉爽','清淡','日式'], category:'日式料理', attrs:['味:清淡','烹:煮','热:低','系:日式','适:清爽'], calories:'约 320 千卡' },
      dinner:    { title:'🍲 冬瓜排骨汤', desc:'慢炖一锅冬瓜排骨汤，冬瓜吸满肉汤的鲜味，喝一碗整个人都舒坦了。', emoji:'🍲', tags:['汤品','清淡','暖胃'], category:'清淡汤品', attrs:['味:清淡','烹:炖','热:低','适:养胃','适:暖胃'], calories:'约 220 千卡' },
    },
    starving: {
      breakfast: { title:'🥟 鸡蛋灌饼+豆浆', desc:'街边早餐摊的经典组合。灌饼酥脆，豆浆浓郁，吃饱了才有力气。', emoji:'🥟', tags:['街头','经典','管饱'], category:'家常菜', attrs:['味:浓郁','烹:炒','热:高','适:管饱','适:快手'], calories:'约 420 千卡' },
      lunch:     { title:'🌶️ 麻辣香锅', desc:'辣到忘记烦恼！各种食材在辣椒和花椒里翻滚，吃到大汗淋漓。', emoji:'🌶️', tags:['麻辣','过瘾','发泄'], category:'麻辣', attrs:['味:麻辣','烹:炒','热:高','适:过瘾','系:中式'], calories:'约 650 千卡' },
      dinner:    { title:'🍕 披萨', desc:'芝士拉丝、饼底酥脆，想放什么 topping 就放什么。今晚不做大人。', emoji:'🍕', tags:['西餐','罪恶','快乐'], category:'西餐', attrs:['味:浓郁','烹:烤','热:高','系:西餐','适:聚餐'], calories:'约 600 千卡' },
    },
  },
  calm: {
    busy: {
      breakfast: { title:'🥣 隔夜燕麦', desc:'昨晚就准备好了，打开冰箱就能吃。燕麦+奇亚籽+牛奶+水果。', emoji:'🥣', tags:['备餐','健康','快手'], category:'甜食烘焙', attrs:['味:甜蜜','烹:生食','热:中','适:快手','适:清爽'], calories:'约 300 千卡' },
      lunch:     { title:'🥪 鸡胸肉三明治+沙拉', desc:'全麦面包夹鸡胸肉、生菜、番茄，配一份小沙拉。', emoji:'🥪', tags:['健康','清淡','均衡'], category:'西餐', attrs:['味:清淡','烹:烤','热:中','适:清爽','系:西餐'], calories:'约 400 千卡' },
      dinner:    { title:'🍜 乌冬面', desc:'胖嘟嘟的乌冬面在清汤里滑溜溜的，加个溏心蛋和一把葱花。', emoji:'🍜', tags:['日式','清淡','暖心'], category:'日式料理', attrs:['味:清淡','烹:煮','热:中','系:日式','适:暖胃'], calories:'约 350 千卡' },
    },
    leisure: {
      breakfast: { title:'🍚 日式早餐定番', desc:'烤三文鱼、味噌汤、白米饭、纳豆、渍物。丰盛而克制。', emoji:'🍚', tags:['日式','仪式感','精致'], category:'日式料理', attrs:['味:清淡','烹:烤','热:中','系:日式','适:慢生活'], calories:'约 550 千卡' },
      lunch:     { title:'🥗 素食能量碗', desc:'藜麦打底，铺上烤南瓜、牛油果、鹰嘴豆、羽衣甘蓝，淋上柠檬酱。', emoji:'🥗', tags:['素食','健康','色彩'], category:'家常菜', attrs:['味:清淡','烹:烤','热:中','适:清爽','适:健康'], calories:'约 380 千卡' },
      dinner:    { title:'🥟 自己包饺子', desc:'和面、调馅、擀皮、包饺子。过程比吃更治愈，韭菜鸡蛋虾仁馅。', emoji:'🥟', tags:['手工','治愈','家庭'], category:'中式面食', attrs:['味:清淡','烹:煮','热:中','系:中式','适:治愈'], calories:'约 500 千卡' },
    },
    'no-appetite': {
      breakfast: { title:'🍎 水果拼盘+酸奶', desc:'各种颜色的水果切好摆在盘子里，配一小杯希腊酸奶。', emoji:'🍎', tags:['清爽','健康','颜值'], category:'甜食烘焙', attrs:['味:甜蜜','烹:生食','热:低','适:清爽','适:快手'], calories:'约 200 千卡' },
      lunch:     { title:'🥶 冷面', desc:'冰冰凉凉的荞麦冷面，泡菜、黄瓜丝、鸡蛋、雪梨片，酸甜汤底。', emoji:'🍜', tags:['韩式','凉爽','酸甜'], category:'韩式料理', attrs:['味:酸甜','烹:煮','热:低','系:韩式','适:清爽'], calories:'约 350 千卡' },
      dinner:    { title:'🥬 蔬菜粥', desc:'大米慢熬到开花，加入切碎的青菜和香菇，滴几滴香油。', emoji:'🥬', tags:['养胃','清淡','助眠'], category:'清淡汤品', attrs:['味:清淡','烹:煮','热:低','适:养胃','适:清淡'], calories:'约 180 千卡' },
    },
    starving: {
      breakfast: { title:'🍞 法式吐司', desc:'吐司浸泡在蛋奶液里，煎到金黄酥脆，淋上枫糖浆，摆上香蕉和蓝莓。', emoji:'🍞', tags:['甜蜜','brunch','西式'], category:'甜食烘焙', attrs:['味:甜蜜','烹:炒','热:中','适:慢生活','系:西餐'], calories:'约 420 千卡' },
      lunch:     { title:'🍚 黯然销魂饭', desc:'港式茶餐厅的灵魂——叉烧配煎蛋，淋上酱汁拌饭。半熟蛋液裹着米饭和叉烧。', emoji:'🍚', tags:['港式','经典','下饭'], category:'中式米饭', attrs:['味:浓郁','烹:炒','热:高','适:管饱','系:中式'], calories:'约 650 千卡' },
      dinner:    { title:'🍲 寿喜烧', desc:'薄切牛肉在甜酱油汤底里涮几秒，蘸上生蛋液。配豆腐、茼蒿、魔芋丝。', emoji:'🍲', tags:['日式','涮锅','精致'], category:'日式料理', attrs:['味:浓郁','烹:煮','热:高','系:日式','适:慢生活'], calories:'约 550 千卡' },
    },
  },
};
