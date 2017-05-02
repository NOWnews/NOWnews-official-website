import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTopicPage, loadTopics } from '../module';
import { loadHeader, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { Slide } from '../../../components/News';
import { BlockItems, TopicRight } from '../components';
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

const TopicContainer = ({ topicPage, menus }) => {
  let { pageData, topics } = topicPage;
  return (
    <Container>
      <Header menus={menus} />
      {topicPage.isLoading && <Loading />}
      {!topicPage.isLoading && topics.length === 0 && <NotFound />}
      {!topicPage.isLoading && topics.length > 0 &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={topics.slice(0, 5)} />
            <TopicRight topics={topics.slice(5, 10)} />
          </Margin10>
          <BlockItems topics={topics.slice(10, 20)} />
          <Pagination {...pageData} />
        </div>
      }
    </Container>
  );
};

TopicContainer.propTypes = {
  topicPage: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(TopicContainer));
