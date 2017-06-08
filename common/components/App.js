import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import Footer from './Footer';
import Basic from './Basic';
import LogoRow from './Header/LogoRow';
import { setLocal, selectUser } from '../modules/sourceRequest';
import { connect } from 'react-redux';

const redial = {
  fetch: ({ dispatch, ...local }) => Promise.all([
    dispatch(setLocal(local))
  ])
};

const mapStateToProps = state => ({
  user: selectUser(state)
});

const App = ({ children, user }) => (
  <Basic>
    <LogoRow user={user.name} />
    {children}
    <Footer />
  </Basic>
);

App.propTypes = {
  children: PropTypes.shape().isRequired,
  user: PropTypes.object
};

export default provideHooks(redial)(connect(mapStateToProps)(App));
