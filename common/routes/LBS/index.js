if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'lbs',
    getComponents (location, cb) {
      require.ensure([
        './containers/LBSContainer'
      ], (require) => {
        let LBSContainer = require('./containers/LBSContainer').default;
        let LBSReducer = require('./module').default;
        injectAsyncReducer(store, 'LBSPage', LBSReducer);
        cb(null, LBSContainer);
      });
    }
  };
}
