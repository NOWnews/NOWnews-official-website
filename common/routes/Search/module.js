export const LOAD_SEARCH_REQUEST = 'LOAD_SEARCH_REQUEST';
export const LOAD_SEARCH_SUCCESS = 'LOAD_SEARCH_SUCCESS';
export const LOAD_SEARCH_FAILURE = 'LOAD_SEARCH_FAILURE';
export const PASS_SEARCH_REQUEST = 'PASS_SEARCH_REQUEST';

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
    dispatch({ type: PASS_SEARCH_REQUEST });
    const { apiServ } = getState().sourceRequest;

    let apiCall = [axios.get(`${apiServ}/tag/hot`)];
    if (keyword) {
      apiCall.push(axios.get(`${apiServ}/search/${keyword}?page=${page}&timeRange=${timeRange}`));
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
        payload: error,
        error: true
      });
    });
  };
}

export default function searchPage (state = initialState, action) {
  switch (action.type) {
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
    case PASS_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: false,
        list: []
      };
    default:
      return state;
  }
}

export const selectSearchPage = state => state.searchPage;
