import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { selectInterestPage, loadInterestList } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch, query: { page } }) => Promise.all([
    dispatch(loadInterestList(page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  interestPage: selectInterestPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InterestContainer = ({ marquee, menus, interestPage }) => (
  <div>
    <Header menus={menus} marquee={marquee} />
    <TripletHead active='interest' />
    <Container>

      {interestPage.isLoading && <Loading />}
      <h3>尚未開放，敬請期待！</h3>
      {false && !interestPage.isLoading && interestPage.newsList.length === 0 && <NotFound />}
      {!interestPage.isLoading && interestPage.newsList.length > 0 &&
        <BlockItems12 hasAd={false} newsList={interestPage.newsList} page={interestPage.pageData} />
      }
    </Container>
  </div>
);

InterestContainer.propTypes = {
  interestPage: PropTypes.object.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InterestContainer));
