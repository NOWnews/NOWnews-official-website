export const LOAD_NEWSLIST_REQUEST = 'LOAD_NEWSLIST_REQUEST';
export const LOAD_NEWSLIST_SUCCESS = 'LOAD_NEWSLIST_SUCCESS';
export const LOAD_NEWSLIST_FAILURE = 'LOAD_NEWSLIST_FAILURE';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null
};

export function loadInstantList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWSLIST_REQUEST });
    /* TODO 先暫時用 indexpage 當 api 代替 */
    return axios.get(`${protocol}://${host}/indexpage`)
    .then(res => {
      dispatch({
        type: LOAD_NEWSLIST_SUCCESS,
        payload: res.data.carousels,
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

export default function instantPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWSLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_NEWSLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
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

export const selectInstantPage = state => state.instantPage;
