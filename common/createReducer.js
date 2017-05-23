import { combineReducers } from 'redux';
import header from './modules/header';
import LBS from './modules/LBS';
const initialState = {
  host: '',
  protocol: ''
};

const sourceRequest = (state = initialState, action) => state;

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    header,
    LBS,
    sourceRequest,
    ...asyncReducers
  });
}
