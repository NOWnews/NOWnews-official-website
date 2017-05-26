export const LOAD_INDEX_REQUEST = 'LOAD_INDEX_REQUEST';
export const LOAD_INDEX_SUCCESS = 'LOAD_INDEX_SUCCESS';
export const LOAD_INDEX_FAILURE = 'LOAD_INDEX_FAILURE';
export const SWITCH_TRIPLET_TYPE = 'SWITCH_TRIPLET_TYPE';

const initialState = {
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
    return axios.get(`${apiServ}/indexpage`)
    .then(res => {
      dispatch({
        type: LOAD_INDEX_SUCCESS,
        payload: res.data,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: LOAD_INDEX_FAILURE,
        payload: error,
        error: true
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
      let { carousels, specialChannels, specialTopics, videos } = action.payload;
      return {
        ...state,
        carousels,
        videos,
        specialChannels,
        specialTopics,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_INDEX_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
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
