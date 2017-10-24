if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'search',
    getComponents (location, cb) {
      require.ensure([
        './containers/GoogleSearchContainer'
      ], (require) => {
        let GoogleSearchContainer = require('./containers/GoogleSearchContainer').default;
        let searchReducer = require('./module').default;
        injectAsyncReducer(store, 'searchPage', searchReducer);
        cb(null, GoogleSearchContainer);
      }, 'searchPage');
    }
  };
}
