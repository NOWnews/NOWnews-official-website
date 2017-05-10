if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'channel/:sn',
    getComponents (location, cb) {
      require.ensure([
        './containers/ChannelContainer',
        './module'
      ], (require) => {
        let ChannelContainer = require('./containers/ChannelContainer').default;
        let channelReducer = require('./module').default;
        injectAsyncReducer(store, 'channelPage', channelReducer);
        cb(null, ChannelContainer);
      }, 'channelPage');
    }
  };
}
