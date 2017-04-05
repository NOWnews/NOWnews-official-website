import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  FontSize, Content, Social, Thermometer, ThermometerSm,
  RelatedContent, RecommendAds
} from './components';

import { ClearFix } from '../Layout';

import { Ad300x250 } from '../Ad';

const NewsContent = ({ news }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.contentdiv)}>
      <span className={css(styles.contentimag)} style={{backgroundImage: `url(${news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'})`}} />
    </div>
    { /* <img className={css(styles.img)} src={news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} /> */ }
    <span>{news.MainPhoto && news.MainPhoto.desc}</span>
    <div className={css(styles.content)}>
      <div className={css(styles.leftSide)}>
        <Content content={news.content} />
        <Social />
        <ThermometerSm />
        <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        <RelatedContent type='你可能會喜歡' list={news.relations} sn={news.sn} />
        <RecommendAds />
      </div>
      <div className={css(styles.rightSide)}>
        <Social />
        <FontSize />
        <Ad300x250 />
        <Thermometer />
        <Ad300x250 />
        <Ad300x250 />
      </div>
      <ClearFix />
    </div>
  </div>
);

const styles = StyleSheet.create({
  box: {
    width: 970,
    margin: '0 auto'
  },
  content: {
    margin: '1rem 0'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  leftSide: {
    float: 'left',
    width: 670
  },
  rightSide: {
    float: 'left',
    width: 300
  },
  contentimag: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'inline-block',
    backgroundPosition: 'center center',
    width: '100%',
    height: '545px'
  },
  contentdiv: {
    background: '#f1f2f3',
    height: '545px'
  }
});

NewsContent.propTypes = {
  news: PropTypes.shape().isRequired
};

export default NewsContent;
