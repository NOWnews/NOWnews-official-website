if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import InfoContainer from './containers/InfoContainer';

export default function createRoutes (store) {
  return {
    path: 'info',
    component: InfoContainer,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          {
            path: 'about',
            getComponents (location, cb) {
              require.ensure(['./components/About'], (require) => {
                const page = require('./components/About').default;
                cb(null, page);
              }, 'about');
            }
          },
          {
            path: 'copyright',
            getComponents (location, cb) {
              require.ensure(['./components/Copyright'], (require) => {
                const page = require('./components/Copyright').default;
                cb(null, page);
              }, 'copyright');
            }
          },
          {
            path: 'disclaimer',
            getComponents (location, cb) {
              require.ensure(['./components/Disclaimer'], (require) => {
                const page = require('./components/Disclaimer').default;
                cb(null, page);
              }, 'disclaimer');
            }
          },
          {
            path: 'partner',
            getComponents (location, cb) {
              require.ensure(['./components/Partner'], (require) => {
                const page = require('./components/Partner').default;
                cb(null, page);
              }, 'partner');
            }
          },
          {
            path: 'privacy',
            getComponents (location, cb) {
              require.ensure(['./components/Privacy'], (require) => {
                const page = require('./components/Privacy').default;
                cb(null, page);
              }, 'privacy');
            }
          }
        ]);
      });
    }
  };
}
