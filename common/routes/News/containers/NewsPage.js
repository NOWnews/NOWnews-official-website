import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import Head from '../../../components/News/Head';
import Header from '../../../components/Header';
import NewsContent from '../../../components/News/NewsContent';
import { loadNews, selectCurrentNews } from '../../../modules/currentNews';
import { loadMenus, selectMenus } from '../../../modules/menus';

const redial = {
  fetch: ({ dispatch, params: { id } }) => Promise.all([
    dispatch(loadNews(`news/${id}`)),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  menus: selectMenus(state)
});

const NewsPage = ({ currentNews, menus }) => {
  let {isLoading, data: { newsBy, MainMenu, title, ...news }} = currentNews;
  return (
    <div>
      <Header menus={menus} />
      {isLoading &&
        <div>
          <h2 className={css(styles.loading)}>Loading....</h2>
        </div>}
      {!isLoading &&
        <div>
          <Head newsBy={newsBy} mainMenu={MainMenu} title={title} />
          <NewsContent news={news} />
        </div>}
    </div>
  );
};

NewsPage.propTypes = {
  currentNews: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
});

export default provideHooks(redial)(connect(mapStateToProps)(NewsPage));
