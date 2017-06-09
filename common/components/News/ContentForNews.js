import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Content, FontSize, RecommendAds, RelatedContent, Social,
  Tags, Thermometer, ThermometerSm
} from './NewsContent';
import { SpecialTopicNav, TripletNav } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';
const ContentForNews = ({ news, changeFontSize, interest, fontSize, topics, triplet }) => {
  const randomKey = news.sn % 3;
  const imgApi = `https://imgapiv2.nownews.com/?h=545&q=70&src=`;
  const imgUrl = (news.MainPhoto.url) ? `${imgApi}${news.MainPhoto.url}` : 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg';
  return (
    <Container>
      <div className={css(styles.contentDiv)}>
        <img className={css(styles.contentImg)} src={imgUrl} />
      </div>
      <i>{news.MainPhoto && news.MainPhoto.desc}</i>
      <Margin10 className='clearfix'>
        <LeftSide>
          <Content content={news.content} fontSize={fontSize} />
          {news.freeContent && <div dangerouslySetInnerHTML={{__html: news.freeContent}} />}
          <Tags tags={news.Tags} />
          <Social />
          <ThermometerSm />
          <RelatedContent type='相關新聞' list={news.relations} randomKey={randomKey} />
          <RelatedContent type='你可能會喜歡' list={interest.slice(randomKey, randomKey + 3)} randomKey={randomKey} />
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
};

const styles = StyleSheet.create({
  contentImg: {
    height: 545,
    width: 'auto'
  },
  contentDiv: {
    textAlign: 'center',
    background: '#f1f2f3',
    height: 545
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
