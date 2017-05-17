// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import App from '../components/App';
export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./Category').default(store), // no need to modify store, no reducer
          require('./Channel').default(store),
          require('./Interest').default(store),
          require('./Info').default(store),
          require('./Instant').default(store),
          require('./LBS').default(store),
          require('./News').default(store),
          require('./Preview').default(store),
          require('./Search').default(store),
          require('./Topic').default(store)
        ]);
      });
    },
    getIndexRoute (location, cb) {
      require.ensure([], function (require) {
        cb(null, require('./Home').default(store));
      });
    }
  };

  return root;
}
