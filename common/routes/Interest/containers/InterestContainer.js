import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectInterestPage, loadInterest } from '../../../modules/interest';

import { Header } from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadInterest()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  interest: selectInterestPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InterestContainer = ({ marquee, menus, interest }) => (
  <div>
    <Header menus={menus} marquee={marquee} />
    <TripletHead active='interest' />
    <Container>
      {interest.isLoading && <Loading />}
      {!interest.isLoading && interest.newsList.length === 0 && <NotFound />}
      {!interest.isLoading && interest.newsList.length > 0 &&
        <BlockItems12 hasAd={false} newsList={interest.newsList.slice(0, 12)} />}
    </Container>
  </div>
);

InterestContainer.propTypes = {
  interest: PropTypes.object.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InterestContainer));
