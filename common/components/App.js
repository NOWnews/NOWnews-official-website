import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import Footer from './Footer';
import { GTM } from './Tracking';

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
      link={[
        {async: '', rel: 'stylesheet', href: '/vendor/basscss.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/font-awesome-4.7.0/css/font-awesome.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/carousel.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/video-js.min.css'}
      ]}
    />
    {children}
    <Footer />
    <GTM gtmId='GTM-W25KLJG' />
  </div>
);

App.propTypes = {
  children: PropTypes.shape().isRequired
};
export default App;
