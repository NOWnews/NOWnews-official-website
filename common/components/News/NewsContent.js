import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  FontSize, Content, Social, Thermometer, ThermometerSm,
  ReleatedContent, RecommendAds
} from './components';

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
        <ReleatedContent type='相關新聞' list={news.relations} />
        <ReleatedContent type='你可能會喜歡' list={news.relations} />
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
    </div>
  </div>
);

const styles = StyleSheet.create({
  box: {
    width: 900,
    margin: '0 auto'
  },
  content: {
    display: 'inline-flex',
    margin: '1rem 0'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  leftSide: {
    width: 670
  },
  rightSide: {
    width: 300
  }
});

NewsContent.propTypes = {
  news: PropTypes.shape().isRequired
};

export default NewsContent;
