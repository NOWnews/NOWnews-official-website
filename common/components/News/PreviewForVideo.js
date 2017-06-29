import React, { PropTypes } from 'react';
import { Content, FontSize, Tags } from './NewsContent';
import { VideoPlayer } from '../News';
import { Container, LeftSide, Margin10, RightSide } from '../Layout';

const PreviewForVideo = ({ news, changeFontSize, fontSize }) => (
  <Container>
    <VideoPlayer src={news.MainVideo.url} poster={news.MainPhoto.url} />
    <i>{news.MainVideo && news.MainVideo.desc}</i>
    <Margin10 className='clearfix'>
      <LeftSide>
        <Content content={news.content} fontSize={fontSize} freeContent={news.freeContent} />
        <Tags tags={news.Tags} />
      </LeftSide>
      <RightSide>
        <FontSize changeFontSize={changeFontSize} />
      </RightSide>
    </Margin10>
  </Container>
);

PreviewForVideo.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  news: PropTypes.object.isRequired
};

export default PreviewForVideo;
