import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  FontSize, Content, Social, Thermometer, ThermometerSm,
  ReleatedContent, RecommendAds
} from './components';

import { ClearFix } from '../Layout';

import { Ad300x250 } from '../Ad';

const NewsContent = ({ news }) => (
  <div className={css(styles.box)}>
    <img className={css(styles.img)} src={news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
    <span>{news.MainPhoto && news.MainPhoto.desc}</span>
    <div className={css(styles.content)}>
      <div className={css(styles.leftSide)}>
        <Content content={news.content} />
        <Social />
        <ThermometerSm />
        <ReleatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        <ReleatedContent type='你可能會喜歡' list={news.relations} sn={news.sn} />
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
  }
});

NewsContent.propTypes = {
  news: PropTypes.shape().isRequired
};

export default NewsContent;
