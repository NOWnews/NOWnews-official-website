if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes (store) {
  return {
    path: 'interest',
    getComponents (location, cb) {
      require.ensure([
        './containers/InterestContainer'
      ], (require) => {
        let InterestContainer = require('./containers/InterestContainer').default;
        cb(null, InterestContainer);
      }, 'interestPage');
    }
  };
}
