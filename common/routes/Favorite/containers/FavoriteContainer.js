import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { selectFavoritePage, loadFavoriteList } from '../module';

import { loadHeader, selectMenus } from '../../../modules/header';

import Header from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadFavoriteList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  favoritePage: selectFavoritePage(state),
  menus: selectMenus(state)
});

const FavoriteContainer = ({ menus, favoritePage }) => (
  <div>
    <Header menus={menus} />
    <TripletHead active='favorite' />
    <Container>
      {favoritePage.isLoading && <Loading />}
      {!favoritePage.isLoading && favoritePage.newsList.length === 0 && <NotFound />}
      {!favoritePage.isLoading && favoritePage.newsList.length > 0 &&
        <BlockItems12 hasAd={false} newsList={favoritePage.newsList} page={favoritePage.pageData} />
      }
    </Container>
  </div>
);

FavoriteContainer.propTypes = {
  menus: PropTypes.array.isRequired,
  favoritePage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(FavoriteContainer));
