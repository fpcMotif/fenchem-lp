export interface Category {
  id: string;
  label: string;
}

export interface FeaturedProduct {
  brand: string;
  tagline: string;
  products: {
    name: string;
    desc: string;
  }[];
  artworkImage: string;
  bannerImage: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  inci: string;
  features: string;
  applications: string;
  origin: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  functions: string[];
  keyIngredients: string[];
  texture: string;
  applications: string;
}

export const CATEGORIES: Category[] = [
  { id: "personal-care", label: "个人护理" },
  { id: "functional-food", label: "功能性食品" },
  { id: "human-nutrition", label: "人类营养健康" },
  { id: "pet-health", label: "宠物健康" },
];

export const FEATURED_PRODUCT: FeaturedProduct = {
  brand: "OLVE'Care™ Shea",
  tagline: "天然全形态乳木果油脂，适配任何配方剂型",
  products: [
    {
      name: "OLVE' Care™ Shea Oil",
      desc: "更加全能，突破形态界限，高流动性和铺展性，无需担心高添加量下的结晶问题。",
    },
    {
      name: "OLVE' Care™ Shea butter",
      desc: "经典固态版，肤感丝滑丰厚",
    },
  ],
  artworkImage: "/products/cards-grid.png",
  bannerImage: "/products/banner.png",
};

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "murumuru",
    title: "木鲁星果棕籽脂 (Astrocaryum Murumuru Seed Butter)",
    category: "巴西拉美天然植物油脂",
    inci: "木鲁星果棕（ASTROCARYUM MURUMURU）籽脂",
    features:
      "亚马逊雨林来源，中短链脂肪酸丰富，熔点接近肤温，质地较乳木果油偏硬，具有天然硅感，气息怡人。",
    applications: "护肤霜膏、唇部护理、发膜、天然护发素",
    origin: "巴西亚马逊雨林可持续采集",
  },
  {
    id: "cupuacu",
    title: "大花可可树籽脂 (Cupuaçu Butter)",
    category: "巴西拉美天然植物油脂",
    inci: "大花可可树（THEOBROMA GRANDIFLORUM）籽脂",
    features:
      "源自亚马逊古布阿苏种子，硬脂酸、油酸含量高，触肤即融，赋予产品丝滑融化质感与极强锁水力。",
    applications: "润肤乳、身体霜、彩妆打底、急救修护膏",
    origin: "巴西热带雨林野生原产地",
  },
  {
    id: "copaiba",
    title: "科拜巴脂 (Copaiba Balsam)",
    category: "巴西拉美天然植物油脂",
    inci: "古巴香胶树（COPAIFERA OFFICINALIS）树脂",
    features:
      "亚马逊香脂树树脂，深棕色精油，含 β-石竹烯等成分，具备天然抗菌抗炎、促进肌肤微损伤愈合功效。",
    applications: "舒缓修护精华、痘肌调理油、头皮抗炎护理",
    origin: "亚马逊原始雨林传统采集",
  },
  {
    id: "green-coffee",
    title: "绿咖啡豆油 (Green Coffee Bean Oil)",
    category: "高活性天然植物油",
    inci: "小果咖啡（COFFEA ARABICA）籽油",
    features:
      "取自未烘焙生咖啡豆冷榨，棕绿色澄清液体，富含咖啡因、多酚黄酮与植物甾醇，带天然咖啡香，兼具强抗氧化力。",
    applications: "眼部紧致精华、消肿紧致身体油、抗光老化精华",
    origin: "拉美高山庄园冷榨",
  },
  {
    id: "urucum",
    title: "红木籽油 (Urucum / Annatto Seed Oil)",
    category: "天然着色与抗氧化油脂",
    inci: "红木（BIXA ORELLANA）籽提取物 & 向日葵（HELIANTHUS ANNUUS）籽油",
    features:
      "橙红色油状液体，肤感滋润厚实。胭脂树种子提取物富含天然类胡萝卜素，是天然暖金着色剂与日晒防护的首选原料。",
    applications: "美黑修护油、天然着色唇膏、防晒增效护理、抗氧化面油",
    origin: "热带雨林可持续林农",
  },
  {
    id: "acai",
    title: "巴西莓油 (Açai Oil)",
    category: "超级果实多酚油脂",
    inci: "蔬食埃塔棕（EUTERPE OLERACEA）果油",
    features:
      "源自巴西莓冷榨深绿色纯净油体，花青素与多酚含量极高，抗氧化力卓越，可抗糖化反应、多维保护肌肤弹性蛋白。",
    applications: "抗初老精华油、夜间修护晚霜、高端抗皱乳液",
    origin: "巴西北部湿地雨林",
  },
  {
    id: "jojoba",
    title: "霍霍巴油 (Jojoba Oil Golden & Colorless)",
    category: "经典植物油脂及角鲨烷",
    inci: "霍霍巴（SIMMONDSIA CHINENSIS）籽油",
    features:
      "以色列源头产地，天然长链液态单烯酸蜡酯，氧化稳定性极强，分子结构与人体皮脂高度近似，极速渗透亲肤且不油腻。",
    applications: "全能面油、卸妆油基底、头皮毛囊净化、婴儿润肤",
    origin: "以色列生态种植园",
  },
  {
    id: "olive-squalane",
    title: "橄榄角鲨烷 (Plant Squalane)",
    category: "高纯度天然润肤烷烃",
    inci: "角鲨烷 (Squalane)",
    features:
      "100% 植物橄榄来源，无色无味高纯度碳氢化合物，极致亲肤无油腻感，与皮肤皮脂膜完美相容，全品类配方兼容性优异。",
    applications: "高端精华液、修护面霜、全品类粉底彩妆、免洗护发精华",
    origin: "地中海橄榄物理脱臭提纯",
  },
  {
    id: "brazil-nut",
    title: "巴西坚果油 (Brazil Nut Oil)",
    category: "高硒强韧滋养油脂",
    inci: "巴西果（BERTHOLLETIA EXCELSA）籽油",
    features:
      "淡黄色透明液体，带有天然坚果香，富含 ω-6、ω-9 不饱和脂肪酸及天然微量元素硒和维生素 E，赋予毛鳞片镜面光泽。",
    applications: "干枯发丝修护精油、高光发膜、干性肌肤深层滋养膏",
    origin: "亚马逊原始雨林野生坚果",
  },
  {
    id: "at-calm-ist",
    title: "AT Calm-ist™ 植物抗敏剂",
    category: "专利功效活性提取物",
    inci: "紫苏叶、金黄洋甘菊、积雪草、欧蒲公英叶、蜀葵花、三七根复合提取物",
    features:
      "六种天然道地植物提取物精华协同增效，多通路阻断炎症介质释放，显著缓解各类敏感泛红、刺痛、红肿，配伍性极佳。",
    applications: "抗敏舒缓特护霜、晒后面膜、屏障急救喷雾、婴童护理",
    origin: "天然道地药材超声低温萃取",
  },
];

export const SOLUTION_ITEMS: SolutionItem[] = [
  {
    id: "clay-mask",
    title: "滋润清洁泥膜 (Nourishing Clay Mask)",
    subtitle: "一款含天然黏土的清洁舒缓涂抹泥膜",
    overview:
      "乳化型清洁泥膜，精选 325 目细腻巴西天然高岭黏土为核心吸附粉体，复配多种植物油脂与抗敏因子，深层吸附毛孔污垢同时温和舒缓，杜绝紧绷拔干。",
    functions: ["毛孔深度吸附清洁", "多重油脂保湿滋养", "舒缓修护敏感泛红"],
    keyIngredients: [
      "325目巴西天然黏土",
      "AT Calm-ist™ 植物抗敏剂",
      "乳木果油",
      "白池花籽油",
      "霍霍巴籽油",
    ],
    texture: "膏状泥质，柔滑易延展，久敷不干裂",
    applications: "涂抹式清洁面膜、T区毛孔调理泥膜",
  },
  {
    id: "rose-mist",
    title: "舒缓保湿补水喷雾 (Soothing Rose Mist)",
    subtitle: "一款含抗敏活性成分的玫瑰纯露保湿喷雾",
    overview:
      "以保加利亚大马士革玫瑰纯露为水相基底，气味清甜纯正；融合六重植提抗敏因子 AT Calm-ist™ 协同增效，为敏肌提供即刻镇定舒缓与长效水润。",
    functions: ["即时补水锁水", "降温舒缓敏感刺激", "强韧肌肤屏障微生态"],
    keyIngredients: ["大马士革玫瑰纯露", "AT Calm-ist™ 植物抗敏剂", "天然多元醇保湿体系"],
    texture: "轻薄水雾质地，吸收迅速，肤感清爽不黏腻",
    applications: "便携保湿喷雾、妆前舒缓水、晒后镇静爽肤水",
  },
  {
    id: "botanical-lotion",
    title: "植物精粹身体乳 (Botanical Essence Body Lotion)",
    subtitle: "一款以多重植物油脂与 4D 玻尿酸为核心的滋润型身体乳",
    overview:
      "乳化型多层滋养身体乳，科学配比大花可可树籽脂、鳄梨油、橄榄果渣油与澳洲坚果油四重雨林植物油脂，搭载 4D 多层级透明质酸钠与 VC-IP 提亮分子，深润焕采。",
    functions: ["多层级立体锁水", "四重植物油脂柔肤滋润", "舒缓修护提亮肤色"],
    keyIngredients: [
      "4D HA 多重透明质酸钠复合物",
      "VC-IP 抗坏血酸四异棕榈酸酯",
      "大花可可树籽脂",
      "鳄梨油",
      "FM-AT 尿囊素",
    ],
    texture: "丝滑轻盈乳液，一抹化水，秒速吸收无黏感",
    applications: "全身日常滋润护理、秋冬干皮深层润肤",
  },
  {
    id: "hand-cream",
    title: "滋养保湿护手霜 (Deep Nourishing Hand Cream)",
    subtitle: "一款以乳木果油与芒果籽脂为核心的深度滋润型护手霜",
    overview:
      "专为手部干燥脱皮研发的高滋养手膜级护手霜，含有 6% 高添加精制乳木果油与 3% 芒果籽脂，协同 4D 玻尿酸长效包裹，密集修护手部微损伤与指缘倒刺。",
    functions: ["深层修护指缘干裂", "长效防干锁水保护膜", "柔嫩手部粗糙角质"],
    keyIngredients: ["精制乳木果油 (6%)", "芒果籽脂 (3%)", "白池花籽油", "4D HA 多重透明质酸钠"],
    texture: "丰厚凝润膏体，触肤即化，润泽不泛油光",
    applications: "手部密集滋养霜、日夜修护手膜",
  },
  {
    id: "shea-body-cream",
    title: "乳木果油身体霜 (20% Shea Intensive Body Butter)",
    subtitle: "20% 高含量乳木果油的包裹感舒缓身体霜",
    overview:
      "高阶敏感肌与重度干皮特护霜，突破性加入 20% 液态乳木果油脂，富含天然三萜类抗炎活性分子，极简配方仅含 8 种 INCI 成分，构筑温和亲肤透气舒缓屏障。",
    functions: ["20% 高浓缩乳木果油滋养", "包裹舒缓敏感泛红", "重塑干裂受损屏障"],
    keyIngredients: ["液态乳木果油 (20%)", "天然三萜类活性成分", "极简温和防腐体系"],
    texture: "黄油凝霜质地，丰润包裹感强，润而不腻",
    applications: "干痒特护身体霜、干性敏感肌急救面霜",
  },
  {
    id: "body-oil",
    title: "身体护理精华油 (Lightweight Body Oil)",
    subtitle: "一款轻质滋养的全油基身体护理精华油",
    overview:
      "100% 纯天然全油基配方，以冷榨甜杏仁油为温和基底，复配高渗透角鲨烷、黄金霍霍巴油与天然红没药醇，丝质轻盈流动感，沐浴后锁水亮肤。",
    functions: ["全油水润锁光", "舒缓改善肌肤粗糙", "轻盈透气无油膜感"],
    keyIngredients: ["甜杏仁油", "植物角鲨烷", "霍霍巴籽油", "天然红没药醇"],
    texture: "澄清金黄精油，极佳铺展性，轻薄干爽",
    applications: "身体润肤油、沐浴后湿发顺滑油、芳疗按摩油",
  },
  {
    id: "whitening-cream",
    title: "多效滋润美白霜 (Multi-Action Whitening Cream)",
    subtitle: "4-丁基间苯二酚为核心的多效美白面霜",
    overview:
      "以美白黄金成分 4-丁基间苯二酚（577）为核心，复配烟酰胺与 4D 玻尿酸、白池花籽油，阻断酪氨酸酶活性，从根源抑黑褪黄，兼顾高倍保湿与温和修护。",
    functions: ["根源抑黑匀净肤色", "深层舒缓保湿修护", "淡化色斑暗沉"],
    keyIngredients: [
      "4-丁基间苯二酚 (577)",
      "烟酰胺",
      "4D HA 透明质酸钠",
      "白池花籽油",
      "橄榄角鲨烷",
    ],
    texture: "丝绒凝乳面霜，水润好推开，滋润柔滑",
    applications: "美白祛斑面霜、熬夜焕亮晚霜",
  },
  {
    id: "shower-oil",
    title: "柔润温和沐浴油 (50% Avocado Shower Oil)",
    subtitle: "50% 高含量鳄梨油的无皂基沐浴油",
    overview:
      "采用冷配工艺完整保留植物脂质活性，含有高达 50% 优质鳄梨果油，零皂基温和乳化体系，遇水瞬间乳化为柔滑奶白色牛奶状，洗净多余油脂同时深润角质。",
    functions: ["以油溶油温和洗净", "洗卸合一无皂基配方", "洗后柔嫩顺滑不拔干"],
    keyIngredients: ["鳄梨果油 (50%)", "天然胡萝卜提取物", "生育酚 (维生素 E)", "植物甘油润肤体系"],
    texture: "晶莹琥珀色油体，遇水即乳化为细腻奶液",
    applications: "干敏肌日常洁肤、秋冬滋润沐浴油",
  },
  {
    id: "argan-hair-oil",
    title: "阿甘油护发精华油 (Argan Hair Repair Oil)",
    subtitle: "一款阿甘油复配植物角鲨烷的修护护发精华油",
    overview:
      "精选摩洛哥刺阿干树仁油（阿甘油）与亚麻籽油、植物角鲨烷协同作用，深入毛鳞片间质填补微孔，改善发丝干枯分叉与毛躁静电，赋予发丝闪亮垂顺光泽。",
    functions: ["修护受损毛鳞片", "抗热抚平毛躁", "轻盈锁光增亮"],
    keyIngredients: ["摩洛哥阿甘油", "亚麻籽油", "橄榄角鲨烷", "大马士革玫瑰精油调香"],
    texture: "透明清透精油，轻盈丝滑不黏手",
    applications: "免洗干湿两用护发油、热工具造型前打底",
  },
  {
    id: "sunscreen",
    title: "SPF50+ 高倍户外防晒霜 (SPF50+ PA++++ Shield)",
    subtitle: "一款物化结合的高倍户外全波段防晒面霜",
    overview:
      "SPF50+、PA++++ 最高防护等级，物理微粒二氧化钛与广谱化学防晒剂复配，构筑全波段紫外线防御网络；复配 4D 玻尿酸与尿囊素舒缓防晒泛红，防水抗汗成膜。",
    functions: ["SPF50+ PA++++ 广谱防护", "防水防汗快速成膜", "高保湿舒缓防光损伤"],
    keyIngredients: ["微粉化二氧化钛", "双-乙基己氧苯酚甲氧苯基三嗪", "4D HA 透明质酸", "尿囊素"],
    texture: "轻薄乳霜，成膜快，清透贴肤不搓泥",
    applications: "户外高倍面部防晒、妆前防晒乳",
  },
];
