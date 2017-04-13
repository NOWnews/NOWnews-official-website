import React, { PropTypes } from 'react';
import {
  Content, FontSize, HotVideoBlocks, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { PersonalRightSide } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForVideo = ({ news }) => (
  <Container>
    <video width='100%' height='545' controls>
      <source src='{{news.MainVideo.url}}' type='video/mp4' />
    </video>
    <span>{news.MainVideo && news.MainVideo.desc}</span>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} />
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm />
        <HotVideoBlocks list={[news, news, news, news, news, news]} />
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize />
        <Ad300x250 />
        <Thermometer />
        <PersonalRightSide newsList={[news, news, news, news, news]} />
      </RightSide>
    </Margin10>
  </Container>
);

ContentForVideo.propTypes = {
  news: PropTypes.shape().isRequired
};

export default ContentForVideo;
