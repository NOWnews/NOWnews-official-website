import { provideHooks } from 'redial';
import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { FixedHeader, Header } from '../../../components/Header';
import { DFP, getAdType } from '../../../components/Ad';
import { Container } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo } from '../../../components/News';
import {
  changeFontSize, changeNewsTitle, loadNews, loadMoreNews, onWarm,
  selectCurrentNews, showFixedHeader
} from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { selectInterest, loadInterest } from '../../../modules/interest';
import { IsAdult } from '../../../components/Alert';
import { MicroDataNews } from '../../../components/JSONLD';
import { trackCode } from '../../../../lib/track/pageview';
const redial = {
  fetch: ({ dispatch, params: { sn }, fontSize }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadNews(sn, fontSize))
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  interest: selectInterest(state),
  LBS: selectLBS(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  changeFontSize,
  changeNewsTitle,
  loadInterest,
  loadLBSList,
  loadMoreNews,
  onWarm,
  showFixedHeader
});

class NewsContainer extends PureComponent {
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
    this.props.loadInterest();
    this.props.loadLBSList();
    window.addEventListener('scroll', this.scrollListener);
  }
  loadItems () {
    const newsData = this.props.currentNews.data;
    if (!this.props.currentNews.isLoading) {
      const sn = newsData[newsData.length - 1].next.sn;
      this.props.loadMoreNews(sn);
    }
  }

  scrollListener () {
    if (this.props.currentNews.showFixedHeader && window.scrollY < 200) {
      this.props.showFixedHeader(false);
    } else if (!this.props.currentNews.showFixedHeader && window.scrollY > 200) {
      this.props.showFixedHeader(true);
    }
  }

  touchWindowTop (item, index) {
    const news = this.props.currentNews.data[index];
    const { sn, title, parseUrl } = news;
    const originalSn = window.location.pathname.split('/')[3];
    if (parseInt(originalSn, 10) !== sn) {
      window.history.pushState(null, null, parseUrl);
      this.props.changeNewsTitle(title);
      trackCode(news);
    }
  }

  render () {
    const { currentNews, changeFontSize, interest, LBS, menus, marquee, onWarm } = this.props;
    const {
      isLoading, data = [], hasMore, fontSize, newsTitle,
      showFixedHeader, topics, Menus
    } = currentNews;
    const currentMainMenu = data[0] && data[0].MainMenu || {};
    const adType = getAdType(currentMainMenu, Menus);
    const mainMenuId = currentMainMenu._id;
    const totalLength = data.length;
    const triplet = {
      list: {
        instant: marquee.news,
        interest,
        lbs: LBS.newsList
      },
      mapCity: LBS.mapCity
    };

    const items = data.map((item, i) => {
      const { Author, formatStartedAt, newsBy, traceCode, type, ...news } = item;
      const itemAdType = getAdType(news.MainMenu, news.Menus);
      const contentProps = {
        ads: currentNews.ads,
        adType: itemAdType,
        changeFontSize,
        interest,
        fontSize,
        news,
        onWarm,
        topics,
        triplet
      };
      const ContentTypeObject = {
        NEWS: ContentForNews,
        PHOTO: ContentForPhoto,
        VIDEO: ContentForVideo
      };
      const Content = ContentTypeObject[type];
      return (
        <div key={news.sn}>
          <Head newsBy={newsBy} mainMenu={news.MainMenu} time={formatStartedAt} title={news.title} authorId={Author._id} imgSrc={Author.Avatar && Author.Avatar.thumbnail} />
          {<Content {...contentProps} />}
          {traceCode && <script dangerouslySetInnerHTML={{__html: traceCode}} />}
          {(totalLength - 1) !== i && <Container>
            <DFP opts={[`Nownews_${adType}_article_970x250_B_new2`, [[970, 90], [970, 250]]]} />
          </Container>}
        </div>
      );
    });

    // 如果有新聞的話做處理：取得分類、關鍵字字串
    const news = data[0];
    let childMenuId;
    let tags = [];
    let newsMainPhoto = '';
    if (news) {
      newsMainPhoto = news.MainPhoto && news.MainPhoto.url;
      news.Menus.forEach(({ ParentId, id }) => {
        if (!childMenuId && ParentId === mainMenuId) {
          childMenuId = id;
        }
      });

      if (news.Tags) {
        tags = news.Tags.map(({ name }) => {
          return name;
        });
      }
    }
    return (
      <div>
        {news && <div>
          <Helmet title='NOWnews 今日新聞' titleTemplate={news.title + '| NOWnews 今日新聞'}
            meta={[
              { name: 'description', content: news.summary },
              { name: 'keywords', content: tags.join(',') },
              { name: 'twitter:title', content: news.title },
              { name: 'twitter:image', content: newsMainPhoto },
              { name: 'twitter:description', content: news.summary },
              { name: 'twitter:card', content: newsMainPhoto },
              { name: 'contact', content: 'service@nownews.com' },
              { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
              { property: 'article:author', content: 'https://www.facebook.com/nownews' },
              { property: 'og:type', content: 'article' },
              { property: 'og:locale', content: 'zh_TW' },
              { property: 'og:title', content: news.title },
              { property: 'og:description', content: news.summary },
              { property: 'og:image', content: newsMainPhoto },
              { property: 'og:video', content: (news.type === 'VIDEO') ? news.MainVideo.url : '' },
              { property: 'og:url', content: 'http://www.nownews.com' + news.parseUrl },
              { property: 'og:rich_attachment', content: 'true' }
            ]}
            link={[
                {rel: 'canonical', href: `http://www.nownews.com${news.parseUrl}`}
            ]} />
          <MicroDataNews news={news} />
        </div>}
        {!isLoading && news && <IsAdult isAdult={news.isAdult} />}
        <Header adType={`${adType}_article`} menus={menus} marquee={marquee}
          currentChildMenu={childMenuId}
          currentMainMenu={mainMenuId} />
        {showFixedHeader && <FixedHeader menus={this.props.menus}
          currentMainMenu={mainMenuId} newsTitle={newsTitle} />}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          hasMore={hasMore}
          threshold={600}
          touchWindowTop={this.touchWindowTop}>
          <div>{items}</div>
        </InfiniteScroll>
        {isLoading && <Container><h3>新聞載入中，請稍候片刻 ...</h3></Container>}
        <Container>
          <DFP opts={[`/5799246/Nownews_${adType}_article_970x250_B_new2`, [[970, 250], [970, 90]]]} />
        </Container>
      </div>
    );
  }
}

NewsContainer.propTypes = {
  changeFontSize: PropTypes.func.isRequired,
  changeNewsTitle: PropTypes.func.isRequired,
  currentNews: PropTypes.object.isRequired,
  interest: PropTypes.array.isRequired,
  LBS: PropTypes.object,
  loadInterest: PropTypes.func.isRequired,
  loadLBSList: PropTypes.func.isRequired,
  loadMoreNews: PropTypes.func.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  onWarm: PropTypes.func.isRequired,
  showFixedHeader: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsContainer));
