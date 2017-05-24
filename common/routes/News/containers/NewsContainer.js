import { provideHooks } from 'redial';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { FixedHeader, Header } from '../../../components/Header';
import { Ad970x250 } from '../../../components/Ad';
import { Container, Loading } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo } from '../../../components/News';
import {
  changeFontSize, changeNewsTitle, loadNews, loadMoreNews, selectCurrentNews,
  showFixedHeader
} from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { IsAdult } from '../../../components/Alert';

const redial = {
  fetch: ({ dispatch, params: { sn } }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadNews(sn))
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  LBS: selectLBS(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  changeFontSize,
  changeNewsTitle,
  loadLBSList,
  loadMoreNews,
  showFixedHeader
});

class NewsContainer extends Component {
  constructor (props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.touchWindowTop = this.touchWindowTop.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount () {
    // 第一次 SSR 完將 scroll 置頂
    if (this.props.currentNews.isSSRAndInit) {
      setTimeout(function () {
        window.document.body.scrollTop = 0;
      }, 100);
    }
    this.props.loadLBSList();
    window.addEventListener('scroll', this.scrollListener);
  }

  loadItems () {
    const newsData = this.props.currentNews.data;
    const sn = newsData[newsData.length - 1].next.sn;
    this.props.loadMoreNews(sn);
  }

  scrollListener () {
    if (this.props.currentNews.showFixedHeader && window.scrollY < 200) {
      this.props.showFixedHeader(false);
    } else if (!this.props.currentNews.showFixedHeader && window.scrollY > 200) {
      this.props.showFixedHeader(true);
    }
  }

  touchWindowTop (item, index) {
    const { sn, title, parseUrl } = this.props.currentNews.data[index];
    const originalSn = window.location.pathname.split('/')[3];
    if (parseInt(originalSn, 10) !== sn) {
      window.history.pushState(null, null, parseUrl);
      this.props.changeNewsTitle(title);
      window.dataLayer.push({'event': 'trackPageView'});
    }
  }

  render () {
    const { currentNews, changeFontSize, LBS, menus, marquee } = this.props;
    const {
      isLoading, data = [], hasMore, fontSize, newsTitle,
      showFixedHeader, topics
    } = currentNews;
    const currentMainMenu = data[0] && data[0].MainMenu.id;
    const totalLength = data.length;
    const triplet = {
      list: {
        instant: marquee,
        interest: [],
        lbs: LBS.newsList
      },
      mapCity: LBS.mapCity
    };
    const items = data.map((item, i) => {
      const { formatStartedAt, newsBy, MainMenu, title, type, ...news } = item;
      const contentProps = {
        changeFontSize,
        fontSize,
        news,
        topics,
        triplet
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

    let currentChildMenu;

    if (data.length > 0) {
      data[0].Menus.forEach(({ ParentId, id }) => {
        if (!currentChildMenu && ParentId === currentMainMenu) {
          currentChildMenu = id;
        }
      });
    }
    return (
      <div>
        {!isLoading && <IsAdult isAdult={data[0].isAdult} />}
        <Header menus={menus} marquee={marquee}
          currentChildMenu={currentChildMenu}
          currentMainMenu={currentMainMenu} />
        {showFixedHeader && <FixedHeader menus={this.props.menus}
          currentMainMenu={currentMainMenu} newsTitle={newsTitle} />}
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
  LBS: PropTypes.object,
  loadLBSList: PropTypes.func.isRequired,
  loadMoreNews: PropTypes.func.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
  showFixedHeader: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsContainer));
