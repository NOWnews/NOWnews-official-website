import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import StaticContainer from 'react-static-container';
import { GTM } from './Tracking';
// import Idle from './Idle';
// import Perf from 'react-addons-perf';

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});
class Basic extends Component {

  render () {
    return (
      <div className={css(styles.root)}>
        <StaticContainer>
          <div>
            <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
              link={[
                {async: '', rel: 'stylesheet', href: '/vendor/basscss.min.css'},
                {async: '', rel: 'stylesheet', href: '/vendor/font-awesome-4.7.0/css/font-awesome.min.css'},
                {async: '', rel: 'stylesheet', href: '/vendor/carousel.min.css'},
                {async: '', rel: 'stylesheet', href: '/vendor/video-js.min.css'}
              ]}
              meta={[
                {charset: 'utf-8'},
                {property: 'fb:app_id', content: 132863386747341},
                {property: 'fb:pages', content: 102884532662}
              ]} />
            <GTM gtmId='GTM-W25KLJG' />
          </div>
        </StaticContainer>
        {/* 目前先不放 <Idle /> */}
        {this.props.children}
      </div>
    );
  }
}

Basic.propTypes = {
  children: PropTypes.any.isRequired
};
export default Basic;
