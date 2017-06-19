export const LOAD_TOPIC_REQUEST = 'LOAD_TOPIC_REQUEST';
export const LOAD_TOPIC_SUCCESS = 'LOAD_TOPIC_SUCCESS';
export const LOAD_TOPIC_FAILURE = 'LOAD_TOPIC_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  pageData: {},
  topics: []
};

export function loadTopics (page = 1) {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_TOPIC_REQUEST });
    return axios.get(`${apiServ}/specialtopics?limit=20&page=${page}`)
    .then((result) => {
      let { specialTopics, pageData } = result.data;
      dispatch({
        type: LOAD_TOPIC_SUCCESS,
        payload: {
          topics: specialTopics,
          pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_TOPIC_FAILURE,
        payload: error.response.data
      });
    });
  };
}

export default function topicPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_TOPIC_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_TOPIC_SUCCESS:
      let { topics, pageData } = action.payload;
      return {
        ...state,
        topics,
        pageData,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_TOPIC_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
        topics: []
      };
    default:
      return state;
  }
}

export const selectTopicPage = state => state.topicPage;
