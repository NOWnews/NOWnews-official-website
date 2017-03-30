import { combineReducers } from 'redux';
import currentNews from './modules/currentNews';
import menus from './modules/menus';

const initialState = {
  host: '',
  protocol: ''
};

const categoryPage = (state = {}, action) => state;
const sourceRequest = (state = initialState, action) => state;

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    categoryPage,
    currentNews,
    menus,
    sourceRequest,
    ...asyncReducers
  });
}
