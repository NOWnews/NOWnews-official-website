import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { loadPreview, selectCurrentNews } from '../../News/module';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Layout';
import { Head, PreviewForNews, PreviewForPhoto, PreviewForVideo } from '../../../components/News';

const redial = {
  fetch: ({ dispatch, params: { redisKey } }) => Promise.all([
    dispatch(loadPreview(redisKey)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const PreviewPage = ({ currentNews, marquee, menus }) => {
  let {isLoading, data} = currentNews;
  let [{ createdAt, startedAt, newsBy, MainMenu, title, type, ...news }] = data;
  let contentProps = {
    news
  };
  return (
    <div>
      <Header menus={menus} marquee={marquee} />
      {isLoading && <Loading />}
      {!isLoading &&
        <div>
          <Head newsBy={newsBy} mainMenu={MainMenu} time={startedAt || createdAt} title={title} />
          { type === 'NEWS' && <PreviewForNews {...contentProps} /> }
          { type === 'PHOTO' && <PreviewForPhoto {...contentProps} /> }
          { type === 'VIDEO' && <PreviewForVideo {...contentProps} /> }
        </div>}
    </div>
  );
};

PreviewPage.propTypes = {
  currentNews: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(PreviewPage));
