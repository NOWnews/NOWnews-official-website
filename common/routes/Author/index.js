if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'author/:authorId',
    getComponents (location, cb) {
      require.ensure([
        './containers/AuthorContainer'
      ], (require) => {
        let AuthorContainer = require('./containers/AuthorContainer').default;
        let authorReducer = require('./module').default;
        injectAsyncReducer(store, 'authorPage', authorReducer);
        cb(null, AuthorContainer);
      }, 'authorPage');
    }
  };
}
