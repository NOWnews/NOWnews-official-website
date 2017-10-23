import { createSelector } from 'reselect';
import formatPhoto from '../../../lib/format/photo';

export const LOAD_KEYWORDS_SUCCESS = 'LOAD_KEYWORDS_SUCCESS';
export const LOAD_SEARCH_REQUEST = 'LOAD_SEARCH_REQUEST';
export const LOAD_SEARCH_SUCCESS = 'LOAD_SEARCH_SUCCESS';
export const LOAD_SEARCH_FAILURE = 'LOAD_SEARCH_FAILURE';

export const initialState = {
  error: null,
  hotKeywords: [],
  isLoading: false,
  lastFetched: null,
  list: [],
  pageData: {},
  keyword: '',
  timeRange: 'lastWeek'
};

export function loadSearchList ({ keyword = '', page = 1, timeRange }) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_SEARCH_REQUEST, keyword, timeRange });
    const { apiServ } = getState().sourceRequest;
    let apiCall = [axios.get(`${apiServ}/tag/hot`)];
    if (keyword) {
      const encodeKeyword = encodeURI(keyword);
      const url = `${apiServ}/search/${encodeKeyword}?page=${page}&timeRange=${timeRange}`;
      apiCall.push(axios.get(url));
    }
    return Promise.all(apiCall).then(([tag, news]) => {
      const { pageData = {}, newsList = [] } = (news && news.data) || {};
      dispatch({
        type: LOAD_SEARCH_SUCCESS,
        payload: {
          pageData,
          newsList,
          tags: tag.data
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_SEARCH_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
    });
  };
}

export function loadHotKeywords () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOAD_SEARCH_REQUEST });
    const { apiServ } = getState().sourceRequest;
    return axios.get(`${apiServ}/tag/hot`).then((tag) => {
      dispatch({
        type: LOAD_KEYWORDS_SUCCESS,
        payload: {
          tags: tag.data
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_SEARCH_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
    });
  };
}

export default function searchPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_KEYWORDS_SUCCESS:
      return {
        ...state,
        hotKeywords: action.payload.tags,
        isLoading: false
      };
    case LOAD_SEARCH_REQUEST:
      return {
        ...state,
        keyword: action.keyword,
        timeRange: action.timeRange,
        isLoading: true,
        error: null
      };
    case LOAD_SEARCH_SUCCESS:
      const { newsList, pageData, tags } = action.payload;
      return {
        ...state,
        hotKeywords: tags,
        lastFetched: action.meta.lastFetched,
        list: newsList,
        isLoading: false,
        pageData
      };
    case LOAD_SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}

const getImgServ = (state) => state.sourceRequest.imgServ;
const getSearchPage = (state) => state.searchPage;
const formatSearchPage = createSelector(
  [getSearchPage, getImgServ], ({ list, ...searchPage }, imgServ) => {
    const result = {
      ...searchPage,
      list: list.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto, imgServ)
        };
      })
    };
    return result;
  }
);
export const selectSearchPage = state => formatSearchPage(state);
export const selectHotKeywords = state => state.searchPage.hotKeywords;
