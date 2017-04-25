export const LOAD_TOPIC_REQUEST = Symbol('LOAD_TOPIC_REQUEST');
export const LOAD_TOPIC_SUCCESS = Symbol('LOAD_TOPIC_SUCCESS');
export const LOAD_TOPIC_FAILURE = Symbol('LOAD_TOPIC_FAILURE');

const initialState = {
  error: null,
  hotTopics: [],
  isLoading: false,
  lastFetched: null,
  pageData: {},
  topics: []
};

export function loadTopics (page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_TOPIC_REQUEST });
    // temp to use category api
    // return axios.get(`${protocol}://${host}/specialtopics?page=${page}`)
    return Promise.all([
      axios.get(`${protocol}://${host}/cat/society`),
      axios.get(`${protocol}://${host}/hot/society`)
    ]).then(([categoryTopics, hotTopics]) => {
      dispatch({
        type: LOAD_TOPIC_SUCCESS,
        payload: {
          hotTopics: hotTopics.data,
          topics: categoryTopics.data.newsList,
          pageData: categoryTopics.data.pageData
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_TOPIC_FAILURE,
        payload: error,
        error: true
      });
    });
  };
}

export default function categoryPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_TOPIC_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_TOPIC_SUCCESS:
      let { hotTopics, topics, pageData } = action.payload;
      return {
        ...state,
        topics,
        pageData,
        hotTopics,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_TOPIC_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectTopicPage = state => state.topicPage;
