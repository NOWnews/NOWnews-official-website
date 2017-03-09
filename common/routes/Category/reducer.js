import * as types from '../../constants'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_NEWSLIST_REQUEST:
      return { ...state,
        isLoading: true,
        error: null
      }
    case types.LOAD_NEWSLIST_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      }
    case types.LOAD_NEWSLIST_FAILURE:
      return { ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const selectNewsList = state => state.newsList
