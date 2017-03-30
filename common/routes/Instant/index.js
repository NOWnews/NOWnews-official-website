if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes (store) {
  return {
    path: 'instant',
    getComponents (location, cb) {
      require.ensure([
        './containers/InstantPage'
      ], (require) => {
        let InstantPage = require('./containers/InstantPage').default;
        cb(null, InstantPage);
      });
    }
  };
}
