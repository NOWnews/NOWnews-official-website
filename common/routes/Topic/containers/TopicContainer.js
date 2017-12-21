import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTopicPage, loadTopics } from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLocal } from '../../../modules/sourceRequest';
import { Header } from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { Slide } from '../../../components/News';
import { BlockItems, TopicRight } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';
import { DFP } from '../../../components/Ad';

const redial = {
  fetch: ({ dispatch, query: { page } }) => Promise.all([
    dispatch(loadTopics(page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  topicPage: selectTopicPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const TopicContainer = ({ local, topicPage, menus, marquee }) => {
  const { pageData, topics } = topicPage;
  return (
    <Container>
      <Header menus={menus} marquee={marquee} />
      {topicPage.isLoading && <Loading />}
      {!topicPage.isLoading && topics.length === 0 && <NotFound />}
      {!topicPage.isLoading && topics.length > 0 &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={topics.slice(0, 5)} type='topic' />
            <TopicRight topics={topics.slice(5, 10)} />
          </Margin10>
          <BlockItems topics={topics.slice(10, 19)} />
          <Pagination {...pageData} {...local} />
        </div>
      }
      <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
    </Container>
  );
};

TopicContainer.propTypes = {
  local: PropTypes.object.isRequired,
  topicPage: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(TopicContainer));
