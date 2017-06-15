import isomorphicCookie from 'isomorphic-cookie';
import { CLEAR_USER } from '../../modules/sourceRequest';
export const ACTIVE_REQUEST = 'ACTIVE_REQUEST';
export const ACTIVE_SUCCESS = 'ACTIVE_SUCCESS';
export const ACTIVE_FAILURE = 'ACTIVE_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const RESEND_ACTIVE_REQUEST = 'RESEND_ACTIVE_REQUEST';
export const RESEND_ACTIVE_SUCCESS = 'RESEND_ACTIVE_SUCCESS';
export const RESEND_ACTIVE_FAILURE = 'RESEND_ACTIVE_FAILURE';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';

const initialState = {
  error: null,
  isLoading: false,
  lastFetched: null
};

export const activeEmail = (token) => {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: ACTIVE_REQUEST });
    const { memberServ } = getState().sourceRequest;
    const url = `${memberServ}/api/auth/active?token=${token}`;
    return axios.get(url)
    .then((result) => {
      dispatch({
        type: ACTIVE_SUCCESS,
        payload: result,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: ACTIVE_FAILURE,
        payload: error.response.data
      });
    });
  };
};

export const onLogin = () => {
  return (dispatch, getState, { axios }) => {
    const { memberServ } = getState().sourceRequest;
    const values = getState().form.auth.values;
    dispatch({ type: LOGIN_REQUEST });
    const url = `${memberServ}/api/member/signin`;
    return axios.post(url, values)
    .then((result) => {
      const { id, token, name } = result.data;
      isomorphicCookie.save('NOW_member', id, { secure: false });
      isomorphicCookie.save('NOW_memberData', { token, name }, { secure: false });
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
};

export const onLogout = () => {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOGOUT_REQUEST });
    isomorphicCookie.remove('NOW_memberData');
    isomorphicCookie.remove('NOW_member');
    dispatch({ type: CLEAR_USER });
    window.location = '/';
  };
};
export const onSignup = () => {
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
      const confirmRes = window.confirm('【註冊完成】，請前往註冊信箱做帳號認證！');
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
};

export const onUpdate = () => {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: UPDATE_REQUEST });
    const { memberServ } = getState().sourceRequest;
    const { token, values } = getState().form.auth.values;
    const url = `${memberServ}/api/member`;
    return axios.put(url, values, {
      headers: { 'X-NOWnews-Member': token }
    }).then((result) => {
      const { email, name, gender, birthday, phone } = result.data;
      isomorphicCookie.save('NOW_memberData', { token, birthday, name, email, gender, phone }, { secure: false });
      dispatch({
        type: UPDATE_SUCCESS,
        payload: result,
        meta: {
          lastFetched: Date.now()
        }
      });
    }).catch(error => {
      dispatch({
        type: UPDATE_FAILURE,
        payload: error.response.data
      });
    });
  };
};

export const resendActiveEmail = () => {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: RESEND_ACTIVE_REQUEST });
    const { memberServ } = getState().sourceRequest;
    const { email } = getState().form.auth.values || {};

    if (!email || (email && email.trim().length === 0)) {
      return dispatch({
        type: RESEND_ACTIVE_FAILURE,
        payload: {message: '信箱格式有誤'}
      });
    }

    return axios.post(`${memberServ}/api/auth/resend`, { email })
    .then((result) => {
      dispatch({
        type: RESEND_ACTIVE_SUCCESS,
        payload: result,
        meta: {
          lastFetched: Date.now()
        }
      });
      const confirmRes = window.confirm('【重寄確認信成功】，請前往信箱做帳號認證！');
      if (confirmRes) {
        window.location = '/auth/login';
      }
    }).catch(error => {
      dispatch({
        type: RESEND_ACTIVE_FAILURE,
        payload: error.response.data
      });
    });
  };
};

export default function authPage (state = initialState, action) {
  switch (action.type) {
    case ACTIVE_FAILURE:
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case RESEND_ACTIVE_FAILURE:
    case UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        isLoading: false
      };
    case ACTIVE_SUCCESS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case RESEND_ACTIVE_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case ACTIVE_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case RESEND_ACTIVE_REQUEST:
    case UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export const selectAuthPage = state => state.authPage;
export const selectAuthForm = state => state.form.auth;
