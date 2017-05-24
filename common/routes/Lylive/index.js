if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'lylive/:videoSource',
    getComponents (location, cb) {
      require.ensure([
        './containers/LyLiveContainer',
        './module'
      ], (require) => {
        let LyLiveContainer = require('./containers/LyLiveContainer').default;
        let liliveReducer = require('./module').default;
        injectAsyncReducer(store, 'lylivePage', liliveReducer);
        cb(null, LyLiveContainer);
      }, 'lylivePage');
    }
  };
}
