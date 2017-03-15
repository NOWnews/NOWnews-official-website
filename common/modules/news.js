export const LOAD_NEWS_REQUEST = 'LOAD_NEWS_REQUEST';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_FAILURE = 'LOAD_NEWS_FAILURE';

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  data: {}
};

export function loadNews (url) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWS_REQUEST });
    // var adapter = require('axios/lib/adapters/http');
    console.log(require('axios/lib/adapters/xhr'), 'wtf!!!?');
    return axios.get(`${protocol}://${host}/${url}`)
      .then(res => {
        dispatch({
          type: LOAD_NEWS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_NEWS_FAILURE}: `, error);
        dispatch({
          type: LOAD_NEWS_FAILURE,
          payload: error,
          error: true
        });
      });
  };
}

export default function currentNews (state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null
      };
    case LOAD_NEWS_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_NEWS_FAILURE:
      return { ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectCurrentNews = state => state.news;
