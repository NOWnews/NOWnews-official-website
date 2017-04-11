if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: '',
    getComponents (location, cb) {
      require.ensure([
        './containers/HomeContainer'
      ], (require) => {
        let HomeContainer = require('./containers/HomeContainer').default;
        let homeReducer = require('./module').default;
        injectAsyncReducer(store, 'homePage', homeReducer);
        cb(null, HomeContainer);
      });
    }
  };
}
