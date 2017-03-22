import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { loadNews, selectCurrentNews } from '../../../modules/news';
import Head from '../../../components/News/Head';
import NewsContent from '../../../components/News/NewsContent';

const redial = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadNews(`news/${id}`))
};

const mapStateToProps = state => selectCurrentNews(state);

const NewsPage = ({data, isLoading}) => {
  let { newsBy, MainMenu, title, ...news } = data;
  return (
    <div>
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
  data: PropTypes.object,
  isLoading: PropTypes.bool
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
