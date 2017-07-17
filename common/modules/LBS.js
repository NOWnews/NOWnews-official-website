export const LOAD_LBS_REQUEST = 'LOAD_LBS_REQUEST';
export const LOAD_LBS_SUCCESS = 'LOAD_LBS_SUCCESS';
export const LOAD_LBS_FAILURE = 'LOAD_LBS_FAILURE';
export const LOAD_LOCATION_REQUEST = 'LOAD_LOCATION_REQUEST';
export const LOAD_LOCATION_FAILURE = 'LOAD_LOCATION_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  isLocationLoading: false,
  lastFetched: null,
  location: [],
  mapCity: '',
  newsList: [],
  pageData: {}
};

function getLocation (dispatch, location) {
  if (location.length !== 0) {
    return Promise.resolve(location);
  }
  const geolocation = window.navigator.geolocation;

  dispatch({ type: LOAD_LOCATION_REQUEST });
  return new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      resolve([lat, lng]);
    }, (err) => {
      dispatch({ type: LOAD_LOCATION_FAILURE, payload: err });
      reject(err);
    });
  });
}

export function loadLBSList () {
  return (dispatch, getState, { axios }) => {
    // skip SSR, because it should work on client side.
    const canUseDOM = !!(typeof window !== 'undefined' && window.document);
    if (!canUseDOM) {
      return Promise.resolve();
    }

    // 有抓過資料就跳過，不重複呼叫
    const { apiServ, local } = getState().sourceRequest;
    const { lastFetched, location, pageData } = getState().LBS;
    const page = local.query.page ? local.query.page : 1;
    if (lastFetched !== null && pageData.currentPage === parseInt(page, 10)) {
      return Promise.resolve();
    }
    getLocation(dispatch, location).then((result) => {
      dispatch({ type: LOAD_LBS_REQUEST, payload: result });
      const [lat, lng] = result;
      return axios.get(`${apiServ}/location?limit=10&lat=${lat}&lng=${lng}&page=${page}`)
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
          isLocationLoading: false,
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
        isLocationLoading: false,
        isLoading: true,
        error: null
      };
    case LOAD_LBS_SUCCESS:
      const { newsList, mapInfo, pageData } = action.payload;
      return {
        ...state,
        mapCity: mapInfo.city || mapInfo.area,
        newsList,
        pageData,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_LBS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        newsList: []
      };
    case LOAD_LOCATION_REQUEST:
      return {
        ...state,
        isLocationLoading: true,
        newsList: []
      };
    case LOAD_LOCATION_FAILURE:
      return {
        ...state,
        isLocationLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectLBS = state => state.LBS;
