import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectVideoPage, setVideoSource, loadRelatedNews } from '../module';
import { NavBar } from '../../../components/Video';
import { Container, Loading } from '../../../components/Layout';
import { MainVideoPlay, RelatedNews, VideoSelector } from '../components';
import { LogoRow } from '../../../components/Header';

const redial = {
  fetch: ({ dispatch, params: { videoSource } }) => Promise.all([
    dispatch(setVideoSource(videoSource)),
    dispatch(loadRelatedNews(videoSource))
  ])
};

const mapStateToProps = state => ({
  videoPage: selectVideoPage(state)
});

const VideoPage = ({ videoPage }) => {
  return (
    <div>
      <Container>
        <LogoRow />
        <NavBar selected='LY_LIVE' />
        <MainVideoPlay url={videoPage.videoSourceList[videoPage.videoSource - 1].url} />
        {videoPage.isLoading && <Loading />}
        {!videoPage.isLoading && videoPage.newsList.length > 0 &&
        <RelatedNews newsList={videoPage.newsList} />}
        <VideoSelector currentVideoSource={videoPage.videoSource} videoSourceList={videoPage.videoSourceList} />
      </Container>
    </div>
  );
};

VideoPage.propTypes = {
  videoPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(VideoPage));
