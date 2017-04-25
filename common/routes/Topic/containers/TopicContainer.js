import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTopicPage, loadTopics } from '../module';
import { loadHeader, selectMenus } from '../../../modules/header';
import Header from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { Slide } from '../../../components/News';
import { BlockItems, HotTopics } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch, query: { page } }) => Promise.all([
    dispatch(loadTopics(page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  topicPage: selectTopicPage(state),
  menus: selectMenus(state)
});

const TopicPage = ({ topicPage, menus }) => {
  let origins = topicPage.topics || [];
  let slideData = origins.slice(0, 5);
  let blockData = origins.slice(5, 10);
  let { hotTopics, pageData } = topicPage;
  return (
    <Container>
      <Header menus={menus} />
      {topicPage.isLoading && <Loading />}
      {!topicPage.isLoading && origins.length === 0 && <NotFound />}
      {!topicPage.isLoading && origins.length > 0 &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={slideData} />
            <HotTopics topics={hotTopics.slice(0, 6)} />
          </Margin10>
          <BlockItems topics={blockData || []} />
          <Pagination {...pageData} />
        </div>
      }
    </Container>
  );
};

TopicPage.propTypes = {
  topicPage: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(TopicPage));
