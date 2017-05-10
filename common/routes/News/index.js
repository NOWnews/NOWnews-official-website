if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'news/:date/:sn',
    getComponents (location, cb) {
      require.ensure([
        './containers/NewsContainer'
      ], (require) => {
        let NewsContainer = require('./containers/NewsContainer').default;
        let newsReducer = require('./module').default;
        injectAsyncReducer(store, 'currentNews', newsReducer);
        cb(null, NewsContainer);
      }, 'newsPage');
    }
  };
}
