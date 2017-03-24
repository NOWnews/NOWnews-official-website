export const LOAD_MENUS_REQUEST = 'LOAD_MENUS_REQUEST';
export const LOAD_MENUS_SUCCESS = 'LOAD_MENUS_SUCCESS';
export const LOAD_MENUS_FAILURE = 'LOAD_MENUS_FAILURE';

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  data: {}
};

export function loadMenus (url) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_MENUS_REQUEST });
    return axios.get(`${protocol}://${host}/menus`)
      .then(res => {
        dispatch({
          type: LOAD_MENUS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_MENUS_FAILURE}: `, error);
        dispatch({
          type: LOAD_MENUS_FAILURE,
          payload: error,
          error: true
        });
      });
  };
}

export default function currentNews (state = initialState, action) {
  switch (action.type) {
    case LOAD_MENUS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null
      };
    case LOAD_MENUS_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false
      };
    case LOAD_MENUS_FAILURE:
      return { ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const selectMenus = state => state.menus;
