export const LOAD_LBS_REQUEST = Symbol('LOAD_LBS_REQUEST');
export const LOAD_LBS_SUCCESS = Symbol('LOAD_LBS_SUCCESS');
export const LOAD_LBS_FAILURE = Symbol('LOAD_LBS_FAILURE');

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadLBSList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_LBS_REQUEST });
    /* TODO 先暫時用 indexpage 當 api 代替 */
    return axios.get(`${protocol}://${host}/indexpage`)
    .then(res => {
      dispatch({
        type: LOAD_LBS_SUCCESS,
        payload: res.data.carousels,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_LBS_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function LBSPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_LBS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_LBS_SUCCESS:
      return {
        ...state,
        newsList: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_LBS_FAILURE:
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

export const selectLBSPage = state => state.LBSPage;
