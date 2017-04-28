import moment from 'moment';
import { provideHooks } from 'redial';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { DynamicHeader, Header } from '../../../components/Header';
import { Ad970x250 } from '../../../components/Ad';
import { Container, Loading } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo } from '../../../components/News';

import { changeFontSize, changeNewsTitle, loadNews, selectCurrentNews } from '../module';
import { loadHeader, selectMenus } from '../../../modules/header';

const redial = {
  fetch: ({ dispatch, params: { sn } }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadNews(sn))
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  changeFontSize,
  changeNewsTitle,
  loadNews
});

class NewsContainer extends Component {
  constructor (props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.touchWindowTop = this.touchWindowTop.bind(this);
  }

  componentDidMount () {
    // 第一次 SSR 完將 scroll 置頂
    if (this.props.currentNews.isSSRAndInit) {
      setTimeout(function () {
        window.document.body.scrollTop = 0;
      }, 100);
    }
  }

  loadItems () {
    const newsData = this.props.currentNews.data;
    const sn = newsData[newsData.length - 1].next.sn;
    const isLoadMore = true;
    this.props.loadNews(sn, isLoadMore);
  }

  touchWindowTop (item, index) {
    const { sn, startedAt, title } = this.props.currentNews.data[index];
    const originalSn = window.location.pathname.split('/')[3];
    if (parseInt(originalSn, 10) !== sn) {
      const formatStartedAt = moment(startedAt).format('YYYYMMDD');
      window.history.pushState(null, null, `/news/${formatStartedAt}/${sn}`);
      this.props.changeNewsTitle(title);
    }
  }

  render () {
    const { isLoading, data = [], hasMore, fontSize, newsTitle } = this.props.currentNews;
    const currentMainMenu = data[0] && data[0].MainMenu.id;
    const totalLength = data.length;
    const items = data.map((item, i) => {
      const { formatStartedAt, newsBy, MainMenu, title, type, ...news } = item;
      const contentProps = {
        news,
        changeFontSize: this.props.changeFontSize,
        fontSize
      };

      return (
        <div key={news.sn}>
          <Head newsBy={newsBy} mainMenu={MainMenu} time={formatStartedAt} title={title} />
          { type === 'NEWS' && <ContentForNews {...contentProps} /> }
          { type === 'PHOTO' && <ContentForPhoto {...contentProps} /> }
          { type === 'VIDEO' && <ContentForVideo {...contentProps} /> }
          {(totalLength - 1) !== i && <Container><Ad970x250 /></Container>}
        </div>
      );
    });

    return (
      <div>
        <Header menus={this.props.menus} currentMainMenu={currentMainMenu} />
        <DynamicHeader menus={this.props.menus} currentMainMenu={currentMainMenu} newsTitle={newsTitle} />
        {isLoading &&
          <div>
            <div>{items}</div>
            <Loading />
          </div>}
        {!isLoading &&
          <InfiniteScroll
            pageStart={0}
            loader={<div>Load More ...</div>}
            loadMore={this.loadItems}
            hasMore={hasMore}
            touchWindowTop={this.touchWindowTop}>
            <div>{items}</div>
          </InfiniteScroll>}
      </div>
    );
  }
}

NewsContainer.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  changeNewsTitle: PropTypes.func.isRequired,
  currentNews: PropTypes.object.isRequired,
  loadNews: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsContainer));
