if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes (store) {
  return {
    path: 'info/:type',
    getComponents (location, cb) {
      require.ensure([
        './containers/InfoContainer'
      ], (require) => {
        let InfoContainer = require('./containers/InfoContainer').default;
        cb(null, InfoContainer);
      }, 'infoPage');
    }
  };
}
