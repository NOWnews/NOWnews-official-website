import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectInterestPage, loadInterest } from '../../../modules/interest';

import { Header } from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';
import { OneAdIR, OneAdICIP } from '../../../components/Ad';

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
    <OneAdICIP />
    <TripletHead active='interest' />
    <Container>
      {interest.isLoading && <Loading />}
      {!interest.isLoading && interest.newsList.length === 0 && <NotFound />}
      {!interest.isLoading && interest.newsList.length > 0 &&
        <BlockItems12 newsList={interest.newsList.slice(0, 12)} />}
      <OneAdIR />
    </Container>
  </div>
);

InterestContainer.propTypes = {
  interest: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InterestContainer));
