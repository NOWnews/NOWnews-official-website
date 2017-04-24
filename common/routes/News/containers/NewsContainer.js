import moment from 'moment';
import { provideHooks } from 'redial';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Header from '../../../components/Header';
import { Ad970x250 } from '../../../components/Ad';
import { Container, Loading } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo } from '../../../components/News';

import { changeFontSize, loadNews, selectCurrentNews } from '../module';
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
  loadNews
});

class NewsPage extends Component {
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
    let newsData = this.props.currentNews.data;
    let sn = newsData[newsData.length - 1].next.sn;
    let isLoadMore = true;
    this.props.loadNews(sn, isLoadMore);
  }

  touchWindowTop (item, index) {
    let { sn, startedAt } = this.props.currentNews.data[index];
    let formatStartedAt = moment(startedAt).format('YYYYMMDD');
    window.history.pushState(null, null, `/news/${formatStartedAt}/${sn}`);
  }

  render () {
    let { isLoading, data = [], hasMore, fontSize } = this.props.currentNews;
    let items = [];
    let totalLength = data.length;
    data.map((item, i) => {
      let { formatStartedAt, newsBy, MainMenu, title, type, ...news } = item;

      let contentProps = {
        news,
        changeFontSize: this.props.changeFontSize,
        fontSize
      };

      items.push(
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
        <Header menus={this.props.menus} currentMainMenu={data[0] && data[0].MainMenu.id} />
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

NewsPage.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  currentNews: PropTypes.object.isRequired,
  loadNews: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsPage));
