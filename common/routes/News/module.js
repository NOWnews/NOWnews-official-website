import isomorphicCookie from 'isomorphic-cookie';
import { callApi as pvCallApi } from '../../../lib/track/pageview';
export const CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE';
export const CHANGE_NEWS_TITLE = 'CHANGE_NEWS_TITLE';
export const LOAD_NEWS_REQUEST = 'LOAD_NEWS_REQUEST';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_MORE_NEWS_SUCCESS = 'LOAD_MORE_NEWS_SUCCESS';
export const LOAD_NEWS_FAILURE = 'LOAD_NEWS_FAILURE';
export const LOAD_PREVIEW_REQUEST = 'LOAD_PREVIEW_REQUEST';
export const LOAD_PREVIEW_SUCCESS = 'LOAD_PREVIEW_SUCCESS';
export const LOAD_PREVIEW_FAILURE = 'LOAD_PREVIEW_FAILURE';
export const SHOW_FIXED_HEADER = 'SHOW_FIXED_HEADER';
const canUseDOM = !!(typeof window !== 'undefined' && window.document);

const initialState = {
  data: [],
  error: null,
  fontSize: isomorphicCookie.load('fontSize') || 16,
  hasMore: false,
  isLoading: false,
  isSSRAndInit: false,
  lastFetched: null,
  newsTitle: '',
  showFixedHeader: false
};

export const changeFontSize = (fontSize) => {
  return (dispatch) => {
    isomorphicCookie.save('fontSize', fontSize, { secure: false });
    dispatch({ type: CHANGE_FONT_SIZE, payload: fontSize });
  };
};

export const changeNewsTitle = (newsTitle) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_NEWS_TITLE, payload: newsTitle });
  };
};

export const loadNews = (sn, isLoadMore = false) => {
  return (dispatch, getState, { axios }) => {
    const state = getState();
    const { protocol, host } = state.sourceRequest;
    const apiServ = `${protocol}://${host}`;
    dispatch({ type: LOAD_NEWS_REQUEST });

    // 第一次 SPA 完將 scroll 置頂
    if (canUseDOM && !isLoadMore) {
      window.document.body.scrollTop = 0;
    }

    return Promise.all([
      axios.get(`${apiServ}/news/${sn}`),
      axios.get(`${apiServ}/news/${sn}/nextandprev`),
      axios.get(`${apiServ}/news/${sn}/relations`)
    ]).then(([news, nextandprev, relations]) => {
      let { next, prev } = nextandprev.data;
      let result = news.data;

      dispatch({
        type: isLoadMore ? LOAD_MORE_NEWS_SUCCESS : LOAD_NEWS_SUCCESS,
        payload: { ...result, next, prev, relations: relations.data },
        meta: {
          lastFetched: Date.now()
        }
      });

      // 內文無限下滑時，載入新的新聞也要累積 PV 數
      if (isLoadMore) {
        const { pathname, search } = window.location;
        let menuId = result.MainMenu.id;
        let newsId = result.id;
        pvCallApi(apiServ, menuId, newsId, pathname, search);
      }
    }).catch(error => {
      console.error(`Error in reducer that handles ${LOAD_NEWS_FAILURE}: `, error);
      dispatch({
        type: LOAD_NEWS_FAILURE,
        payload: error,
        error: true
      });
    });
  };
};

export const loadPreview = (redisKey) => {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_PREVIEW_REQUEST });
    return axios.get(`${protocol}://${host}/previews/${redisKey}`)
      .then(res => {
        dispatch({
          type: LOAD_PREVIEW_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_PREVIEW_FAILURE}: `, error);
        dispatch({
          type: LOAD_PREVIEW_FAILURE,
          payload: error,
          error: true
        });
      });
  };
};

export const showFixedHeader = (showHeader) => {
  return (dispatch) => {
    dispatch({ type: SHOW_FIXED_HEADER, payload: showHeader });
  };
};

export default function currentNews (state = initialState, action) {
  // 暫時解，初始化時有時 fontSize 會變成 undefined
  state.fontSize = isomorphicCookie.load('fontSize') || 16;
  switch (action.type) {
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      };
    case CHANGE_NEWS_TITLE:
      return {
        ...state,
        newsTitle: action.payload
      };
    case LOAD_NEWS_REQUEST:
    case LOAD_PREVIEW_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case LOAD_MORE_NEWS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        hasMore: !!action.payload.next.sn,
        isLoading: false,
        isSSRAndInit: false,
        lastFetched: action.meta.lastFetched
      };
    case LOAD_NEWS_SUCCESS:
      return {
        ...state,
        data: [action.payload],
        hasMore: !!action.payload.next.sn,
        isLoading: false,
        isSSRAndInit: !canUseDOM,
        lastFetched: action.meta.lastFetched,
        newsTitle: action.payload.title
      };
    case LOAD_NEWS_FAILURE:
    case LOAD_PREVIEW_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOAD_PREVIEW_SUCCESS:
      return {
        ...state,
        data: [action.payload],
        isLoading: false,
        lastFetched: action.meta.lastFetched
      };
    case SHOW_FIXED_HEADER:
      return {
        ...state,
        showFixedHeader: action.payload
      };
    default:
      return state;
  }
}

export const selectCurrentNews = state => state.currentNews;
