import isomorphicCookie from 'isomorphic-cookie';
import { createSelector } from 'reselect';
import { formatPhoto, formatPreviewPhoto } from '../../../lib/format/photo';
export const CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE';
export const LOAD_NEWS_REQUEST = 'LOAD_NEWS_REQUEST';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_FAILURE = 'LOAD_NEWS_FAILURE';
export const LOAD_PREVIEW_REQUEST = 'LOAD_PREVIEW_REQUEST';
export const LOAD_PREVIEW_SUCCESS = 'LOAD_PREVIEW_SUCCESS';
export const LOAD_PREVIEW_FAILURE = 'LOAD_PREVIEW_FAILURE';
export const SHOW_FIXED_HEADER = 'SHOW_FIXED_HEADER';
export const WARM_NEWS_REQUEST = 'WARM_NEWS_REQUEST';
export const WARM_NEWS_SUCCESS = 'WARM_NEWS_SUCCESS';
export const WARM_NEWS_FAILURE = 'WARM_NEWS_FAILURE';

const canUseDOM = !!(typeof window !== 'undefined' && window.document);
const initialState = {
  ads: {},
  data: null,
  error: null,
  fontSize: null,
  isLoading: false,
  isSSRAndInit: false,
  lastFetched: null,
  showFixedHeader: false,
  topics: []
};

export const changeFontSize = (fontSize) => {
  return (dispatch) => {
    isomorphicCookie.save('NOW_fontSize', fontSize, { secure: false });
    dispatch({ type: CHANGE_FONT_SIZE, payload: fontSize });
  };
};

export const loadNews = (sn, fontSize) => {
  return (dispatch, getState, { axios }) => {
    if (!sn) {
      return Promise.resolve();
    }

    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWS_REQUEST, payload: { fontSize } });

    // 將 scroll 置頂
    if (canUseDOM) {
      window.document.body.scrollTop = 0;
    }

    return Promise.all([
      axios.get(`${apiServ}/news/${sn}`),
      axios.get(`${apiServ}/news/${sn}/nextandprev`),
      axios.get(`${apiServ}/news/${sn}/relations`),
      axios.get(`${apiServ}/specialtopics?limit=6`),
      axios.get(`${apiServ}/promote/news`)
    ]).then(([news, nextandprev, relations, topic, ads]) => {
      let { next, prev } = nextandprev.data;
      let result = news.data;

      dispatch({
        type: LOAD_NEWS_SUCCESS,
        payload: {
          ads: ads.data,
          news: {
            ...result,
            next,
            prev,
            relations: relations.data
          },
          topics: topic.data.specialTopics
        },
        meta: {
          lastFetched: Date.now()
        }
      });
      if (canUseDOM && window.twttr) {
        window.twttr.widgets.load();
      }
    }).catch(error => {
      console.error(`Error in reducer that handles ${LOAD_NEWS_FAILURE}: `, error);
      dispatch({
        type: LOAD_NEWS_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
    });
  };
};

export const loadPreview = (redisKey) => {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_PREVIEW_REQUEST });
    return axios.get(`${apiServ}/previews/${redisKey}`)
      .then(res => {
        if (res.data === null) {
          return dispatch({
            type: LOAD_PREVIEW_FAILURE,
            payload: 'redisKey 過期找不到相關資料'
          });
        }
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
          payload: error.response ? error.response.data : error.message
        });
      });
  };
};

export const onWarm = (newsId, menuId) => {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    const userId = isomorphicCookie.load('NOW_member');

    dispatch({ type: WARM_NEWS_REQUEST });
    return axios.put(`${apiServ}/temperatures`, {
      newsId,
      menuId,
      userId,
      url: window.location.pathname
    }).then((result) => {
      dispatch({
        type: WARM_NEWS_SUCCESS,
        meta: {
          lastFetched: Date.now()
        }
      });
      window.alert('感受到您的溫暖支持囉！');
    }).catch(error => {
      dispatch({
        type: WARM_NEWS_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
      window.alert('感謝您對這篇新聞的支持，您已經加過溫暖囉！');
    });
  };
};

export const showFixedHeader = (showHeader) => {
  return (dispatch) => {
    dispatch({ type: SHOW_FIXED_HEADER, payload: showHeader });
  };
};

export default function currentNews (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      };
    case LOAD_NEWS_REQUEST:
      return {
        ...state,
        data: null,
        fontSize: action.payload.fontSize,
        error: null,
        isLoading: true
      };
    // case LOAD_MORE_NEWS_REQUEST:
    case LOAD_PREVIEW_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case LOAD_NEWS_SUCCESS:
      const { ads, news, topics } = action.payload;
      return {
        ...state,
        ads,
        data: news,
        hasMore: news.template === 'DEFAULT' && news && !!news.next.sn,
        isLoading: false,
        isSSRAndInit: !canUseDOM,
        lastFetched: action.meta && action.meta.lastFetched,
        topics
      };
    case LOAD_NEWS_FAILURE:
    case LOAD_PREVIEW_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case LOAD_PREVIEW_SUCCESS:
      return {
        ...state,
        data: action.payload,
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

// For Selecter
const getCurrentNews = (state) => state.currentNews;
const getImgServ = (state) => state.sourceRequest.imgServ;
const formatCurrentNews = createSelector(
  [getCurrentNews, getImgServ], ({ data: news, ...currentNews }, imgServ) => {
    if (news === null) {
      return { ...currentNews, data: null };
    }
    const result = {
      ...currentNews,
      data: {
        ...news,
        MainPhoto: formatPhoto(news.MainPhoto, imgServ),
        Photos: news.Photos.map(photo => formatPhoto(photo, imgServ)),
        relations: news.relations.map((relationNews) => {
          return {
            ...relationNews,
            MainPhoto: formatPhoto(relationNews.MainPhoto, imgServ)
          };
        })
      }
    };
    return result;
  }
);

const formatPreviewNews = createSelector(
  [getCurrentNews, getImgServ], ({ data: news, ...previewNews }, imgServ) => {
    if (news === null) {
      return { ...previewNews, data: null };
    }
    const result = {
      ...previewNews,
      data: {
        ...news,
        MainPhoto: formatPreviewPhoto(news.MainPhoto, imgServ),
        Photos: news.Photos ? news.Photos.map(photo => formatPreviewPhoto(photo, imgServ)) : []
      }
    };
    return result;
  }
);

export const selectCurrentNews = state => formatCurrentNews(state);
export const selectPreviewNews = state => formatPreviewNews(state);
