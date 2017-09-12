import { createSelector } from 'reselect';
import formatPhoto from '../../../lib/format/photo';

export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

const initialState = {
  columnSpecialChannel: null,
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
      const { menu, newsList, pageData, columnSpecialChannel } = categoryNewsList.data;
      dispatch({
        type: LOAD_CATEGORY_SUCCESS,
        payload: {
          columnSpecialChannel,
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
        payload: error.response ? error.response.data : error.message
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
      let { columnSpecialChannel, currentMenu, hotNewsList, newsList, pageData } = action.payload;
      return {
        ...state,
        columnSpecialChannel,
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

// selecter
const getCategoryPage = (state) => state.categoryPage;
const formatCategoryPage = createSelector(
  [getCategoryPage], ({ hotNewsList, newsList, ...categoryPage }) => {
    const result = {
      ...categoryPage,
      hotNewsList: hotNewsList.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto)
        };
      }),
      newsList: newsList.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto)
        };
      })
    };
    return result;
  }
);
export const selectCategoryPage = state => formatCategoryPage(state);
