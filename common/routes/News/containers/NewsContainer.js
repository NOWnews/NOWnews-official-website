import { provideHooks } from 'redial';
import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FixedHeader, Header } from '../../../components/Header';
import { DFP, OneAdICIP, getAdType } from '../../../components/Ad';
import { Container, NotFound } from '../../../components/Layout';
import { Head, ContentForNews, ContentForPhoto, ContentForVideo, ContentForCustomColumn } from '../../../components/News';
import {
  changeFontSize, loadNews, onWarm,
  selectCurrentNews, showFixedHeader
} from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { selectInterest, loadInterest } from '../../../modules/interest';
import { IsAdult } from '../../../components/Alert';
import { MicroDataNews } from '../../../components/JSONLD';

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
  loadInterest,
  loadLBSList,
  onWarm,
  showFixedHeader
});

class NewsContainer extends PureComponent {
  constructor (props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
  }
  componentDidMount () {
    // reload twitter iframe
    if (this.props.currentNews.isSSRAndInit) {
      setTimeout(function () {
        if (window.twttr) {
          window.twttr.widgets.load();
        }
      }, 100);
    }
    this.props.loadInterest();
    window.addEventListener('scroll', this.scrollListener);
  }

  scrollListener () {
    if (this.props.currentNews.showFixedHeader && window.scrollY < 200) {
      this.props.showFixedHeader(false);
    } else if (!this.props.currentNews.showFixedHeader && window.scrollY > 200) {
      this.props.showFixedHeader(true);
    }
  }

  render () {
    const { currentNews, changeFontSize, interest, LBS, menus, marquee, onWarm } = this.props;
    const {
      isLoading, data, fontSize, showFixedHeader, topics
    } = currentNews;
    const currentMainMenu = data && data.MainMenu || {};
    const mainMenuId = currentMainMenu._id;
    const triplet = {
      list: {
        instant: marquee.news,
        interest,
        lbs: LBS.newsList
      },
      mapCity: LBS.mapCity,
      loadLBSList: this.props.loadLBSList
    };

    const ContentTypeObject = {
      NEWS: ContentForNews,
      PHOTO: ContentForPhoto,
      VIDEO: ContentForVideo,
      COLUMN: ContentForCustomColumn
    };

    // 如果有新聞的話做處理：取得分類、關鍵字字串
    let adType;
    let childMenuId;
    let footerAd = '';
    let isDefaultTemplate = null;
    let tags = [];
    let topAd = '';
    let metaOpts = [];
    let news = null;
    let newsDom = null;
    let newsTitle = null;
    if (data) {
      const { Author, formatStartedAt, newsBy, type, traceCode, ...newsData } = data;
      news = newsData;
      const MainPhoto = news.MainPhoto;

      let Content = null;
      newsTitle = news.title;
      metaOpts.push({ name: 'twitter:image', content: MainPhoto.medium });
      metaOpts.push({ name: 'twitter:card', content: MainPhoto.medium });
      metaOpts.push({ property: 'og:image', content: MainPhoto.originSource });
      metaOpts.push({ name: 'popin:image', content: MainPhoto.url });

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
        Content = ContentTypeObject[type];
        topAd = `/5799246/Nownews_${adType}_article_970x250_T_new2`;
        footerAd = `/5799246/Nownews_${adType}_article_970x250_B_new2`;
      } else {
        Content = ContentTypeObject[news.template];
        topAd = `/5799246/column_970x90_au_${news.templateAD}`;
        footerAd = `/5799246/column_970x90_ad_${news.templateAD}`;
      }

      const contentProps = {
        ads: { ...currentNews.ads, ...marquee.ads },
        adType,
        changeFontSize,
        interest,
        fontSize,
        news,
        onWarm,
        topics,
        triplet
      };

      newsDom = (
        <div key={news.sn}>
          <Head newsBy={newsBy} mainMenu={news.MainMenu} time={formatStartedAt} title={news.title} authorId={Author._id} imgSrc={Author.Avatar && Author.Avatar.thumbnail} />
          {<Content {...contentProps} />}
          {traceCode && <div dangerouslySetInnerHTML={{__html: traceCode}} />}
        </div>
      );
    }

    return (
      <div>
        {news && <div>
          <Helmet title='NOWnews 今日新聞' titleTemplate={`${news.title} | ${currentMainMenu.name} | NOWnews今日新聞`}
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
          <IsAdult isAdult={news.isAdult} />
        </div>}
        <Header ad={topAd} menus={menus} marquee={marquee}
          currentChildMenu={childMenuId}
          currentMainMenu={mainMenuId} />
        {showFixedHeader && <FixedHeader menus={this.props.menus}
          currentMainMenu={mainMenuId} newsTitle={newsTitle} />}
        {isDefaultTemplate && <OneAdICIP />}
        {newsDom}
        {!isLoading && !newsDom && <Container><NotFound /></Container>}
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
  currentNews: PropTypes.object.isRequired,
  interest: PropTypes.array.isRequired,
  LBS: PropTypes.object,
  loadInterest: PropTypes.func.isRequired,
  loadLBSList: PropTypes.func.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  onWarm: PropTypes.func.isRequired,
  showFixedHeader: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsContainer));
