import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Content, FontSize, Social, Tags, Thermometer,
  ThermometerSm
} from './NewsContent';
import { PersonalRightSide } from '../News';

import { Container, LeftSide, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForVideo = ({ news }) => (
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
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize />
        <Ad300x250 />
        <Thermometer />
        <PersonalRightSide newsList={[news, news, news, news, news]} />
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

ContentForVideo.propTypes = {
  news: PropTypes.shape().isRequired
};

export default ContentForVideo;
