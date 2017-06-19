export const LOAD_AUTHOR_REQUEST = 'LOAD_AUTHOR_REQUEST';
export const LOAD_AUTHOR_SUCCESS = 'LOAD_AUTHOR_SUCCESS';
export const LOAD_AUTHOR_FAILURE = 'LOAD_AUTHOR_FAILURE';

export const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {}
};

export function loadAuthorData (authorId, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_AUTHOR_REQUEST });
    return axios.get(`${apiServ}/news?author=${authorId}&page=${page}&limit=6`)
    .then(res => {
      dispatch({
        type: LOAD_AUTHOR_SUCCESS,
        payload: res.data,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_AUTHOR_FAILURE,
        payload: error.response.data
      });
    });
  };
}

export default function authorPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTHOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_AUTHOR_SUCCESS:
      let { newsList, pageData } = action.payload;
      return {
        ...state,
        lastFetched: action.meta.lastFetched,
        newsList: newsList,
        isLoading: false,
        pageData
      };
    case LOAD_AUTHOR_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectAuthorPage = state => state.authorPage;
