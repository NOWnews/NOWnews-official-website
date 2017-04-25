if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'topic',
    getComponents (location, cb) {
      require.ensure([
        './containers/TopicContainer',
        './module'
      ], (require) => {
        let TopicContainer = require('./containers/TopicContainer').default;
        let topicReducer = require('./module').default;
        injectAsyncReducer(store, 'topicPage', topicReducer);
        cb(null, TopicContainer);
      });
    }
  };
}
