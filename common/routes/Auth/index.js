if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import Basic from '../../components/Basic';
import { injectAsyncReducer } from '../../store';

export default function createRoutes (store) {
  return {
    path: 'auth',
    component: Basic,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        const authFormReducer = require('./module').default;
        injectAsyncReducer(store, 'authPage', authFormReducer);
        cb(null, [
          // {
          //   path: 'active',
          //   getComponents (location, cb) {
          //     require.ensure([
          //       './containers/ActiveContainer'
          //     ], (require) => {
          //       const ActiveContainer = require('./containers/ActiveContainer').default;
          //       cb(null, ActiveContainer);
          //     }, 'activePage');
          //   }
          // },
          // {
          //   path: 'forgot',
          //   getComponents (location, cb) {
          //     require.ensure([
          //       './containers/ForgotContainer'
          //     ], (require) => {
          //       const ForgotContainer = require('./containers/ForgotContainer').default;
          //       cb(null, ForgotContainer);
          //     }, 'fotgotPage');
          //   }
          // },
          // {
          //   path: 'login',
          //   getComponents (location, cb) {
          //     require.ensure([
          //       './containers/LoginContainer'
          //     ], (require) => {
          //       const LoginContainer = require('./containers/LoginContainer').default;
          //       cb(null, LoginContainer);
          //     }, 'loginPage');
          //   }
          // },
          {
            path: 'me',
            getComponents (location, cb) {
              require.ensure([
                './containers/MeContainer'
              ], (require) => {
                const MeContainer = require('./containers/MeContainer').default;
                cb(null, MeContainer);
              }, 'mePage');
            }
          },
          {
            path: 'oauth',
            getComponents (location, cb) {
              require.ensure([
                './containers/OauthContainer'
              ], (require) => {
                const OauthContainer = require('./containers/OauthContainer').default;
                cb(null, OauthContainer);
              }, 'oauthPage');
            }
          // },
          // {
          //   path: 'signup',
          //   getComponents (location, cb) {
          //     require.ensure([
          //       './containers/SignupContainer'
          //     ], (require) => {
          //       const SignupContainer = require('./containers/SignupContainer').default;
          //       cb(null, SignupContainer);
          //     }, 'signupPage');
          //   }
          }
        ]);
      });
    }
  };
}

