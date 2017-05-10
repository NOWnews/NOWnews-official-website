if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'favorite',
    getComponents (location, cb) {
      require.ensure([
        './containers/FavoriteContainer'
      ], (require) => {
        let FavoriteContainer = require('./containers/FavoriteContainer').default;
        let favoriteReducer = require('./module').default;
        injectAsyncReducer(store, 'favoritePage', favoriteReducer);
        cb(null, FavoriteContainer);
      }, 'favoritePage');
    }
  };
}
