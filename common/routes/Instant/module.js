export const LOAD_INSTANT_REQUEST = 'LOAD_INSTANT_REQUEST';
export const LOAD_INSTANT_SUCCESS = 'LOAD_INSTANT_SUCCESS';
export const LOAD_INSTANT_FAILURE = 'LOAD_INSTANT_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {},
  topics: [],
  videos: []
};

export function loadInstantList (page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_INSTANT_REQUEST });
    return axios.get(`${protocol}://${host}/instant?page=${page}&limit=12`)
    .then(res => {
      dispatch({
        type: LOAD_INSTANT_SUCCESS,
        payload: res.data,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_INSTANT_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function instantPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_INSTANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_INSTANT_SUCCESS:
      let { newsList, pageData } = action.payload;
      return {
        ...state,
        newsList,
        pageData,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_INSTANT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectInstantPage = state => state.instantPage;
