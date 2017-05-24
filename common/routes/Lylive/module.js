export const LOAD_RELATED_NEWS_REQUEST = 'LOAD_RELATED_NEWS_REQUEST';
export const LOAD_RELATED_NEWS_SUCCESS = 'LOAD_RELATED_NEWS_SUCCESS';
export const LOAD_RELATED_NEWS_FAILURE = 'LOAD_RELATED_NEWS_FAILURE';
export const SET_VIDEO_SOURCE = 'SET_VIDEO_SOURCE';
const initialState = {
  videoSource: 1,
  newsList: [],
  videoSourceList: [
    {
      id: '1',
      title: '立法院會議',
      url: 'https://livehouse.in/embed/channel/ivod01/video/cover'
    },
    {
      id: '2',
      title: '內政委員會',
      url: 'https://livehouse.in/embed/channel/ivod02/video/cover'
    },
    {
      id: '3',
      title: '外交及國防委員會',
      url: 'https://livehouse.in/embed/channel/ivod03/video/cover'
    },
    {
      id: '4',
      title: '經濟委員會',
      url: 'https://livehouse.in/embed/channel/ivod04/video/cover'
    },
    {
      id: '5',
      title: '財政委員會',
      url: 'https://livehouse.in/embed/channel/ivod05/video/cover'
    },
    {
      id: '6',
      title: '教育及文化委員會',
      url: 'https://livehouse.in/embed/channel/ivod06/video/cover'
    },
    {
      id: '7',
      title: '交通委員會',
      url: 'https://livehouse.in/embed/channel/ivod07/video/cover'
    },
    {
      id: '8',
      title: '司法及法治委員會',
      url: 'https://livehouse.in/embed/channel/ivod08/video/cover'
    },
    {
      id: '9',
      title: '社會福利及衛生環境委員會',
      url: 'https://livehouse.in/embed/channel/ivod09/video/cover'
    },
    {
      id: '10',
      title: '程序委員會',
      url: 'https://livehouse.in/embed/channel/ivod10/video/cover'
    },
    {
      id: '11',
      title: '修憲委員會',
      url: 'https://livehouse.in/embed/channel/ivod11/video/cover'
    }
  ]
};

export function setVideoSource (videoSource) {
  return (dispatch, getState, { axios }) => {
    dispatch({
      type: SET_VIDEO_SOURCE,
      payload: videoSource });
  };
}
export function loadRelatedNews (sn) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_RELATED_NEWS_REQUEST });
    console.log(1);
    const getListUrl = `cat/politics`;
    return axios.get(`${protocol}://${host}/${getListUrl}`)
      .then((res) => {
        const newsList = res.data.newsList;
        dispatch({
          type: LOAD_RELATED_NEWS_SUCCESS,
          payload: newsList
        });
        console.log(2);
      }).catch(error => {
        dispatch({
          type: LOAD_RELATED_NEWS_FAILURE,
          payload: error
        });
        console.log(3);
      });
  };
}

export default function lylivePage (state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO_SOURCE:
      return {
        ...state,
        isLoading: false,
        error: null,
        videoSource: action.payload
      };
    case LOAD_RELATED_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_RELATED_NEWS_SUCCESS:
      const newsList = action.payload;
      return {
        ...state,
        newsList,
        isLoading: false
      };
    case LOAD_RELATED_NEWS_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload.message,
        newsList: [],
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectLylivePage = state => state.lylivePage;
