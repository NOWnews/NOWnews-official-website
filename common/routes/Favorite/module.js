export const LOAD_FAVORITE_REQUEST = 'LOAD_FAVORITE_REQUEST';
export const LOAD_FAVORITE_SUCCESS = 'LOAD_FAVORITE_SUCCESS';
export const LOAD_FAVORITE_FAILURE = 'LOAD_FAVORITE_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadFavoriteList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_FAVORITE_REQUEST });
    /* TODO 先暫時用 indexpage 當 api 代替 */
    return axios.get(`${protocol}://${host}/interests`)
    .then(res => {
      dispatch({
        type: LOAD_FAVORITE_SUCCESS,
        payload: res.data.carousels,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_FAVORITE_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function favoritePage (state = initialState, action) {
  switch (action.type) {
    case LOAD_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_FAVORITE_SUCCESS:
      return {
        ...state,
        newsList: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        newsList: []
      };
    default:
      return state;
  }
}

export const selectFavoritePage = state => state.favoritePage;
