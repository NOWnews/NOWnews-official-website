import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectVideoPage, loadVideoList, nextVideo, selectVideo } from '../module';
import { NavBar } from '../../../components/Video';
import { Container, Loading, NotFound } from '../../../components/Layout';
import { BlockItems9, MainVideoPlay, VideoCategories } from '../components';
import { LogoRow } from '../../../components/Header';
import { IsAdult } from '../../../components/Alert';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadVideoList(categoryName, page))
  ])
};

const mapStateToProps = state => ({
  videoPage: selectVideoPage(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  nextVideo,
  selectVideo
});

const VideoPage = ({ nextVideo, selectVideo, videoPage }) => {
  const { currentCategory, menus, newsList, pageData, selectedIndex } = videoPage;
  const maxIndex = newsList.length - 1;
  return (
    <div>
      <IsAdult isAdult={currentCategory.isAdult} />
      <LogoRow />
      <NavBar selected='VIDEO' />
      {videoPage.isLoading && <Loading />}
      {!videoPage.isLoading && newsList.length > 0 &&
        <MainVideoPlay
          showNextButton={selectedIndex !== maxIndex}
          nextVideo={nextVideo}
          news={newsList[selectedIndex]} />}
      {!videoPage.isLoading && menus && <VideoCategories menus={menus} currentCategory={currentCategory} />}
      <Container>
        {!videoPage.isLoading && newsList.length === 0 && <NotFound />}
        {!videoPage.isLoading && newsList.length > 0 &&
          <BlockItems9 newsList={newsList.slice(0, 9)}
            page={pageData}
            selectVideo={selectVideo} />}
      </Container>
    </div>
  );
};

VideoPage.propTypes = {
  videoPage: PropTypes.object.isRequired,
  nextVideo: PropTypes.func.isRequired,
  selectVideo: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(VideoPage));
