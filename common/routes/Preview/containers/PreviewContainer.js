import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadHeader, selectMenus } from '../../../modules/header';
import { loadPreview, selectCurrentNews } from '../../News/module';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Layout';
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
      {isLoading && <Loading />}
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

export default provideHooks(redial)(connect(mapStateToProps)(PreviewPage));
