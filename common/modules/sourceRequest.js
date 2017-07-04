export const CLEAR_USER = 'CLEAR_USER';
export const SET_LOCAL = 'SET_LOCAL';

const initialState = {
  apiServ: null,
  local: {},
  memberServ: null
};

export function setLocal (local) {
  return (dispatch) => {
    dispatch({ type: SET_LOCAL, payload: local });
  };
}

export default function sourceRequest (state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER:
      let tempLocal = { ...state.local };
      tempLocal.user = {};
      return {
        ...state,
        local: tempLocal
      };
    case SET_LOCAL:
      return {
        ...state,
        local: action.payload
      };
    default:
      return state;
  }
}

export const selectSourceRequest = state => state.sourceRequest;
export const selectLocal = state => state.sourceRequest.local;
export const selectUser = state => state.sourceRequest.local.user || {};
