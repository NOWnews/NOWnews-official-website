if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'cat/:categoryName',
    getComponents (location, cb) {
      require.ensure([
        './containers/CategoryContainer',
        './module'
      ], (require) => {
        let CategoryContainer = require('./containers/CategoryContainer').default;
        let categoryReducer = require('./module').default;
        injectAsyncReducer(store, 'categoryPage', categoryReducer);
        cb(null, CategoryContainer);
      });
    }
  };
}
