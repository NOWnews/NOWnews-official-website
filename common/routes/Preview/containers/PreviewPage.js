import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNews } from '../../News/actions';
import { StyleSheet, css } from 'aphrodite';
import { selectCurrentNews } from '../../News/reducer';
import { Head, MainContent } from '../../News/components';

const redial = {
  fetch: ({ dispatch, params: { redisKey } }) => dispatch(loadNews(`previews/${redisKey}`))
};

const mapStateToProps = state => selectCurrentNews(state);

const NewsPage = ({data = {}, isLoading}) => {
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
          <MainContent news={news} />
        </div>}
    </div>
  );
};

NewsPage.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const styles = StyleSheet.create({
  content: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '1rem 0',
    color: '#555'
  },
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
