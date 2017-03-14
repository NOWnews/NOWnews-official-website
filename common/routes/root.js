// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import Home from './Home';
import App from '../components/App';

export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./Category').default(store), // no need to modify store, no reducer
          require('./News').default(store),
          require('./Preview').default(store)
        ]);
      });
    },

    indexRoute: {
      component: Home
    }
  };

  return root;
}
