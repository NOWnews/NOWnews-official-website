import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import Footer from './Footer';

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
      link={[
        {rel: 'stylesheet', href: 'https://unpkg.com/basscss@8.0.2/css/basscss.min.css'},
        {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
        {rel: 'stylesheet', href: 'http://react-responsive-carousel.js.org/carousel.css'},
        {rel: 'stylesheet', href: 'http://vjs.zencdn.net/5.19.2/video-js.css'}
      ]}
    />
    {children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.shape().isRequired
};
export default App;
