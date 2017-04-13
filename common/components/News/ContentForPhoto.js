import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { PersonalRightSide, SpecialTopicNav } from '../News';

import { Container, LeftSide, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const NewsContent = ({ news }) => (
  <Container>
    <div className={css(styles.contentDiv)}>
      <span className={css(styles.contentImg)} style={{backgroundImage: `url(${news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'})`}} />
    </div>
    <span>{news.MainPhoto && news.MainPhoto.desc}</span>
    <div className={`clearfix ${css(styles.content)}`}>
      <LeftSide>
        <Content content={news.content} />
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm />
        <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        <RelatedContent type='你可能會喜歡' list={news.relations} sn={news.sn} />
        <RecommendAds />
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize />
        <Ad300x250 />
        <Thermometer />
        <PersonalRightSide newsList={[news, news, news, news, news]} />
        <Ad300x250 />
        <SpecialTopicNav list={[1, 2, 3, 4, 5, 6]} />
        <Ad300x250 />
      </RightSide>
    </div>
  </Container>
);

const styles = StyleSheet.create({
  content: {
    margin: '1rem 0'
  },
  contentImg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    display: 'inline-block',
    backgroundPosition: 'center center',
    width: '100%',
    height: '545px'
  },
  contentDiv: {
    background: '#f1f2f3',
    height: '545px'
  }
});

NewsContent.propTypes = {
  news: PropTypes.shape().isRequired
};

export default NewsContent;
