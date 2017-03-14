import { LOAD_NEWS_REQUEST, LOAD_NEWS_SUCCESS, LOAD_NEWS_FAILURE } from '../../constants';

export function loadNews (url) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_NEWS_REQUEST });
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
