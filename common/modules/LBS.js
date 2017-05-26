export const LOAD_LBS_REQUEST = 'LOAD_LBS_REQUEST';
export const LOAD_LBS_SUCCESS = 'LOAD_LBS_SUCCESS';
export const LOAD_LBS_FAILURE = 'LOAD_LBS_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null,
  location: [],
  mapCity: '',
  newsList: [],
  pageData: {}
};

function getLocation () {
  const geolocation = window.navigator.geolocation;

  return new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject(new Error('Permission denied'));
    });
  });
}

export function loadLBSList (page = 1) {
  return (dispatch, getState, { axios }) => {
    getLocation().then((location) => {
      const { latitude: lat, longitude: lng } = location.coords;
      const { protocol, host } = getState().sourceRequest;
      dispatch({ type: LOAD_LBS_REQUEST, payload: [lat, lng] });
      return axios.get(`${protocol}://${host}/location?limit=10&lat=${lat}&lng=${lng}&page=${page}`)
      .then(res => {
        dispatch({
          type: LOAD_LBS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        });
      }).catch(error => {
        dispatch({
          type: LOAD_LBS_FAILURE,
          payload: error,
          error: true
        });
      });
    });
  };
}

export default function LBS (state = initialState, action) {
  switch (action.type) {
    case LOAD_LBS_REQUEST:
      return {
        ...state,
        location: action.payload,
        mapCity: '',
        newsList: [],
        isLoading: true,
        error: null
      };
    case LOAD_LBS_SUCCESS:
      const { newsList, mapInfo, pageData } = action.payload;
      return {
        ...state,
        mapCity: mapInfo.city,
        newsList,
        pageData,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_LBS_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
        newsList: []
      };
    default:
      return state;
  }
}

export const selectLBS = state => state.LBS;
