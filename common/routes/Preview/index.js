if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'preview/:redisKey',
    getComponents (location, cb) {
      require.ensure([
        './containers/PreviewContainer'
      ], (require) => {
        let PreviewContainer = require('./containers/PreviewContainer').default;
        let newsReducer = require('../News/module').default;
        injectAsyncReducer(store, 'currentNews', newsReducer);
        cb(null, PreviewContainer);
      }, 'previewPage');
    }
  };
}
