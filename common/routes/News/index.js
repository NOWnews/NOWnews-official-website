if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes (store) {
  return {
    path: 'news/:date/:sn',
    getComponents (location, cb) {
      require.ensure([
        './containers/NewsContainer'
      ], (require) => {
        let NewsContainer = require('./containers/NewsContainer').default;
        cb(null, NewsContainer);
      });
    }
  };
}
