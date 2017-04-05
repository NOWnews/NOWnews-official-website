import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { loadMenus, selectMenus } from '../../../modules/menus';
import { loadPreview, selectCurrentNews } from '../../../modules/currentNews';
import Head from '../../../components/News/Head';
import Header from '../../../components/Header';
import NewsContent from '../../../components/News/NewsContent';

const redial = {
  fetch: ({ dispatch, params: { redisKey } }) => Promise.all([
    dispatch(loadPreview(redisKey)),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  menus: selectMenus(state)
});

const PreviewPage = ({ currentNews, menus }) => {
  let {isLoading, data} = currentNews;
  let [{ formatStartedAt, newsBy, MainMenu, title, ...news }] = data;
  news.relations = [];

  return (
    <div>
      <Header menus={menus} />
      {isLoading &&
        <div>
          <h2 className={css(styles.loading)}>Loading....</h2>
        </div>}
      {!isLoading &&
        <div>
          <Head newsBy={newsBy} mainMenu={MainMenu} time={formatStartedAt} title={title} />
          <NewsContent news={news} />
        </div>}
    </div>
  );
};

PreviewPage.propTypes = {
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

export default provideHooks(redial)(connect(mapStateToProps)(PreviewPage));
