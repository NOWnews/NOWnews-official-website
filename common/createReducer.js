import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import header from './modules/header';
import interest from './modules/interest';
import LBS from './modules/LBS';
import sourceRequest from './modules/sourceRequest';

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    form: formReducer,
    header,
    interest,
    LBS,
    sourceRequest,
    ...asyncReducers
  });
}
