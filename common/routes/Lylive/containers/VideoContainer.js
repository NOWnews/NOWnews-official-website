import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectLylivePage, setVideoSource, loadRelatedNews } from '../module';
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
  lylivePage: selectLylivePage(state)
});

const LylivePage = ({ lylivePage }) => {
  return (
    <div>
      <Container>
        <LogoRow />
        <NavBar selected='LY_LIVE' />
        <MainVideoPlay url={lylivePage.videoSourceList[lylivePage.videoSource - 1].url} />
        {lylivePage.isLoading && <Loading />}
        {!lylivePage.isLoading && lylivePage.newsList.length > 0 &&
        <RelatedNews newsList={lylivePage.newsList} />}
        <VideoSelector currentVideoSource={lylivePage.videoSource} videoSourceList={lylivePage.videoSourceList} />
      </Container>
    </div>
  );
};

LylivePage.propTypes = {
  lylivePage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(LylivePage));
