if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'news/:id',
    getComponents (location, cb) {
      require.ensure([
        './containers/NewsPage',
        './module'
      ], (require) => {
        let NewsPage = require('./containers/NewsPage').default;
        let newsReducer = require('./module').default;
        injectAsyncReducer(store, 'currentNews', newsReducer);
        cb(null, NewsPage);
      });
    }
  };
}
