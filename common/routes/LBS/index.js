if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes (store) {
  return {
    path: 'lbs',
    getComponents (location, cb) {
      require.ensure([
        './containers/LBSContainer'
      ], (require) => {
        let LBSContainer = require('./containers/LBSContainer').default;
        cb(null, LBSContainer);
      }, 'LBSPage');
    }
  };
}
