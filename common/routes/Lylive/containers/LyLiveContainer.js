import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectLylivePage, setVideoSource, loadRelatedNews } from '../module';
import { NavBar } from '../../../components/Video';
import { Container, Loading } from '../../../components/Layout';
import { MainVideoPlay, RelatedNews, VideoSelector } from '../components';
import { DFP, OneAd } from '../../../components/Ad';
import { loadHeader } from '../../../modules/header';

const redial = {
  fetch: ({ dispatch, params: { videoSource } }) => Promise.all([
    dispatch(loadHeader()),
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
      <OneAd />
      <Container>
        <NavBar selected='LY_LIVE' />
        <MainVideoPlay url={lylivePage.videoSourceList[lylivePage.videoSource - 1].url} />
        {lylivePage.isLoading && <Loading />}
        {!lylivePage.isLoading &&
        <RelatedNews newsList={lylivePage.newsList} />}
        <VideoSelector currentVideoSource={lylivePage.videoSource} videoSourceList={lylivePage.videoSourceList} />
        <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
      </Container>
    </div>
  );
};

LylivePage.propTypes = {
  lylivePage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(LylivePage));
