import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞' />
    <Header />
    {children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.shape().isRequired
};
export default App;
