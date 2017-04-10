import axios from 'axios';

export const callApi = (apiServ, menuId, newsId, pathname, search) => {
  axios.put(`${apiServ}/pageviews`, {
    menuId,
    newsId,
    queryString: search.substring(1),
    url: pathname
  });
};

export const init = (apiServ, pathname, search, state) => {
  let menuId, newsId;
  let { currentNews, categoryPage } = state;

  if (/^\/cat\/[\d|a-zA-Z0-9]+$/.test(pathname)) {
    // 分類頁，以母分類為主
    let news = categoryPage.newsList[0];
    menuId = news && news.MainMenu.id;
  } else if (/^\/news\/[0-9]{8}\/[\d|0-9]+$/.test(pathname)) {
    // 新聞內頁
    let news = currentNews.data[0];
    menuId = news.MainMenu.id;
    newsId = news.id;
  } else if (/^\/preview+$/.test(pathname)) {
    return false;
  }
  callApi(apiServ, menuId, newsId, search, pathname);
};

