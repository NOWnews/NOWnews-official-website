import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import Footer from './Footer';
import Basic from './Basic';
import { setLocal } from '../modules/sourceRequest';

const redial = {
  fetch: ({ dispatch, path, query }) => Promise.all([
    dispatch(setLocal(path, query))
  ])
};

const App = ({ children }) => (
  <Basic>
    {children}
    <Footer />
  </Basic>
);

App.propTypes = {
  children: PropTypes.shape().isRequired
};

export default provideHooks(redial)(App);
