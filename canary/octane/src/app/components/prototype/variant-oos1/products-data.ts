export interface Category {
  id: string;
  label: string;
  englishLabel: string;
}

export interface FeaturedItem {
  id: string;
  name: string;
  englishName: string;
  desc: string;
  cardImage: string;
  cardAlt: string;
}

export interface FeaturedProduct {
  brand: string;
  tagline: string;
  items: FeaturedItem[];
  bannerImage: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  englishName: string;
  inci: string;
  features: string;
}

export interface CatalogGroup {
  id: string;
  label: string;
  englishLabel: string;
  intro?: string;
  items: CatalogItem[];
}

export type SolutionAreaId = "face" | "body" | "cleansing" | "hair" | "sun";

export interface SolutionArea {
  id: SolutionAreaId;
  label: string;
  englishLabel: string;
}

export interface SolutionItem {
  id: string;
  area: SolutionAreaId;
  title: string;
  englishName: string;
  subtitle: string;
  overview: string[];
  functions: string[];
  keyIngredients: string[];
  challenges: string[];
  texture: string[];
  applications: string[];
}

export const CATEGORIES: Category[] = [
  { id: "personal-care", label: "个人护理", englishLabel: "Personal care" },
  { id: "functional-food", label: "功能性食品", englishLabel: "Functional food" },
  { id: "human-nutrition", label: "人类营养健康", englishLabel: "Human nutrition and health" },
  { id: "pet-health", label: "宠物健康", englishLabel: "Pet health" },
];

export const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: "shea-oil",
    name: "液态乳木果油",
    englishName: "OLVE'Care™ Shea Oil",
    desc: "更加全能，突破形态界限。高流动性和铺展性，无需担心高添加量下的结晶问题。",
    cardImage: "/products/card-1.png",
    cardAlt: "OLVE'Care™ Shea Oil, a fluid liquid shea texture",
  },
  {
    id: "shea-butter",
    name: "精制乳木果油",
    englishName: "OLVE'Care™ Shea butter",
    desc: "经典固态版，肤感丝滑丰厚",
    cardImage: "/products/card-6.png",
    cardAlt: "OLVE'Care™ Shea Butter, a smooth spreadable texture",
  },
  {
    id: "acai-oil",
    name: "巴西莓油",
    englishName: "Amazon Açai Berry Oil",
    desc: "冷榨深绿色纯净油体，花青素与多酚含量极高，抗氧化抗糖化，弹润活肤。",
    cardImage: "/products/card-3.png",
    cardAlt: "Deep purple Amazonian açaí superfruit oil rich in polyphenols",
  },
  {
    id: "avocado-oil",
    name: "优质鳄梨油",
    englishName: "Virgin Avocado Oil",
    desc: "鲜切牛油果冷榨，富含 ω-9 与高含量不皂化物，抗炎修护，强韧屏障。",
    cardImage: "/products/card-4.png",
    cardAlt: "Freshly cut green avocado, rich in natural monounsaturated fatty acids",
  },
  {
    id: "brazil-nut-oil",
    name: "巴西坚果油",
    englishName: "Wild Brazil Nut Oil",
    desc: "富含天然微量元素硒、维生素 E 与不饱和脂肪酸，赋予毛鳞片镜面光泽。",
    cardImage: "/products/card-7.png",
    cardAlt: "Amazonian Brazil nuts and their nourishing oil",
  },
  {
    id: "plant-squalane",
    name: "高纯植物角鲨烷",
    englishName: "Pure Plant Squalane",
    desc: "100% 植物橄榄来源，极致亲肤丝滑透气无黏腻，与皮肤脂质膜完美相融。",
    cardImage: "/products/card-2.png",
    cardAlt: "Glossy gel droplets of plant-derived squalane",
  },
];

export const FEATURED_PRODUCT: FeaturedProduct = {
  brand: "OLVE'Care™ Shea",
  tagline: "天然全形态乳木果油脂，适配任何配方剂型",
  items: FEATURED_ITEMS,
  bannerImage: "/products/banner.png",
};

export const CATALOG_GROUPS: CatalogGroup[] = [
  {
    id: "brazil",
    label: "巴西拉美天然植物油脂",
    englishLabel: "Brazilian and Latin American plant oils",
    items: [
      {
        id: "brazil-01",
        title: "木鲁星果棕籽脂",
        englishName: "Murumuru Seed Butter",
        inci: "木鲁星果棕（ASTROCARYUM MURUMURU）籽脂",
        features:
          "亚马逊雨林来源，中短链脂肪酸丰富，熔点接近肤温，质地较乳木果油偏硬，具有天然硅感，气息怡人。",
      },
      {
        id: "brazil-02",
        title: "大花可可树籽脂",
        englishName: "Cupuaçu Seed Butter",
        inci: "大花可可树（THEOBROMA GRANDIFLORUM）籽脂",
        features: "源自亚马逊古布阿苏种子，硬脂酸、油酸含量高，触肤即融，赋予产品丝滑融化质感。",
      },
      {
        id: "brazil-03",
        title: "科拜巴脂",
        englishName: "Copaiba Balsam",
        inci: "古巴香胶树（COPAIFERA OFFICINALIS）树脂",
        features:
          "亚马逊香脂树树脂，深棕色精油，含 β-石竹烯等成分，具备抗菌抗炎、促进肌肤愈合的作用。",
      },
      {
        id: "brazil-04",
        title: "绿咖啡豆油",
        englishName: "Green Coffee Bean Oil",
        inci: "小果咖啡（COFFEA ARABICA）籽油",
        features:
          "取自未烘焙咖啡豆，棕绿色液体，含咖啡因、黄酮与植物甾醇，带天然咖啡香，兼具抗氧化力。",
      },
      {
        id: "brazil-05",
        title: "红木籽油",
        englishName: "Annatto Seed Oil",
        inci: "红木（BIXA ORELLANA）籽提取物 & 向日葵（HELIANTHUS ANNUUS）籽油",
        features:
          "橙红色油状液体，肤感滋润厚实。胭脂树种子提取物富含类胡萝卜素，是天然着色剂的不二之选。",
      },
      {
        id: "brazil-06",
        title: "巴西莓油",
        englishName: "Açaí Oil",
        inci: "蔬食埃塔棕（EUTERPE OLERACEA）果油",
        features: "源自巴西莓，深绿色油体，多酚含量高，抗氧化力强，可抗糖化、保护肌肤弹性蛋白。",
      },
      {
        id: "brazil-07",
        title: "星果棕果油",
        englishName: "Tucumã Fruit Oil",
        inci: "星果棕（ASTROCARYUM VULGARE）果油",
        features:
          "俗称Tucumã Oil，橙红色油状至半固体，富含 ω-3 与胡萝卜素，可抵御紫外线、修护顺滑发丝。",
      },
      {
        id: "brazil-08",
        title: "巴巴苏籽油",
        englishName: "Babassu Seed Oil",
        inci: "巴巴苏（ORBIGNYA OLEIFERA）籽油",
        features: "类白至淡黄色油体，富含月桂酸与维 E，清爽易吸收，适配全发质的头发护理配方。",
      },
      {
        id: "brazil-09",
        title: "巴西坚果油",
        englishName: "Brazil Nut Oil",
        inci: "巴西果（BERTHOLLETIA EXCELSA）籽油",
        features:
          "外观呈淡黄色透明液体，带有天然坚果香气，富含ω-6和ω-9脂肪酸以及维生素E，具有卓越的修护、抗氧化特性，赋予头发闪亮光泽。",
      },
      {
        id: "brazil-10",
        title: "巴卡斯籽油",
        englishName: "Pracaxi Seed Oil",
        inci: "大裂叶五桤木（PENTACLETHRA MACROLOBA）籽油",
        features: "富含维 A/E，可紧致肌肤、促进细胞更新，抚平发丝毛躁，能作为硅油的天然替代品。",
      },
      {
        id: "brazil-11",
        title: "安德罗巴油",
        englishName: "Andiroba Oil",
        inci: "苦油树（CARAPA GUAIANENSIS）籽油",
        features: "亚马逊经典药用油，金黄色液体，可平衡头皮油脂、去屑，兼具抗炎、肌肤修护功效。",
      },
      {
        id: "brazil-12",
        title: "巴西棕榈蜡",
        englishName: "Carnauba Wax",
        inci: "巴西棕榈树（COPERNICIA CERIFERA）蜡",
        features: "提取自巴西棕榈树叶，高硬度高熔点，光泽防潮性佳，适配发蜡、口红、眉笔等彩妆。",
      },
    ],
  },
  {
    id: "mediterranean",
    label: "地中海天然植物油脂",
    englishLabel: "Mediterranean plant oils",
    items: [
      {
        id: "mediterranean-01",
        title: "精制乳木果油 (Shea Butter)",
        englishName: "Refined Shea Butter",
        inci: "牛油果树（BUTYROSPERMUM PARKII）果脂",
        features: "常温乳白色固态，丝滑黄油质地，不皂化物含量高，适配高保湿封闭配方，具多重认证。",
      },
      {
        id: "mediterranean-02",
        title: "液态乳木果油 (Shea Oil)",
        englishName: "Liquid Shea Oil",
        inci: "牛油果树（BUTYROSPERMUM PARKII）果脂",
        features:
          "常温液态，流动性铺展性佳，不皂化物含量更高，投料便捷，适配多类配方，无结晶风险。",
      },
      {
        id: "mediterranean-03",
        title: "霍霍巴油 (金色/无色)",
        englishName: "Jojoba Oil (Golden or Clear)",
        inci: "霍霍巴（SIMMONDSIA CHINENSIS）籽油",
        features: "以色列产地，天然液态蜡，氧化稳定强，结构近似人体皮脂，亲肤易渗透、不油腻。",
      },
      {
        id: "mediterranean-04",
        title: "橄榄角鲨烷",
        englishName: "Olive Squalane",
        inci: "角鲨烷",
        features:
          "100% 植物来源，无色无味，极致亲肤无油腻感，兼容性佳，适配护肤、护发及全品类彩妆。",
      },
      {
        id: "mediterranean-05",
        title: "甜杏仁油",
        englishName: "Sweet Almond Oil",
        inci: "甜扁桃（PRUNUS AMYGDALUS DULCIS）油",
        features:
          "淡黄色透明油体，经典基础护理油，肤感滋润，与各类植物油配伍性好，适配多种护肤配方。",
      },
      {
        id: "mediterranean-06",
        title: "橄榄油",
        englishName: "Olive Oil",
        inci: "油橄榄（OLEA EUROPAEA）果油",
        features: "高油酸占比，淡黄色油体，亲肤滋润，是通用基础油，适配护肤、卸妆等多类护理产品。",
      },
      {
        id: "mediterranean-07",
        title: "葡萄籽油",
        englishName: "Grape Seed Oil",
        inci: "葡萄（VITIS VINIFERA）籽油",
        features:
          "富含多不饱和脂肪酸，质地轻薄易铺展，吸收佳、抗氧化强，适配油性、敏感肌及按摩护理。",
      },
      {
        id: "mediterranean-08",
        title: "太阳花油",
        englishName: "Sunflower Oil",
        inci: "向日葵（HELIANTHUS ANNUUS）籽油",
        features: "高油酸亚油酸含量，亲肤滋润，肤感比甜杏仁油更清爽，丝滑柔润，是常用基础油脂。",
      },
      {
        id: "mediterranean-09",
        title: "澳洲坚果油",
        englishName: "Macadamia Nut Oil",
        inci: "全缘叶澳洲坚果（MACADAMIA INTEGRIFOLIA）籽油",
        features: "富含 ω-7 与维 E，深层保湿滋养，温和低刺激，适配干性、敏感性肌肤护理。",
      },
      {
        id: "mediterranean-10",
        title: "摩洛哥坚果油/阿甘油",
        englishName: "Argan Oil",
        inci: "刺阿干树（ARGANIA SPINOSA）仁油",
        features: "含角鲨烯，油酸亚油酸比例优，渗透快不闷肤，修护屏障，改善发丝干枯分叉。",
      },
      {
        id: "mediterranean-11",
        title: "鳄梨油",
        englishName: "Avocado Oil",
        inci: "鳄梨（PERSEA GRATISSIMA）油",
        features:
          "提取自牛油果，富含 ω-9 与高含量不皂化物，抗炎修护力强，可强韧肌肤屏障、深层滋养。",
      },
      {
        id: "mediterranean-12",
        title: "芒果籽脂",
        englishName: "Mango Seed Butter",
        inci: "芒果（MANGIFERA INDICA）籽脂",
        features: "常温淡黄色固体脂，触肤即化、延展性佳，肤感丝绒柔滑，比乳木果、可可脂更清爽。",
      },
      {
        id: "mediterranean-13",
        title: "玫瑰果油",
        englishName: "Rosehip Oil",
        inci: "狗牙蔷薇（ROSA CANINA）果油",
        features:
          "淡黄色透明油体，带淡草本香，富含不饱和脂肪酸与多维活性，抗炎修护，促进肌肤新生。",
      },
      {
        id: "mediterranean-14",
        title: "西班牙鼠尾草油 (奇亚籽油)",
        englishName: "Chia Seed Oil",
        inci: "西班牙鼠尾草（SALVIA HISPANICA）籽油",
        features: "富含多不饱和脂肪酸，质地轻盈顺滑，适配油性肌，可修护屏障、舒缓抗炎。",
      },
      {
        id: "mediterranean-15",
        title: "蓖麻籽油",
        englishName: "Castor Seed Oil",
        inci: "蓖麻（RICINUS COMMUNIS）籽油",
        features: "厚重黏稠油体，富含蓖麻酸，封闭成膜性强，提升彩妆持妆力，适配毛发、唇部护理。",
      },
    ],
  },
  {
    id: "south-africa",
    label: "南非天然植物油脂",
    englishLabel: "South African plant oils",
    intro:
      "古老的非洲大陆盛产最坚韧的植物，将滋养的能量封存在珍贵的果实与种核之中。我们坚持与当地社区合作，承诺以公平贸易和可持续的方式手工采集野生果实。让南非旷野的蓬勃生命力触手可及，为您带来肌肤与感官的纯粹觉醒。",
    items: [
      {
        id: "south-africa-01",
        title: "有机猴面包树籽油",
        englishName: "Organic Baobab Seed Oil",
        inci: "猴面包树（ADANSONIA DIGITATA）籽油",
        features: "非洲来源，含均衡脂肪酸与维 E、黄酮，保湿锁水、抗炎舒缓，改善发丝强韧度与光泽。",
      },
      {
        id: "south-africa-02",
        title: "有机马鲁拉油",
        englishName: "Organic Marula Oil",
        inci: "伯尔硬胡桃（SCLEROCARYA BIRREA）籽油",
        features:
          "高油酸含量，渗透力强、吸收快，肤感丝滑，兼具抗氧化、保湿修护功效，护肤护发通用。",
      },
      {
        id: "south-africa-03",
        title: "有机海檀木籽油",
        englishName: "Organic Ximenia Seed Oil",
        inci: "海檀木（XIMENIA AMERICANA）籽油",
        features: "淡黄色油体，质地偏稠带拉丝感，富含多种脂肪酸与西门尼酸，肤感丰厚、修护力强。",
      },
      {
        id: "south-africa-04",
        title: "可可籽脂",
        englishName: "Cocoa Seed Butter",
        inci: "可可（THEOBROMA CACAO）籽脂",
        features: "淡黄色油体，质地偏稠带拉丝感，富含多种脂肪酸与西门尼酸，肤感丰厚、修护力强。",
      },
    ],
  },
  {
    id: "north-america",
    label: "北美天然植物油脂",
    englishLabel: "North American plant oils",
    intro:
      "北美大陆以其丰沛的生命力，在每一粒种籽中馈赠以卓效的滋润与焕活之力，赋予肌肤天鹅绒般的柔润与静谧光泽。",
    items: [
      {
        id: "north-america-01",
        title: "白池花籽油",
        englishName: "Meadowfoam Seed Oil",
        inci: "白池花（LIMNANTHES ALBA）籽油",
        features:
          "长链脂肪酸占比 98%+，氧化稳定性优异，肤感丰盈滋润不油腻，色粉分散性好，适配多品类。",
      },
      {
        id: "north-america-02",
        title: "深海两节荠籽油",
        englishName: "Crambe Seed Oil",
        inci: "深海两节荠（CRAMBE ABYSSINICA）籽油",
        features:
          "又称阿比西尼亚油，长链脂肪酸丰富，氧化热稳定性佳，修护受损发质，天然替代硅油矿物油。",
      },
    ],
  },
  {
    id: "active",
    label: "活性物",
    englishLabel: "Actives",
    items: [
      {
        id: "active-01",
        title: "AT Calm-ist",
        englishName: "AT Calm-ist",
        inci: "紫苏（PERILLA OCYMOIDES）叶提取物、金黄洋甘菊（CHRYSANTHELLUM INDICUM）提取物、积雪草（CENTELLA ASIATICA）提取物、欧蒲公英（TARAXACUM OFFICINALE）叶提取物、蜀葵（ALTHAEA ROSEA）花提取物、三七（PANAX NOTOGINSENG）根提取物",
        features:
          "六种植物提取物精华，天然抗敏原料。对各种炎症、湿疹、瘙痒、和红肿有显著的效果，有良好的配伍性，可应用于各类个人护理产品。",
      },
      {
        id: "active-02",
        title: "千日菊提取物",
        englishName: "Acmella Extract",
        inci: "千日菊（ACMELLA OLERACEA）提取物",
        features:
          "拥有油溶性“植物肉毒素”的美誉，即时抗皱、渗透性好，快速消除动态纹，提升紧致度。适用于抗皱抗衰类的高端护肤产品及唇部保养产品。",
      },
      {
        id: "active-03",
        title: "苯乙基间苯二酚",
        englishName: "Phenylethyl Resorcinol",
        inci: "苯乙基间苯二酚",
        features: "俗称“377”，经典酪氨酸酶抑制剂，多通路抑黑提亮，美白效力是曲酸的 22 倍。",
      },
      {
        id: "active-04",
        title: "4-丁基间苯二酚",
        englishName: "4-Butylresorcinol",
        inci: "4-丁基间苯二酚",
        features:
          "俗称“577”，强效酪氨酸酶抑制剂，阻断黑色素生成，美白效力为 377 的 6 倍、熊果苷 310 倍。",
      },
      {
        id: "active-05",
        title: "4-己基间苯二酚",
        englishName: "4-Hexylresorcinol",
        inci: "4-己基间苯二酚",
        features: "抑制酪氨酸酶活性，兼具抗炎抗氧化作用，推荐用量 0.4%，实现美白提亮。",
      },
    ],
  },
  {
    id: "other",
    label: "其他",
    englishLabel: "Other ingredients",
    items: [
      {
        id: "other-01",
        title: "FM 1618",
        englishName: "FM 1618",
        inci: "鲸蜡硬脂基葡糖苷、鲸蜡硬脂醇",
        features:
          "天然非离子 O/W 乳化剂，兼容性广、搭配灵活，绿色温和安全性高，适配各类乳化护肤配方。",
      },
      {
        id: "other-02",
        title: "GTCC",
        englishName: "GTCC",
        inci: "辛酸/癸酸甘油三酯",
        features:
          "通用化妆品基础油脂，氧化稳定性高，清爽滋润不黏腻，配伍性优异，适配多类护理产品。",
      },
      {
        id: "other-03",
        title: "FM-DBA",
        englishName: "FM-DBA",
        inci: "己二酸二丁酯",
        features: "合成油脂，对防晒剂、色粉溶解分散力优，铺展性佳，可改善防晒产品黏腻厚重肤感。",
      },
      {
        id: "other-04",
        title: "玫瑰纯露",
        englishName: "Rose Hydrosol",
        inci: "突厥蔷薇（ROSA DAMASCENA）花水",
        features:
          "保加利亚大马士革玫瑰来源，食品级，含 0.1% 精油，香气纯正，补水嫩肤，适配爽肤水面膜。",
      },
    ],
  },
];

export const SOLUTION_AREAS: SolutionArea[] = [
  { id: "face", label: "面部护理", englishLabel: "Face care" },
  { id: "body", label: "身体护理", englishLabel: "Body care" },
  { id: "cleansing", label: "清洁", englishLabel: "Cleansing" },
  { id: "hair", label: "头发护理", englishLabel: "Hair care" },
  { id: "sun", label: "防晒", englishLabel: "Sun care" },
];

export const SOLUTION_ITEMS: SolutionItem[] = [
  {
    id: "clay-mask",
    area: "cleansing",
    title: "滋润清洁泥膜",
    englishName: "Nourishing Cleansing Clay Mask",
    subtitle: "一款含天然黏土的清洁舒缓涂抹泥膜",
    overview: [
      "乳化型清洁泥膜",
      "325目巴西黏土为核心粉体",
      "复配多种植物油脂",
      "清洁同时舒缓，减少拔干紧绷",
    ],
    functions: ["清洁吸附", "保湿滋养", "舒缓修护"],
    keyIngredients: ["巴西黏土", "AT Calm-ist™ 植物抗敏剂", "乳木果油", "白池花籽油", "霍霍巴籽油"],
    challenges: ["粉体均匀分散与体系悬浮稳定", "清洁力与保湿舒缓的平衡"],
    texture: ["膏状泥质", "柔滑易涂抹"],
    applications: ["涂抹式清洁面膜"],
  },
  {
    id: "rose-mist",
    area: "face",
    title: "舒缓保湿补水喷雾",
    englishName: "Soothing Hydrating Mist",
    subtitle: "一款含抗敏活性成分的玫瑰纯露保湿喷雾",
    overview: ["大马士革玫瑰纯露，气味香甜纯正", "六重植提抗敏因子协同增效，保湿舒缓，镇定舒缓"],
    functions: ["补水保湿", "舒缓镇定"],
    keyIngredients: ["大马士革玫瑰纯露", "AT Calm-ist™ 植物抗敏剂"],
    challenges: [],
    texture: ["水状"],
    applications: ["保湿抗敏喷雾/水"],
  },
  {
    id: "botanical-lotion",
    area: "body",
    title: "植物精粹身体乳",
    englishName: "Botanical Body Lotion",
    subtitle: "一款以多重植物油脂与 4D 玻尿酸为核心的滋润型身体乳",
    overview: [
      "乳化型滋润身体乳",
      "复配四种植物油脂（大花可可脂、鳄梨油、橄榄果渣油、澳洲坚果油）",
      "4D 多重透明质酸钠体系，多层级保湿",
      "VC-IP 衍生物提亮，尿囊素舒缓修护",
    ],
    functions: ["深层滋润", "多重保湿", "舒缓提亮"],
    keyIngredients: [
      "4D HA 多重透明质酸钠复合物",
      "VC-IP 抗坏血酸四异棕榈酸酯",
      "FM-AT 尿囊素",
      "大花可可树籽脂 / 鳄梨油 / 橄榄果渣油 / 澳洲坚果油",
    ],
    challenges: [
      "高含量植物油脂的乳化稳定性",
      "4D 玻尿酸不同分子量层级的均匀分散",
      "滋润感与质地清爽的平衡",
      "多元油脂复配体系的肤感协调",
    ],
    texture: ["轻盈乳状", "易推开吸收快"],
    applications: ["身体护理", "日常保湿润肤"],
  },
  {
    id: "hand-cream",
    area: "body",
    title: "滋养保湿护手霜",
    englishName: "Nourishing Hand Cream",
    subtitle: "一款以乳木果油与芒果籽脂为核心的深度滋润型护手霜",
    overview: [
      "乳化型高滋润护手霜",
      "高含量乳木果油（6%）+ 芒果籽脂（3%），强化滋润修护",
      "4D 多重透明质酸钠体系，多层级保湿锁水",
      "黄原胶复配增稠，膏体细腻稳定",
    ],
    functions: ["深度滋养", "持久保湿", "修护干燥"],
    keyIngredients: [
      "4D HA 多重透明质酸钠复合物",
      "乳木果油（6% 高添加）",
      "芒果籽脂",
      "白池花籽油",
    ],
    challenges: [
      "高含量固态油脂的乳化与膏体稳定性",
      "厚重膏体与涂抹延展性的平衡",
      "4D 玻尿酸在高油相体系中的均匀分散",
      "滋润感与黏腻感的平衡控制",
    ],
    texture: ["厚实膏状", "丰润易推开"],
    applications: ["手部护理", "干燥肌深度滋养"],
  },
  {
    id: "shea-body-cream",
    area: "body",
    title: "乳木果油身体霜",
    englishName: "Shea Butter Body Cream",
    subtitle: "20% 高含量乳木果油的包裹感舒缓身体霜",
    overview: [
      "高滋润身体霜，添加 20% 液态乳木果油",
      "包裹感强肤感滋润不腻，为敏感肌提供舒缓防护",
      "富集三萜类活性分子，具备抗炎舒缓属性",
      "极简配方，仅 8 种 INCI 成分",
    ],
    functions: ["20% 高含量乳木果油", "包裹舒缓敏感肌", "深度滋养柔肤"],
    keyIngredients: ["液态乳木果油", "三萜类活性物"],
    challenges: [
      "20% 高含量油脂的乳化稳定性",
      "包裹感与黏腻感的平衡",
      "高活性物的体系兼容性",
      "极简配方的防腐保障",
    ],
    texture: ["丰润乳霜", "肤感细腻滋润"],
    applications: ["身体护理", "敏感肌滋养舒缓"],
  },
  {
    id: "body-oil",
    area: "body",
    title: "身体护理精华油",
    englishName: "Body Serum Oil",
    subtitle: "一款轻质滋养的全油基身体护理精华油",
    overview: [
      "全油基身体护理油，以甜杏仁油为基底",
      "复配角鲨烷、霍霍巴油等润肤油脂",
      "添加红没药醇舒缓修护",
      "轻质油感，滋养不黏腻",
    ],
    functions: ["柔润滋养", "舒缓修护", "轻薄润肤"],
    keyIngredients: ["甜杏仁油", "角鲨烷", "霍霍巴油", "红没药醇"],
    challenges: [
      "多种油脂的肤感调和",
      "全油体系的氧化稳定",
      "滋润度与清爽感的平衡",
      "香精与油相的兼容稳定",
    ],
    texture: ["澄清油状液体", "顺滑易延展"],
    applications: ["身体护理", "身体精华油、按摩油"],
  },
  {
    id: "whitening-cream",
    area: "face",
    title: "多效滋润美白霜",
    englishName: "Multi-Action Brightening Cream",
    subtitle: "4-丁基间苯二酚为核心的多效美白面霜",
    overview: [
      "乳化型多效美白面霜",
      "4-丁基间苯二酚为核心美白成分，复配烟酰胺",
      "4D 玻尿酸多层保湿，乙酰氨基葡萄糖修护",
      "多种植物油脂润肤，红没药醇舒缓",
    ],
    functions: ["多效美白提亮", "深层保湿修护", "舒缓润肤"],
    keyIngredients: [
      "4-丁基间苯二酚",
      "烟酰胺",
      "4D HA 多重透明质酸钠",
      "乙酰氨基葡萄糖",
      "泛醇、Ⅲ 型胶原蛋白",
      "白池花籽油、橄榄角鲨烷",
      "红没药醇",
    ],
    challenges: [
      "美白活性物的体系兼容与稳定",
      "4D 玻尿酸在乳化体系中的均匀分散",
      "多种油脂的乳化稳定",
      "美白功效与温和性的平衡",
    ],
    texture: ["细腻乳霜", "顺滑易推开"],
    applications: ["面部护理", "美白保湿面霜"],
  },
  {
    id: "shower-oil",
    area: "cleansing",
    title: "柔润温和沐浴油",
    englishName: "Gentle Shower Oil",
    subtitle: "50% 高含量鳄梨油的无皂基沐浴油",
    overview: [
      "50% 高含量鳄梨油沐浴油，遇水转化为乳状",
      "无皂基配方，温和清洁同时滋养肌肤",
      "冷工艺制作，保留植物油脂活性",
    ],
    functions: ["温和滋养清洁", "无皂基配方", "浴后柔润不紧绷"],
    keyIngredients: ["鳄梨油", "胡萝卜提取物", "生育酚", "甘油保湿体系"],
    challenges: ["遇水转乳的质地表现", "冷配工艺的体系均一", "清洁力与滋养力的平衡"],
    texture: ["油状液体", "遇水乳化呈奶白色"],
    applications: ["身体清洁", "敏感肌沐浴油"],
  },
  {
    id: "argan-hair-oil",
    area: "hair",
    title: "阿甘油护发精华油",
    englishName: "Argan Oil Hair Serum",
    subtitle: "一款阿甘油复配硅油的修护护发精华油",
    overview: [
      "硅油基护发精华油，添加阿甘油与亚麻籽油",
      "修护受损发丝，柔顺毛躁",
      "角鲨烷滋养发丝，提升光泽",
      "玫瑰精油调香，使用感愉悦",
    ],
    functions: ["修护受损发丝", "柔顺毛躁", "提升发丝光泽"],
    keyIngredients: ["阿甘油", "亚麻籽油", "橄榄角鲨烷"],
    challenges: [
      "植物油与硅油的兼容稳定",
      "修护力与清爽感的平衡",
      "精油调香的体系稳定",
      "全油体系的氧化稳定",
    ],
    texture: ["透明油状液体", "轻盈顺滑不黏腻"],
    applications: ["头发护理", "护发精华油"],
  },
  {
    id: "sunscreen",
    area: "sun",
    title: "SPF50 高倍防晒霜",
    englishName: "SPF50 High-Protection Sunscreen",
    subtitle: "一款物化结合的高倍户外防晒面霜",
    overview: [
      "高倍防晒面霜，SPF50+、PA++++ 防护等级",
      "化学 + 物理防晒剂复配，全波段广谱防护",
      "4D 玻尿酸保湿，尿囊素舒缓防晒刺激",
      "防水成膜体系，提升持妆力",
    ],
    functions: ["高倍广谱防晒", "防水持妆", "保湿舒缓"],
    keyIngredients: [
      "二氧化钛",
      "亚甲基双-苯并三唑基四甲基丁基苯酚",
      "对苯二亚甲基二樟脑磺酸",
      "二乙氨基羟苯甲酰基苯甲酸己酯",
      "双-乙基己氧苯酚甲氧苯基三嗪",
      "乙基己基三嗪酮",
      "4D HA 多重透明质酸钠",
    ],
    challenges: [
      "物理防晒剂的分散与防泛白",
      "高含量防晒剂的溶解与稳定",
      "高倍防晒力与清爽肤感的平衡",
      "防水成膜与配方稳定性",
    ],
    texture: ["细腻乳霜", "成膜快，轻微泛白"],
    applications: ["面部防晒", "高倍户外防护"],
  },
];
