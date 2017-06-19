const defaultAdType = 'social';

const definedMapping = {
  politic: 'political', // 政治
  finance: 'finance', // 財經
  life: 'life', // 生活
  society: 'social', // 社會
  sport: 'sport', // 運動
  entertainment: 'entertainment', // 娛樂
  global: 'international', // 國際
  china: 'china', // 大陸
  novelty: 'novel', // 新奇
  fashion: 'article', // 消費
  taiwanhot: 'place', // 地方
  ppc: 'ppc', // 北北基
  tcm: 'tcm', // 桃竹苗
  cct: 'cct', // 中彰投
  ycn: 'ycn', // 雲嘉南
  kpp: 'kpp', // 高屏澎
  yhd: 'yhd', // 宜花東
  km: 'km', // 金馬
  eworld: 'tec' // 科技
};

const getAdType = (mainCategory, childCategory) => {
  const categoryName = (childCategory && mainCategory === 'place') ? childCategory : mainCategory;
  const adType = (definedMapping[categoryName]) ? definedMapping[categoryName] : defaultAdType;
  return adType;
};

export default getAdType;
