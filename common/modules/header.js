import { createSelector } from 'reselect';
import formatPhoto from '../../lib/format/photo';

export const LOAD_HEADER_REQUEST = 'LOAD_HEADER_REQUEST';
export const LOAD_HEADER_SUCCESS = 'LOAD_HEADER_SUCCESS';
export const LOAD_HEADER_FAILURE = 'LOAD_HEADER_FAILURE';

const initialState = {
  lastFetched: null,
  isLoading: false,
  news: [],
  error: null,
  menus: [],
  currentMenu: {},
  ads: {},
  idleNews: []
};

export function loadHeader (url) {
  return (dispatch, getState, { axios }) => {
    // 有抓過資料就跳過，不重複呼叫（沒有頁數問題）
    const { lastFetched } = getState().header;
    if (lastFetched !== null) {
      return Promise.resolve();
    }
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_HEADER_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/menus`),
      axios.get(`${apiServ}/instant?limit=9`),
      axios.get(`${apiServ}/promote/common`)
    ]).then(([menus, instant, ad]) => {
      dispatch({
        type: LOAD_HEADER_SUCCESS,
        payload: [menus.data, instant.data, ad.data],
        meta: {
          lastFetched: Date.now()
        }
      });
    })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_HEADER_FAILURE}: `, error);
        dispatch({
          type: LOAD_HEADER_FAILURE,
          payload: error.response ? error.response.data : error.message,
          error: true
        });
      });
  };
}

export default function header (state = initialState, action) {
  switch (action.type) {
    case LOAD_HEADER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_HEADER_SUCCESS:
      const [ menus, instant, ads ] = action.payload;
      return {
        ...state,
        ads,
        menus,
        news: instant && instant.newsList || [],
        idleNews: instant && instant.newsList || [],
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_HEADER_FAILURE:
      return { ...state,
        error: action.payload.message,
        menus: [],
        news: [],
        idleNews: [],
        isLoading: false
      };
    default:
      return state;
  }
}

const getHeader = (state) => state.header;
const getImgServ = (state) => state.sourceRequest.imgServ;

const formatFooterAds = createSelector(
  [getHeader], ({ ads }) => {
    return {
      footer: ads.footer,
      grabBag: ads.grabBag
    };
  }
);

const formatMarquee = createSelector(
  [getHeader, getImgServ], ({ ads, news }, imgServ) => {
    const result = {
      ads: {
        instant: ads.instant || [],
        grabBag: ads.grabBag || []
      },
      news: news.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto, imgServ)
        };
      })
    };
    return result;
  }
);

const formatObjectMenu = createSelector(
  [getHeader], ({ menus }) => {
    let result = {};
    menus.forEach((menu) => {
      result[menu._id] = menu;
    });
    return result;
  }
);

const formatIdleNews = createSelector(
  [getHeader], ({ idleNews, news }) => {
    return idleNews;
  }
);

export const selectFooterAds = state => formatFooterAds(state);
export const selectMenus = state => state.header.menus;
export const selectMarquee = state => formatMarquee(state);
export const selectObjectMenu = state => formatObjectMenu(state);
export const selectIdleNews = state => formatIdleNews(state);

