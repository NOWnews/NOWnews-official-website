export const LOAD_HEADER_REQUEST = 'LOAD_HEADER_REQUEST';
export const LOAD_HEADER_SUCCESS = 'LOAD_HEADER_SUCCESS';
export const LOAD_HEADER_FAILURE = 'LOAD_HEADER_FAILURE';

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  menus: [],
  currentMenu: {}
};

export function loadHeader (url) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_HEADER_REQUEST });
    return Promise.all([
      axios.get(`${protocol}://${host}/menus`)
      // axios.get(`${protocol}://${host}/hot/$`)
    ]).then(([menus]) => {
      dispatch({
        type: LOAD_HEADER_SUCCESS,
        payload: menus.data,
        meta: {
          lastFetched: Date.now()
        }
      });
    })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_HEADER_FAILURE}: `, error);
        dispatch({
          type: LOAD_HEADER_FAILURE,
          payload: error,
          error: true
        });
      });
  };
}

export default function header (state = initialState, action) {
  switch (action.type) {
    case LOAD_HEADER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_HEADER_SUCCESS:
      return {
        ...state,
        menus: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_HEADER_FAILURE:
      return { ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectMenus = state => state.header.menus;
