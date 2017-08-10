import React, { PropTypes } from 'react';
import { Content, Tags } from './NewsContent';
import { VideoPlayer } from '../News';
import { Container, LeftSide, Margin10 } from '../Layout';

const PreviewForVideo = ({ news }) => (
  <Container>
    <VideoPlayer src={news.MainVideo.url} poster={news.MainPhoto.large} />
    <i>{news.MainVideo && news.MainVideo.desc}</i>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={16} freeContent={news.freeContent} />
        <Tags tags={news.Tags} />
      </LeftSide>
    </Margin10>
  </Container>
);

PreviewForVideo.propTypes = {
  news: PropTypes.object.isRequired
};

export default PreviewForVideo;
