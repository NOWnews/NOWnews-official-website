//  設定分類頁 dfp
const defaultAdType = 'life';

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
  fashion: 'consu', // 消費
  local: 'place', // 地方
  nationalindex: 'place', // 地方總覽
  ppc: 'ppc', // 北北基
  tcm: 'tcm', // 桃竹苗
  cct: 'cct', // 中彰投
  ycn: 'ycn', // 雲嘉南
  kpp: 'kpp', // 高屏澎
  yhd: 'yhd', // 宜花東
  km: 'km', // 金馬
  eworld: 'tech' // 科技
};

export const fromCurrentOne = (mainMenu, childMenu) => {
  let categoryName = mainMenu.categoryName;

  // 正確取得地方新聞子分類
  if (categoryName === 'local' && childMenu) {
    categoryName = childMenu.categoryName;
  }

  const adType = (definedMapping[categoryName]) ? definedMapping[categoryName] : defaultAdType;
  return adType;
};

export const fromMenus = (mainMenu, Menus) => {
  let categoryName = mainMenu.categoryName;

  // 正確取得地方新聞子分類
  if (categoryName === 'local' && Menus) {
    Menus.forEach((menu) => {
      if (menu.ParentId === mainMenu._id && menu.categoryName !== 'nationalindex') {
        categoryName = menu.categoryName;
      }
    });
  }

  const adType = (definedMapping[categoryName]) ? definedMapping[categoryName] : defaultAdType;
  return adType;
};
