import { provideHooks } from 'redial';
import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { FixedHeader, Header } from '../../../components/Header';
import { DFP, getAdType, OneAdICIP } from '../../../components/Ad';
import { Container, NotFound } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo, ContentForCustomColumn } from '../../../components/News';
import {
  changeFontSize, changeNewsTitle, loadNews, loadMoreNews, onWarm,
  selectCurrentNews, showFixedHeader
} from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { selectInterest, loadInterest } from '../../../modules/interest';
import { selectSourceRequest } from '../../../modules/sourceRequest';
import { IsAdult } from '../../../components/Alert';
import { MicroDataNews } from '../../../components/JSONLD';
import { trackInfiniteScrollNews } from '../../../../lib/track/pageview';

const redial = {
  fetch: ({ dispatch, params: { sn }, fontSize }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadNews(sn, fontSize))
  ])
};

const mapStateToProps = state => ({
  sourceRequest: selectSourceRequest(state),
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
        if (window.twttr) {
          window.twttr.widgets.load();
        }
      }, 100);
    }
    this.props.loadInterest();
    window.addEventListener('scroll', this.scrollListener);
  }

  loadItems () {
    const newsData = this.props.currentNews.data;
    if (!this.props.currentNews.isLoading && this.props.currentNews.hasMore) {
      const sn = newsData[newsData.length - 1].next.sn;
      if (!sn) {
        return;
      }
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
    // change url, title & track pageview for pv, ga, fb .. etc.
    const { apiServ, headers } = this.props.sourceRequest;
    const news = this.props.currentNews.data[index];
    const { sn, title, parseUrl } = news;
    const { pathname, search } = window.location;
    const originalSn = pathname.split('/')[3];
    if (parseInt(originalSn, 10) !== sn) {
      window.history.pushState(null, null, `${parseUrl}${search}`);
      window.document.getElementsByTagName('title')[0].innerHTML = `${title}| NOWnews 今日新聞`;
      this.props.changeNewsTitle(title);
      trackInfiniteScrollNews(apiServ, news, pathname, search, headers);
    }
  }

  render () {
    const { currentNews, changeFontSize, interest, LBS, menus, marquee, onWarm } = this.props;
    const {
      isLoading, data = [], hasMore, fontSize, newsTitle,
      showFixedHeader, topics
    } = currentNews;
    const currentMainMenu = data[0] && data[0].MainMenu || {};
    const mainMenuId = currentMainMenu._id;
    const totalLength = data.length;
    const triplet = {
      list: {
        instant: marquee.news,
        interest,
        lbs: LBS.newsList
      },
      mapCity: LBS.mapCity,
      loadLBSList: this.props.loadLBSList
    };

    const items = data.map((item, i) => {
      const { Author, formatStartedAt, newsBy, traceCode, type, ...news } = item;
      const itemAdType = getAdType.fromMenus(news.MainMenu, news.Menus);
      const isDefaultTemplateForItem = (news.template === 'DEFAULT');
      const itemFooterAd = isDefaultTemplateForItem ? `/5799246/Nownews_${itemAdType}_article_970x250_B_new2` : `/5799246/column_970x90_ad_${news.templateAD}`;

      const contentProps = {
        ads: currentNews.ads,
        adType: itemAdType,
        changeFontSize,
        interest,
        fontSize,
        isFirstNews: (i === 0),
        news,
        onWarm,
        topics,
        triplet
      };
      const ContentTypeObject = {
        NEWS: ContentForNews,
        PHOTO: ContentForPhoto,
        VIDEO: ContentForVideo,
        COLUMN: ContentForCustomColumn
      };
      const Content = isDefaultTemplateForItem ? ContentTypeObject[type] : ContentTypeObject[news.template];
      return (
        <div key={news.sn}>
          <Head newsBy={newsBy} mainMenu={news.MainMenu} time={formatStartedAt} title={news.title} authorId={Author._id} imgSrc={Author.Avatar && Author.Avatar.thumbnail} />
          {<Content {...contentProps} />}
          {traceCode && <div dangerouslySetInnerHTML={{__html: traceCode}} />}
          {(totalLength - 1) !== i && <Container>
            <DFP opts={[itemFooterAd, [[970, 90], [970, 250]]]} />
          </Container>}
        </div>
      );
    });

    // 如果有新聞的話做處理：取得分類、關鍵字字串
    const news = data[0];
    const imgApi = `https://imgapiv2.nownews.com/?w=640&q=70&src=`;
    let adType;
    let childMenuId;
    let footerAd = '';
    let isDefaultTemplate = null;
    let tags = [];
    let topAd = '';
    let metaOpts = [];

    if (news) {
      if (news.MainPhoto && news.MainPhoto.url) {
        let newsMainPhoto = `${imgApi}${news.MainPhoto.url}`;
        metaOpts.push({ name: 'twitter:image', content: newsMainPhoto });
        metaOpts.push({ name: 'twitter:card', content: newsMainPhoto });
        metaOpts.push({ property: 'og:image', content: news.MainPhoto.url });
        metaOpts.push({ property: 'popin:image', content: newsMainPhoto });
      }

      if (news.type === 'VIDEO') {
        metaOpts.push({ property: 'og:video', content: news.MainVideo.url });
      }

      news.Menus.forEach(({ ParentId, categoryName, id }) => {
        if (!childMenuId && ParentId === mainMenuId && categoryName !== 'nationalindex') {
          childMenuId = id;
        }
      });

      if (news.Tags) {
        tags = news.Tags.map(({ name }) => {
          return name;
        });
      }

      isDefaultTemplate = news.template === 'DEFAULT';

      // 處理不同版型的廣告
      if (isDefaultTemplate) {
        adType = getAdType.fromMenus(currentMainMenu, news.Menus);
        topAd = `/5799246/Nownews_${adType}_article_970x250_T_new2`;
        footerAd = `/5799246/Nownews_${adType}_article_970x250_B_new2`;
      } else {
        topAd = `/5799246/column_970x90_au_${news.templateAD}`;
        footerAd = `/5799246/column_970x90_ad_${news.templateAD}`;
      }
    }

    return (
      <div>
        {news && <div>
          <Helmet title='NOWnews 今日新聞' titleTemplate={news.title + '| NOWnews 今日新聞'}
            meta={[
              { name: 'description', content: news.summary },
              { name: 'keywords', content: tags.join(',') },
              { name: 'news_keywords', content: tags.join(',') },
              { name: 'twitter:title', content: news.title },
              { name: 'twitter:description', content: news.summary },
              { name: 'contact', content: 'service@nownews.com' },
              { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
              { property: 'article:author', content: 'https://www.facebook.com/nownews' },
              { property: 'og:type', content: 'article' },
              { property: 'og:locale', content: 'zh_TW' },
              { property: 'og:title', content: news.title },
              { property: 'og:description', content: news.summary },
              { property: 'og:url', content: news.completeUrl },
              { property: 'og:rich_attachment', content: 'true' },
              ...metaOpts
            ]}
            link={[
                {rel: 'canonical', href: news.completeUrl}
            ]} />
          <MicroDataNews news={news} />
          {data.length === 1 && <IsAdult isAdult={news.isAdult} />}
        </div>}
        <Header ad={topAd} menus={menus} marquee={marquee}
          currentChildMenu={childMenuId}
          currentMainMenu={mainMenuId} />
        {isDefaultTemplate && <OneAdICIP />}
        {showFixedHeader && <FixedHeader menus={this.props.menus}
          currentMainMenu={mainMenuId} newsTitle={newsTitle} />}
        {!isLoading && !news && <Container><NotFound /></Container>}
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
          <DFP opts={[footerAd, [[970, 250], [970, 90]]]} />
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
  showFixedHeader: PropTypes.func.isRequired,
  sourceRequest: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsContainer));
