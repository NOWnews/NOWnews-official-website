import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { selectLBSPage, loadLBSList } from '../module';

import { loadHeader, selectMenus } from '../../../modules/header';

import Header from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadLBSList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  LBSPage: selectLBSPage(state),
  menus: selectMenus(state)
});

const LBSPage = ({ menus, LBSPage }) => (
  <div>
    <Header menus={menus} />
    <TripletHead active='lbs' />
    <Container>
      {LBSPage.isLoading && <Loading />}
      {!LBSPage.isLoading && LBSPage.newsList.length === 0 && <NotFound />}
      {!LBSPage.isLoading && LBSPage.newsList.length > 0 &&
        <BlockItems12 newsList={LBSPage.newsList} page={LBSPage.pageData} />
      }
    </Container>
  </div>
);

LBSPage.propTypes = {
  menus: PropTypes.array.isRequired,
  LBSPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(LBSPage));
