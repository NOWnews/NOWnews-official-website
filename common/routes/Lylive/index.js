if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'lylive/:videoSource',
    getComponents (location, cb) {
      require.ensure([
        './containers/VideoContainer',
        './module'
      ], (require) => {
        let VideoContainer = require('./containers/VideoContainer').default;
        let videoReducer = require('./module').default;
        injectAsyncReducer(store, 'lylivePage', videoReducer);
        cb(null, VideoContainer);
      }, 'lylivePage');
    }
  };
}
