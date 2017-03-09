import * as types from '../../constants'

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  title: '',
  content: ''
}

export default function currentNews (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_NEWS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_NEWS_SUCCESS:
      return { ...state,
        title: action.payload.title,
        content: action.payload.content,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_NEWS_FAILURE:
      return { ...state,
        error: action.payload }
    default:
      return state
  }
}

export const selectCurrentNews = state => state.currentNews
