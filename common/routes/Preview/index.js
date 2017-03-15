if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
// import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'preview/:redisKey',
    getComponents (location, cb) {
      require.ensure([
        './containers/PreviewPage'
      ], (require) => {
        let PreviewPage = require('./containers/PreviewPage').default;
        cb(null, PreviewPage);
      });
    }
  };
}
