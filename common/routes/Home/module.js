export const LOAD_INDEX_REQUEST = 'LOAD_INDEX_REQUEST';
export const LOAD_INDEX_SUCCESS = 'LOAD_INDEX_SUCCESS';
export const LOAD_INDEX_SUCCESS_AND_EMPTY = 'LOAD_INDEX_SUCCESS_AND_EMPTY';
export const LOAD_INDEX_FAILURE = 'LOAD_INDEX_FAILURE';
export const SWITCH_TRIPLET_TYPE = 'SWITCH_TRIPLET_TYPE';

const initialState = {
  ads: {},
  carousels: [],
  error: null,
  isLoading: false,
  lastFetched: null,
  specialChannels: [],
  specialTopics: [],
  tripletType: 'instant',
  videos: []
};

export function loadHomeList () {
  return (dispatch, getState, { axios }) => {
    const { apiServ } = getState().sourceRequest;
    dispatch({ type: LOAD_INDEX_REQUEST });
    return Promise.all([
      axios.get(`${apiServ}/indexpage`),
      axios.get(`${apiServ}/promote/home`)
    ]).then(([home, ads]) => {
      if (home.data) {
        dispatch({
          type: LOAD_INDEX_SUCCESS,
          payload: {
            ads: ads.data,
            home: home.data
          },
          meta: {
            lastFetched: Date.now()
          }
        });
        return;
      }
      dispatch({ type: LOAD_INDEX_SUCCESS_AND_EMPTY, payload: { ads: ads.data } });
    }).catch(error => {
      dispatch({
        type: LOAD_INDEX_FAILURE,
        payload: error.response.data
      });
    });
  };
}

export function switchTripletType (type) {
  return (dispatch) => {
    dispatch({ type: SWITCH_TRIPLET_TYPE, payload: type });
  };
}

export default function homePage (state = initialState, action) {
  switch (action.type) {
    case LOAD_INDEX_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_INDEX_SUCCESS:
      const { ads, home } = action.payload;
      const { carousels, specialChannels, specialTopics, videos } = home;
      return {
        ...state,
        ads,
        carousels,
        videos,
        specialChannels,
        specialTopics,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_INDEX_SUCCESS_AND_EMPTY:
      return {
        ...state,
        ads: action.payload.ads,
        carousels: [],
        isLoading: false,
        specialChannels: [],
        specialTopics: [],
        tripletType: 'instant',
        videos: []
      };
    case LOAD_INDEX_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    case SWITCH_TRIPLET_TYPE:
      return {
        ...state,
        tripletType: action.payload
      };
    default:
      return state;
  }
}

export const selectHomePage = state => state.homePage;
