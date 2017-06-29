export const LOAD_VIDEO_REQUEST = 'LOAD_VIDEO_REQUEST';
export const LOAD_VIDEO_SUCCESS = 'LOAD_VIDEO_SUCCESS';
export const LOAD_VIDEO_FAILURE = 'LOAD_VIDEO_FAILURE';
export const NEXT_VIDEO_NEWS = 'NEXT_VIDEO_NEWS';
export const SELECT_VIDEO_NEWS = 'SELECT_VIDEO_NEWS';

const initialState = {
  currentCategory: '',
  currentMenu: {},
  error: null,
  hotNewsList: [],
  isLoading: false,
  lastFetched: null,
  newsList: [],
  selectedIndex: 0,
  pageData: {}
};

export function loadVideoList (categoryName, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_VIDEO_REQUEST });
    const getListUrl = (categoryName === 'instant') ? 'instant?type=VIDEO&' : `cat/${categoryName}/video?`;
    return axios.get(`${apiServ}/${getListUrl}page=${page}&limit=9`)
      .then((videoSrc) => {
        const { newsList, pageData, menu } = videoSrc.data;
        dispatch({
          type: LOAD_VIDEO_SUCCESS,
          payload: {
            currentCategory: categoryName,
            currentMenu: menu || {},
            newsList,
            pageData
          },
          meta: {
            lastFetched: Date.now()
          }
        });
      }).catch(error => {
        dispatch({
          type: LOAD_VIDEO_FAILURE,
          payload: error.response ? error.response.data : error.message
        });
      });
  };
}

export function nextVideo () {
  return (dispatch) => {
    dispatch({ type: NEXT_VIDEO_NEWS });
  };
}

export function selectVideo (selectedIndex) {
  return (dispatch) => {
    dispatch({
      type: SELECT_VIDEO_NEWS,
      payload: selectedIndex
    });
  };
}

export default function videoPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_VIDEO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_VIDEO_SUCCESS:
      const { currentMenu, currentCategory, newsList, pageData } = action.payload;
      return {
        ...state,
        currentCategory,
        currentMenu,
        newsList,
        pageData,
        selectedIndex: 0,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_VIDEO_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        newsList: [],
        isLoading: false
      };
    case NEXT_VIDEO_NEWS:
      return {
        ...state,
        selectedIndex: state.selectedIndex + 1
      };
    case SELECT_VIDEO_NEWS:
      return {
        ...state,
        selectedIndex: action.payload
      };
    default:
      return state;
  }
}

export const selectVideoPage = state => state.videoPage;
