export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

const initialState = {
  currentMenu: {},
  error: null,
  hotNewsList: [],
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadCategoryList (categoryName, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_CATEGORY_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/cat/${categoryName}?page=${page}&limit=15`),
      axios.get(`${apiServ}/hot/${categoryName}`)
    ]).then(([categoryNewsList, hotNewsList]) => {
      const { menu, newsList, pageData } = categoryNewsList.data;
      dispatch({
        type: LOAD_CATEGORY_SUCCESS,
        payload: {
          hotNewsList: hotNewsList.data,
          currentMenu: menu,
          newsList,
          pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_CATEGORY_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function categoryPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_CATEGORY_SUCCESS:
      let { currentMenu, hotNewsList, newsList, pageData } = action.payload;
      return {
        ...state,
        currentMenu,
        newsList,
        pageData,
        hotNewsList,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectCategoryPage = state => state.categoryPage;
