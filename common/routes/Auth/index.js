if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import Basic from '../../components/Basic';

export default function createRoutes (store) {
  return {
    path: 'auth',
    component: Basic,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          {
            path: 'signup',
            getComponents (location, cb) {
              require.ensure([
                './containers/SignupContainer'
              ], (require) => {
                const SignupContainer = require('./containers/SignupContainer').default;
                cb(null, SignupContainer);
              }, 'singupPage');
            }
          },
          {
            path: 'login',
            getComponents (location, cb) {
              require.ensure([
                './containers/LoginContainer'
              ], (require) => {
                const LoginContainer = require('./containers/LoginContainer').default;
                cb(null, LoginContainer);
              }, 'loginPage');
            }
          }
        ]);
      });
    }
  };
}

