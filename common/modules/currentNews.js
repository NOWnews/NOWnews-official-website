export const LOAD_NEWS_REQUEST = 'LOAD_NEWS_REQUEST';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';
export const LOAD_MORE_NEWS_SUCCESS = 'LOAD_MORE_NEWS_SUCCESS';
export const LOAD_NEWS_FAILURE = 'LOAD_NEWS_FAILURE';
export const LOAD_PREVIEW_REQUEST = 'LOAD_PREVIEW_REQUEST';
export const LOAD_PREVIEW_SUCCESS = 'LOAD_PREVIEW_SUCCESS';
export const LOAD_PREVIEW_FAILURE = 'LOAD_PREVIEW_FAILURE';
const canUseDOM = !!(typeof window !== 'undefined' && window.document);

const initialState = {
  hasMore: false,
  isLoading: false,
  lastFetched: null,
  error: null,
  data: []
};

export function loadNews (sn, isLoadMore = false) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    const apiServ = `${protocol}://${host}`;
    dispatch({ type: LOAD_NEWS_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/news/${sn}`),
      axios.get(`${apiServ}/news/${sn}/nextandprev`),
      axios.get(`${apiServ}/news/${sn}/relations`)
    ]).then(([news, nextandprev, relations]) => {
      let { next, prev } = nextandprev.data;
      // If it's first time loading then scrollTop to zero.
      if (canUseDOM && !isLoadMore) {
        window.document.body.scrollTop = 0;
      }
      dispatch({
        type: isLoadMore ? LOAD_MORE_NEWS_SUCCESS : LOAD_NEWS_SUCCESS,
        payload: { ...news.data, next, prev, relations: relations.data },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      console.error(`Error in reducer that handles ${LOAD_NEWS_FAILURE}: `, error);
      dispatch({
        type: LOAD_NEWS_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export function loadPreview (redisKey) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_PREVIEW_REQUEST });
    return axios.get(`${protocol}://${host}/previews/${redisKey}`)
      .then(res => {
        dispatch({
          type: LOAD_PREVIEW_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_PREVIEW_FAILURE}: `, error);
        dispatch({
          type: LOAD_PREVIEW_FAILURE,
          payload: error,
          error: true
        });
      });
  };
}

export default function currentNews (state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS_REQUEST:
    case LOAD_PREVIEW_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case LOAD_MORE_NEWS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        hasMore: !!action.payload.next.sn,
        isLoading: false,
        lastFetched: action.meta.lastFetched
      };
    case LOAD_NEWS_SUCCESS:
      return {
        ...state,
        data: [action.payload],
        hasMore: !!action.payload.next.sn,
        isLoading: false,
        lastFetched: action.meta.lastFetched
      };
    case LOAD_NEWS_FAILURE:
    case LOAD_PREVIEW_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case LOAD_PREVIEW_SUCCESS:
      return {
        ...state,
        data: [action.payload],
        isLoading: false,
        lastFetched: action.meta.lastFetched
      };
    default:
      return state;
  }
}

export const selectCurrentNews = state => state.currentNews;
