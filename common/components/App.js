import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import Footer from './Footer';
import Basic from './Basic';
import LogoRow from './Header/LogoRow';
import { selectFooterAds, selectIdleNews } from '../modules/header';
import { setLocal, selectUser } from '../modules/sourceRequest';
import { connect } from 'react-redux';
import StaticContainer from 'react-static-container';

const redial = {
  fetch: ({ dispatch, ...local }) => Promise.all([
    dispatch(setLocal(local))
  ])
};

const mapStateToProps = state => ({
  user: selectUser(state),
  ads: selectFooterAds(state),
  idleNews: selectIdleNews(state)
});

const App = ({ ads, children, user, idleNews }) => (
  <Basic idleNews={idleNews}>
    <LogoRow user={user.name} />
    {children}
    <StaticContainer>
      <Footer ads={ads} />
    </StaticContainer>
  </Basic>
);

App.propTypes = {
  ads: PropTypes.object.isRequired,
  idleNews: PropTypes.array.isRequired,
  children: PropTypes.shape().isRequired,
  user: PropTypes.object
};

export default provideHooks(redial)(connect(mapStateToProps)(App));
