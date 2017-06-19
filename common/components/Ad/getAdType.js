const defaultAdType = 'social';

const definedMapping = {
  political: 'political', // 政治
  finance: 'finance', // 財經
  life: 'life', // 生活
  social: 'social', // 社會
  sport: 'sport', // 運動
  entertainment: 'entertainment', // 娛樂
  international: 'international', // 國際
  china: 'china', // 大陸
  novel: 'novel', // 新奇
  article: 'article', // 消費
  place: 'place', // 地方
  ppc: 'ppc', // 北北基
  tcm: 'tcm', // 桃竹苗
  cct: 'cct', // 中彰投
  ycn: 'ycn', // 雲嘉南
  kpp: 'kpp', // 高屏澎
  yhd: 'yhd', // 宜花東
  km: 'km', // 金馬
  tec: 'tec' // 科技
};

const getAdType = (mainCategory, childCategory) => {
  const categoryName = (childCategory && mainCategory === 'place') ? childCategory : mainCategory;
  const adType = (definedMapping[categoryName]) ? definedMapping[categoryName] : defaultAdType;
  return adType;
};

export default getAdType;
