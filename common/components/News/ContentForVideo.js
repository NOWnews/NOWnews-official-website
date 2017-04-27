import React, { PropTypes } from 'react';
import {
  Content, FontSize, HotVideoBlocks, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { TripletNav } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForVideo = ({ news, changeFontSize, fontSize }) => (
  <Container>
    <video width='100%' height='545' controls>
      <source src='{{news.MainVideo.url}}' type='video/mp4' />
    </video>
    <span>{news.MainVideo && news.MainVideo.desc}</span>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={fontSize} />
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm />
        <HotVideoBlocks list={[news, news, news, news, news, news]} />
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize changeFontSize={changeFontSize} />
        <Ad300x250 />
        <Thermometer />
        <TripletNav newsList={[news, news, news, news, news]} />
      </RightSide>
    </Margin10>
  </Container>
);

ContentForVideo.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default ContentForVideo;
