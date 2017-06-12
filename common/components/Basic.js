import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import { GTM } from './Tracking';
// import Idle from './Idle';

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});

const Basic = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
      link={[
        {async: '', rel: 'stylesheet', href: '/vendor/basscss.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/font-awesome-4.7.0/css/font-awesome.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/carousel.min.css'},
        {async: '', rel: 'stylesheet', href: '/vendor/video-js.min.css'}
      ]}
    />

    {/* 目前先不放 <Idle /> */}
    {children}
    <GTM gtmId='GTM-W25KLJG' />
  </div>
);

Basic.propTypes = {
  children: PropTypes.any.isRequired
};
export default Basic;
