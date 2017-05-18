import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectVideoPage, loadVideoList } from '../module';
import { NavBar } from '../../../components/Video';
import { Container, Loading, NotFound } from '../../../components/Layout';
import { BlockItems9, MainVideoPlay, VideoCategories } from '../components';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadVideoList(categoryName, page))
  ])
};

const mapStateToProps = state => ({
  videoPage: selectVideoPage(state)
});

const VideoPage = ({ videoPage }) => {
  const { currentCategory, menus, newsList, pageData, selectedIndex } = videoPage;
  return (
    <div>
      <NavBar selected='VIDEO' />
      {videoPage.isLoading && <Loading />}
      {!videoPage.isLoading && newsList.length > 0 && <MainVideoPlay news={newsList[selectedIndex]} />}
      {!videoPage.isLoading && menus && <VideoCategories menus={menus} currentCategory={currentCategory} />}
      <Container>
        {!videoPage.isLoading && newsList.length === 0 && <NotFound />}
        {!videoPage.isLoading && newsList.length > 0 &&
          <BlockItems9 page={pageData}newsList={newsList.slice(0, 9)} />}
      </Container>
    </div>
  );
};

VideoPage.propTypes = {
  videoPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(VideoPage));
