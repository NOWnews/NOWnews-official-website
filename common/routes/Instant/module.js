import { createSelector } from 'reselect';
import formatPhoto from '../../../lib/format/photo';

export const LOAD_INSTANT_REQUEST = 'LOAD_INSTANT_REQUEST';
export const LOAD_INSTANT_SUCCESS = 'LOAD_INSTANT_SUCCESS';
export const LOAD_INSTANT_FAILURE = 'LOAD_INSTANT_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  newsList: [],
  pageData: {},
  topics: [],
  videos: []
};

export function loadInstantList (page = 1) {
  return (dispatch, getState, { axios }) => {
    // 有資料同一頁就跳過，不重複呼叫
    const { newsList, pageData } = getState().instantPage;
    if (newsList.length > 0 && pageData.currentPage === page) {
      return Promise.resolve();
    }

    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_INSTANT_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/instant?page=${page}&limit=12`),
      axios.get(`${apiServ}/instant?type=video&limit=4`),
      axios.get(`${apiServ}/specialtopics?limit=6`)
    ]).then(([instant, instantVideo, topic]) => {
      dispatch({
        type: LOAD_INSTANT_SUCCESS,
        payload: {
          news: instant.data,
          videos: instantVideo.data.newsList,
          topics: topic.data.specialTopics
        },
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_INSTANT_FAILURE,
        payload: error.response ? error.response.data : error.message
      });
    });
  };
}

export default function instantPage (state = initialState, action) {
  switch (action.type) {
    case LOAD_INSTANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_INSTANT_SUCCESS:
      let { news: { newsList, pageData }, topics, videos } = action.payload;
      return {
        ...state,
        newsList,
        pageData,
        topics,
        videos,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_INSTANT_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    default:
      return state;
  }
}

const getInstantPage = (state) => state.instantPage;
const formatInstantPage = createSelector(
  [getInstantPage], ({ videos, newsList, ...instantPage }) => {
    const result = {
      ...instantPage,
      videos: videos.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto)
        };
      }),
      newsList: newsList.map((news) => {
        return {
          ...news,
          MainPhoto: formatPhoto(news.MainPhoto)
        };
      })
    };
    return result;
  }
);
export const selectInstantPage = state => formatInstantPage(state);
