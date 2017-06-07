export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null
};

export function onLogin () {
  return (dispatch, getState, { axios }) => {
    const { memberServ } = getState().sourceRequest;
    const values = getState().form.auth.values;
    dispatch({ type: LOGIN_REQUEST });
    const url = `${memberServ}/api/member/signin`;
    return axios.post(url, values)
    .then((result) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result,
        meta: {
          lastFetched: Date.now()
        }
      });
      window.location = '/';
    }).catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response.data
      });
    });
  };
}

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

export default function authPage (state = initialState, action) {
  switch (action.type) {
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export const selectAuthPage = state => state.authPage;
export const selectAuthForm = state => state.form.auth;

