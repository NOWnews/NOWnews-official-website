import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { SpecialTopicNav, TripletNav } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForNews = ({ news, changeFontSize, interest, fontSize, topics, triplet }) => (
  <Container>
    <div className={css(styles.contentDiv)}>
      <span className={css(styles.contentImg)}
        style={{
          backgroundImage: `url(${news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'})`,
          fontSize
        }} />
    </div>
    <i>{news.MainPhoto && news.MainPhoto.desc}</i>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={fontSize} />
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm />
        <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        <RelatedContent type='你可能會喜歡' list={interest.slice(0, 3)} sn={news.sn} />
        <RecommendAds />
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize changeFontSize={changeFontSize} />
        <Ad300x250 />
        <Thermometer />
        <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
        <Ad300x250 />
        <SpecialTopicNav list={topics} />
        <Ad300x250 />
      </RightSide>
    </Margin10>
  </Container>
);

const styles = StyleSheet.create({
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

ContentForNews.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  interest: PropTypes.array.isRequired,
  news: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForNews;
