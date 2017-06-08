import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLocal } from '../../../modules/sourceRequest';
import { selectVideoPage, loadVideoList, nextVideo, selectVideo } from '../module';
import { NavBar } from '../../../components/Video';
import { Container, Loading, NotFound } from '../../../components/Layout';
import { BlockItems9, MainVideoPlay, VideoCategories } from '../components';
import { IsAdult } from '../../../components/Alert';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadVideoList(categoryName, page))
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  videoPage: selectVideoPage(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  nextVideo,
  selectVideo
});

const VideoPage = ({ local, nextVideo, selectVideo, videoPage }) => {
  const { currentCategory, currentMenu, menus, newsList, pageData, selectedIndex } = videoPage;
  const maxIndex = newsList.length - 1;
  return (
    <div>
      <IsAdult isAdult={currentMenu.isAdult} />
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
            local={local}
            page={pageData}
            selectVideo={selectVideo} />}
      </Container>
    </div>
  );
};

VideoPage.propTypes = {
  local: PropTypes.object.isRequired,
  videoPage: PropTypes.object.isRequired,
  nextVideo: PropTypes.func.isRequired,
  selectVideo: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(VideoPage));
