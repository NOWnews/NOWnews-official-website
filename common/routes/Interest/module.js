export const LOAD_INTEREST_REQUEST = 'LOAD_INTEREST_REQUEST';
export const LOAD_INTEREST_SUCCESS = 'LOAD_INTEREST_SUCCESS';
export const LOAD_INTEREST_FAILURE = 'LOAD_INTEREST_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadInterestList (page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_INTEREST_REQUEST });
    return axios.get(`${protocol}://${host}/interests?page=${page}`)
    .then(res => {
      dispatch({
        type: LOAD_INTEREST_SUCCESS,
        payload: res.data.carousels,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_INTEREST_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function interestPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_INTEREST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_INTEREST_SUCCESS:
      return {
        ...state,
        newsList: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_INTEREST_FAILURE:
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

export const selectInterestPage = state => state.interestPage;
