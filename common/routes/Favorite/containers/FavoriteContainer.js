import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { selectFavoritePage, loadFavoriteList } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
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
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const FavoriteContainer = ({ marquee, menus, favoritePage }) => (
  <div>
    <Header menus={menus} marquee={marquee} />
    <TripletHead active='favorite' />
    <Container>

      {favoritePage.isLoading && <Loading />}
      <h3>尚未開放，敬請期待！</h3>
      {false && !favoritePage.isLoading && favoritePage.newsList.length === 0 && <NotFound />}
      {!favoritePage.isLoading && favoritePage.newsList.length > 0 &&
        <BlockItems12 hasAd={false} newsList={favoritePage.newsList} page={favoritePage.pageData} />
      }
    </Container>
  </div>
);

FavoriteContainer.propTypes = {
  favoritePage: PropTypes.object.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(FavoriteContainer));
