import { LOAD_NEWSLIST_REQUEST, LOAD_NEWSLIST_SUCCESS, LOAD_NEWSLIST_FAILURE } from '../../constants'

export function loadCateogryList () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_NEWSLIST_REQUEST })
    return axios.get(`${protocol}://${host}/news`)
    .then(res => {
      dispatch({
        type: LOAD_NEWSLIST_SUCCESS,
        payload: res.data.newsList,
        meta: {
          lastFetched: Date.now()
        }
      })
    }).catch(error => {
      dispatch({
        type: LOAD_NEWSLIST_FAILURE,
        payload: error,
        error: true
      })
    })
  }
}
