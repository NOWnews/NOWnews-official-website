import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';
import uuidV4 from 'uuid/v4';

export const callApi = (apiServ, menuId, newsId, pathname, search, headers) => {
  const userId = isomorphicCookie.load('NOW_member');
  let cookie = isomorphicCookie.load('NOW_personalize');
  if (!cookie) {
    cookie = uuidV4();
    isomorphicCookie.save('NOW_personalize', cookie, { secure: false });
  }
  axios.put(`${apiServ}/pageviews`, {
    cookie,
    menuId,
    newsId,
    queryString: search.substring(1),
    url: pathname,
    userId
  }, { headers });
};

export const trackFBViewContent = (news) => {
  window.viewContentPayload = {
    url: window.location.href,
    cate: news.MainMenu.name,
    newsId: news.sn,
    author: news.newsBy,
    title: news.title
  };
  window.dataLayer.push({'event': 'trackFBViewContent'});
};

export const trackCode = (news) => {
  if (news) {
    trackFBViewContent(news);
  }
  const { pathname, search } = window.location;
  window._comscore.push({ c1: '2', c2: '11473067' });
  window.dataLayer.push({'event': 'trackPageView'});
  window.ga('set', 'page', `${pathname}${search}`);
  window.ga('send', 'pageview');
};

export const init = (apiServ, pathname, search, state, headers) => {
  let menuId, newsId;
  let { currentNews, categoryPage, videoPage } = state;
  let newsPage = null;
  let currentMenu = null;
  if (/^\/cat\/[\d|a-zA-Z0-9]+$/.test(pathname)) {
    // 分類頁
    currentMenu = categoryPage.currentMenu;
    menuId = currentMenu._id;
    window.ga('set', 'dimension1', currentMenu.name);
  } else if (/^\/news\/[0-9]{8}\/[\d|0-9]+$/.test(pathname)) {
    // 新聞內頁
    let news = currentNews.data[0];
    newsPage = news;
    if (!news) {
      return;
    }
    menuId = news.MainMenu._id;
    newsId = news._id;
    window.ga('set', 'dimension1', news.MainMenu.name);
    window.ga('set', 'dimension2', news.type);
  } else if (/^\/video\/[\d|a-zA-Z0-9]+$/.test(pathname)) {
    // 影音分類頁
    currentMenu = videoPage.currentMenu;
    menuId = currentMenu._id;
    window.ga('set', 'dimension1', currentMenu.name);
    window.ga('set', 'dimension2', 'VIDEO');
  } else if (/^\/preview+$/.test(pathname)) {
    // 預覽頁跳過
    return false;
  }

  // 第三方追蹤碼
  trackCode(newsPage);

  // 自家追蹤碼
  callApi(apiServ, menuId, newsId, pathname, search, headers);
};
