import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { loadHeader, selectMenus } from '../../../modules/header';
import { loadPreview, selectCurrentNews } from '../../News/module';
import Header from '../../../components/Header';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo } from '../../../components/News';

const redial = {
  fetch: ({ dispatch, params: { redisKey } }) => Promise.all([
    dispatch(loadPreview(redisKey)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  menus: selectMenus(state)
});

const PreviewPage = ({ currentNews, menus, changeFontSize }) => {
  let {isLoading, data, fontSize} = currentNews;
  let [{ formatStartedAt, newsBy, MainMenu, title, type, ...news }] = data;
  let contentProps = {
    news,
    changeFontSize,
    fontSize
  };
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
          { type === 'NEWS' && <ContentForNews {...contentProps} /> }
          { type === 'PHOTO' && <ContentForPhoto {...contentProps} /> }
          { type === 'VIDEO' && <ContentForVideo {...contentProps} /> }
        </div>}
    </div>
  );
};

PreviewPage.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  currentNews: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
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
