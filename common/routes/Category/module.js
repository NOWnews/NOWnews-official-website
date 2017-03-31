export const LOAD_NEWSLIST_REQUEST = 'LOAD_NEWSLIST_REQUEST';
export const LOAD_NEWSLIST_SUCCESS = 'LOAD_NEWSLIST_SUCCESS';
export const LOAD_NEWSLIST_FAILURE = 'LOAD_NEWSLIST_FAILURE';

const initialState = {
  error: null,
  hotNewsList: [],
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadCateogryList (categoryName, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWSLIST_REQUEST });
    return Promise.all([
      axios.get(`${protocol}://${host}/cat/${categoryName}`),
      axios.get(`${protocol}://${host}/hot/${categoryName}`)
    ]).then(([categoryNewsList, hotNewsList]) => {
      dispatch({
        type: LOAD_NEWSLIST_SUCCESS,
        payload: {
          hotNewsList: hotNewsList.data,
          newsList: categoryNewsList.data.newsList,
          pageData: categoryNewsList.data.pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_NEWSLIST_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function categoryPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWSLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_NEWSLIST_SUCCESS:
      let { hotNewsList, newsList, pageData } = action.payload;
      return {
        ...state,
        newsList,
        pageData,
        hotNewsList,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_NEWSLIST_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectCategoryPage = state => state.categoryPage;
