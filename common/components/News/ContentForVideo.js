import React, { PropTypes } from 'react';
import {
  Content, FontSize, RelatedContent, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { TripletNav, VideoPlayer } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForVideo = ({ news, changeFontSize, fontSize }) => (
  <Container>
    <VideoPlayer src={news.MainVideo.url} poster={news.MainPhoto.url} />
    <i>{news.MainVideo && news.MainVideo.desc}</i>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={fontSize} />
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm />
        <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        {/* <HotVideoBlocks list={news.relations} /> */}
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
