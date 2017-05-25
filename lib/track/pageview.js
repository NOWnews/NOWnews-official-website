import axios from 'axios';
import isomorphicCookie from 'isomorphic-cookie';
import uuidV4 from 'uuid/v4';

export const callApi = (apiServ, menuId, newsId, pathname, search) => {
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
  });
};

export const init = (apiServ, pathname, search, state) => {
  let menuId, newsId;
  let { currentNews, categoryPage, videoPage } = state;

  if (/^\/cat\/[\d|a-zA-Z0-9]+$/.test(pathname)) {
    // 分類頁，以母分類為主
    let news = categoryPage.newsList[0];
    menuId = news && news.MainMenu.id;
  } else if (/^\/news\/[0-9]{8}\/[\d|0-9]+$/.test(pathname)) {
    // 新聞內頁
    let news = currentNews.data[0];
    menuId = news.MainMenu.id;
    newsId = news.id;
  } else if (/^\/video\/[\d|a-zA-Z0-9]+$/.test(pathname)) {
    // 分類頁，以母分類為主
    let news = videoPage.newsList[0];
    menuId = news && news.MainMenu.id;
  } else if (/^\/preview+$/.test(pathname)) {
    return false;
  }
  callApi(apiServ, menuId, newsId, pathname, search);
};

