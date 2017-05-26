import isomorphicCookie from 'isomorphic-cookie';
export const LOAD_INTEREST_REQUEST = 'LOAD_INTEREST_REQUEST';
export const LOAD_INTEREST_SUCCESS = 'LOAD_INTEREST_SUCCESS';
export const LOAD_INTEREST_FAILURE = 'LOAD_INTEREST_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: []
};

export function loadInterest (cookie, userId) {
  return (dispatch, getState, { axios }) => {
    const cookie = isomorphicCookie.load('NOW_personalize');
    const userId = isomorphicCookie.load('NOW_member');
    const { protocol, host } = getState().sourceRequest;
    let queryString = `?limit=12&cookie=${cookie}`;
    if (userId) {
      queryString += `&userId=${userId}`;
    }
    dispatch({ type: LOAD_INTEREST_REQUEST });
    return axios.get(`${protocol}://${host}/personalize${queryString}`)
    .then(res => {
      dispatch({
        type: LOAD_INTEREST_SUCCESS,
        payload: res.data,
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

export default function interest (state = initialState, action) {
  switch (action.type) {
    case LOAD_INTEREST_REQUEST:
      return {
        ...state,
        newsList: [],
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
        error: action.payload.message,
        isLoading: false,
        newsList: []
      };
    default:
      return state;
  }
}

export const selectInterest = state => state.interest;
