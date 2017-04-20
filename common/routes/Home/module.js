export const LOAD_NEWSLIST_REQUEST = Symbol('LOAD_NEWSLIST_REQUEST');
export const LOAD_NEWSLIST_SUCCESS = Symbol('LOAD_NEWSLIST_SUCCESS');
export const LOAD_NEWSLIST_FAILURE = Symbol('LOAD_NEWSLIST_FAILURE');

const initialState = {
  carousels: [],
  videos: [],
  specialChannels: [],
  specialTopics: [],
  lastFetched: null,
  isLoading: false,
  error: null
};

export function loadHomeList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWSLIST_REQUEST });
    return axios.get(`${protocol}://${host}/indexpage`)
    .then(res => {
      dispatch({
        type: LOAD_NEWSLIST_SUCCESS,
        payload: res.data,
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

export default function homePage (state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWSLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_NEWSLIST_SUCCESS:
      let { carousels, specialChannels, specialTopics, videos } = action.payload;
      return {
        ...state,
        carousels,
        videos,
        specialChannels,
        specialTopics,
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

export const selectHomePage = state => state.homePage;
