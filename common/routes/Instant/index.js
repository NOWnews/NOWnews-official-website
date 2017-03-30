if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'instant',
    getComponents (location, cb) {
      require.ensure([
        './containers/InstantPage'
      ], (require) => {
        let InstantPage = require('./containers/InstantPage').default;
        let instantReducer = require('./module').default;
        injectAsyncReducer(store, 'instantPage', instantReducer);
        cb(null, InstantPage);
      });
    }
  };
}
