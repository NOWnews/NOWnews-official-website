export const LOAD_VIDEO_REQUEST = 'LOAD_VIDEO_REQUEST';
export const LOAD_VIDEO_SUCCESS = 'LOAD_VIDEO_SUCCESS';
export const LOAD_VIDEO_FAILURE = 'LOAD_VIDEO_FAILURE';

const initialState = {
  currentCategory: '',
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
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_VIDEO_REQUEST });
    const getListUrl = (categoryName === 'instant') ? 'instant?type=VIDEO&' : `cat/${categoryName}/video?`;
    return Promise.all([
      axios.get(`${protocol}://${host}/menus`),
      axios.get(`${protocol}://${host}/${getListUrl}page=${page}&limit=9`)
    ]).then(([menu, video]) => {
      const { newsList, pageData } = video.data;
      dispatch({
        type: LOAD_VIDEO_SUCCESS,
        payload: {
          currentCategory: categoryName,
          menus: menu.data,
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
        payload: error
      });
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
      const { currentCategory, menus, newsList, pageData } = action.payload;
      return {
        ...state,
        currentCategory,
        menus,
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
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectVideoPage = state => state.videoPage;
