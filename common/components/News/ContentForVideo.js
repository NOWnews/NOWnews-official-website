import React, { PropTypes } from 'react';
import {
  Content, FontSize, RelatedContent, Social, Tags,
  Thermometer, ThermometerSm
} from './NewsContent';
import { TripletNav, VideoPlayer } from '../News';

import { Container, LeftSide, Margin10, RightSide } from '../Layout';

import { Ad300x250 } from '../Ad';

const ContentForVideo = ({ news, changeFontSize, fontSize, onWarm, triplet }) => (
  <Container>
    <VideoPlayer src={news.MainVideo.url} poster={news.MainPhoto.url} />
    <i>{news.MainVideo && news.MainVideo.desc}</i>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={fontSize} />
        {news.freeContent && <div dangerouslySetInnerHTML={{__html: news.freeContent}} />}
        <Tags tags={news.Tags} />
        <Social />
        <ThermometerSm onWarm={onWarm} />
        <RelatedContent type='相關新聞' list={news.relations} sn={news.sn} />
        {/* <HotVideoBlocks list={news.relations} /> */}
      </LeftSide>
      <RightSide>
        <Social />
        <FontSize changeFontSize={changeFontSize} />
        <Ad300x250 />
        <Thermometer pv={1} onWarm={onWarm} />
        <TripletNav list={triplet.list} mapCity={triplet.mapCity} />
      </RightSide>
    </Margin10>
  </Container>
);

ContentForVideo.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  onWarm: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
  triplet: PropTypes.object.isRequired
};

export default ContentForVideo;
