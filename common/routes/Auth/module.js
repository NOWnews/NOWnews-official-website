export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null
};

export function onSignup () {
  return (dispatch, getState, { axios }) => {
    const { memberServ } = getState().sourceRequest;
    const values = getState().form.auth.values;
    dispatch({ type: SIGNUP_REQUEST });
    const url = `${memberServ}/api/member/signup`;
    return axios.post(url, values)
    .then((result) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: result,
        meta: {
          lastFetched: Date.now()
        }
      });
      const confirmRes = window.confirm('【註冊完成〗，請前往註冊信箱做帳號認證！');
      if (confirmRes) {
        window.location = '/auth/login';
      }
    }).catch(error => {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error.response.data
      });
    });
  };
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectAuthPage = state => state.auth;
export const selectAuthForm = state => state.form.auth;

