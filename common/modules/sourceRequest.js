export const SET_LOCAL = 'SET_LOCAL';

const initialState = {
  apiServ: null,
  local: {},
  memberServ: null
};

export function setLocal (path, query) {
  return (dispatch) => {
    dispatch({ type: SET_LOCAL, payload: { path, query } });
  };
}

export default function sourceRequest (state = initialState, action) {
  switch (action.type) {
    case SET_LOCAL:
      return {
        ...state,
        local: action.payload
      };
    default:
      return state;
  }
}

export const selectLocal = (state) => {
  return state.sourceRequest.local;
};
