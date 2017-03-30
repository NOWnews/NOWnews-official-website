if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: '',
    getComponents (location, cb) {
      require.ensure([
        './containers/HomePage'
      ], (require) => {
        let HomePage = require('./containers/HomePage').default;
        let homeReducer = require('./module').default;
        injectAsyncReducer(store, 'homePage', homeReducer);
        cb(null, HomePage);
      });
    }
  };
}
