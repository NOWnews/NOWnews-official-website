export const LOAD_SEARCHPAGE_REQUEST = Symbol('LOAD_SEARCHPAGE_REQUEST');
export const LOAD_SEARCHPAGE_SUCCESS = Symbol('LOAD_SEARCHPAGE_SUCCESS');
export const LOAD_SEARCHPAGE_FAILURE = Symbol('LOAD_SEARCHPAGE_FAILURE');

const initialState = {
  error: null,
  hotKeyword: [],
  isLoading: false,
  lastFetched: null,
  list: [],
  pageData: {}
  // queryString: '',
  // queryTime: ''
};

export function loadSearchList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_SEARCHPAGE_REQUEST });
    return axios.get(`${protocol}://${host}/search/123`)
    .then(res => {
      dispatch({
        type: LOAD_SEARCHPAGE_SUCCESS,
        payload: res.data,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_SEARCHPAGE_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function searchPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCHPAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_SEARCHPAGE_SUCCESS:
      let { newsList, pageData } = action.payload;
      return {
        ...state,
        lastFetched: action.meta.lastFetched,
        list: newsList,
        isLoading: false,
        pageData
      };
    case LOAD_SEARCHPAGE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectSearchPage = state => state.searchPage;
