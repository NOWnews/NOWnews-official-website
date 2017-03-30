export const CHANGE_SLIDE_INDEX = 'CHANGE_SLIDE_INDEX';
export const LOAD_NEWSLIST_REQUEST = 'LOAD_NEWSLIST_REQUEST';
export const LOAD_NEWSLIST_SUCCESS = 'LOAD_NEWSLIST_SUCCESS';
export const LOAD_NEWSLIST_FAILURE = 'LOAD_NEWSLIST_FAILURE';

const initialState = {
  error: null,
  hotNewsList: [],
  isLoading: false,
  lastFetched: null,
  newsList: [],
  slideIndex: 0,
  pageData: {}
};

export function changeSlideIndex (newSlideIndex) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: CHANGE_SLIDE_INDEX, payload: newSlideIndex });
  };
}

export function loadCateogryList (categoryName, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWSLIST_REQUEST });
    return Promise.all([
      axios.get(`${protocol}://${host}/cat/${categoryName}`),
      axios.get(`${protocol}://${host}/cat/${categoryName}`) // hot 那邊還沒上先用 cat
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
    case CHANGE_SLIDE_INDEX:
      return {
        ...state,
        slideIndex: action.payload
      };
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
        isLoading: false,
        slideIndex: 0
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
