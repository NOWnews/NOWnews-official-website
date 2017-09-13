import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Header } from '../../../components/Header';
import { BlockItems9, BlockTopicItems, BlockItems8, SlideRight, VideoBlock } from '../components';
import { Container, RightSide, LeftSide, Loading, Margin10 } from '../../../components/Layout';
import { Slide } from '../../../components/News';
import { AppleStyle, AndroidStyle } from '../../../components/AppBlock';
import { CrazyAd, CTHouse, DFP, GrabBag } from '../../../components/Ad';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { selectInterestPage, loadInterest } from '../../../modules/interest';
import { selectHomePage, loadHomeList, switchTripletType } from '../module';
import { MicroDataSearch } from '../../../components/JSONLD';
import StaticContainer from 'react-static-container';
import Helmet from 'react-helmet';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHomeList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  homePage: selectHomePage(state),
  interest: selectInterestPage(state),
  LBS: selectLBS(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadInterest,
  loadLBSList,
  switchTripletType
});

class HomeContainer extends PureComponent {
  constructor (props) {
    super(props);
    this.switchTripletType = this.switchTripletType.bind(this);
  }

  switchTripletType (type) {
    if (type === 'interest') {
      this.props.loadInterest();
    }

    if (type === 'lbs') {
      this.props.loadLBSList();
    }

    this.props.switchTripletType(type);
  }

  render () {
    const { marquee, interest, menus, homePage, LBS = {} } = this.props;
    const {
      ads, carousels, isLoading, specialChannels, specialTopics,
      tripletType, videos
    } = homePage;
    const seeMoreTextDefined = {
      instant: '即時',
      interest: '感興趣',
      lbs: '地區'
    };
    const titles = {
      instant: '即時新聞',
      interest: '您感興趣的新聞',
      lbs: '地區新聞'
    };
    const TripletIcons = ['instant', 'interest', 'lbs'].map((value) => {
      const imgName = (tripletType === value) ? `${value}_active` : value;

      return (
        <img key={value} onClick={() => { this.switchTripletType(value); }} title={titles[value]}
          className={css(styles.tripletBlockTopIcon)} src={`/icons/${imgName}.png`} />
      );
    });

    const tripletObject = {
      instant: marquee.news,
      interest: interest.newsList,
      lbs: LBS.newsList
    };

    return (
      <div>
        <Helmet title='NOWnews 今日新聞' titleTemplate={'NOWnews 今日新聞'}
          meta={[
            { name: 'description', content: 'NOWnews今日新聞 提供即時新聞以及豐富的政治、財經、生活、運動、娛樂、國際、社會等軟硬性新聞，屬綜合性的網路新聞網站。' },
            { name: 'keywords', content: 'NOWnews今日新聞, NOWnews, 頭條新聞 ' },
            { name: 'news_keywords', content: ' NOWnews今日新聞, NOWnews, 頭條新聞' },
            { name: 'twitter:title', content: 'NOWnews 今日新聞' },
            { name: 'twitter:image', content: 'https://www.nownews.com/logo.png' },
            { name: 'twitter:description', content: 'NOWnews今日新聞 提供即時新聞以及豐富的政治、財經、生活、運動、娛樂、國際、社會等軟硬性新聞，屬綜合性的網路新聞網站。' },
            { name: 'twitter:card', content: 'https://www.nownews.com/logo.png' },
            { name: 'contact', content: 'service@nownews.com' },
            { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
            { property: 'article:author', content: 'https://www.facebook.com/nownews' },
            { property: 'og:type', content: 'article' },
            { property: 'og:locale', content: 'zh_TW' },
            { property: 'og:title', content: 'NOWnews 今日新聞' },
            { property: 'og:description', content: 'NOWnews今日新聞 提供即時新聞以及豐富的政治、財經、生活、運動、娛樂、國際、社會等軟硬性新聞，屬綜合性的網路新聞網站' },
            { property: 'og:image', content: 'https://www.nownews.com/logo.png' },
            { property: 'og:url', content: 'https://www.nownews.com' },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
          link={[
            {rel: 'canonical', href: `https://www.nownews.com`}
          ]} />
        <Header menus={menus} marquee={marquee} />
        {isLoading && <Loading />}
        {ads.crazyAd && ads.crazyAd.type && <CrazyAd ad={ads.crazyAd} />}
        <StaticContainer>
          <MicroDataSearch />
        </StaticContainer>
        {!isLoading && carousels.length > 0 &&
          <Container>
            <div className={`clearfix ${css(styles.slideArea)}`}>
              <Slide list={carousels.slice(0, 5)} />
              <SlideRight newsList={carousels.slice(5, 10)} />
            </div>
          </Container>}
        {!isLoading && specialChannels.length > 0 &&
          <div className={css(styles.bg)}>
            <Container className='clearfix'>
              <LeftSide>
                <BlockItems8 channels={specialChannels.slice(0, 8)} />
                <div className={css(styles.seeMoreBlock)}>
                  <Link className={css(styles.seeMoreLink)} to={`channel/${specialChannels[0].sn}`}>看更多火線話題</Link>
                </div>
              </LeftSide>
              <RightSide>
                <GrabBag list={marquee.ads.grabBag} />
                <Margin10>
                  <DFP opts={['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']} />
                </Margin10>
                <Margin10>
                  <DFP opts={['/5799246/Nownews_home_300x250_M2_new2', [300, 250], 'div-gpt-ad-1496983198899-0']} />
                </Margin10>
                <CTHouse />
              </RightSide>
            </Container>
          </div>}

        {!isLoading && tripletObject.instant.length > 0 &&
          <Container>
            <div className={css(styles.tripletBlockTop)}>
              { TripletIcons }
              { tripletType === 'lbs' && <span className={css(styles.mapTitle)}>{LBS.mapCity}</span>}
            </div>
            <BlockItems9
              ads={ads.health}
              hasAd={tripletType === 'instant'}
              newsList={tripletObject[tripletType].slice(0, 9)} />
            { tripletType === 'interest' && interest.isLoading && <h3>資料載入中 ...</h3>}
            { tripletType === 'interest' && !interest.isLoading && tripletObject.interest.length === 0 && <h3>查無相關新聞 ...</h3>}
            { tripletType === 'lbs' && LBS.isLocationLoading && <h3>尚未取得您的位置資訊，正在載入中 ...</h3>}
            { tripletType === 'lbs' && LBS.isLoading && <h3>資料載入中 ...</h3>}
            { tripletType === 'lbs' && LBS.error && LBS.error.code === 1 && <h3> 您拒絕提供位置資訊給我們，因此無法載入您的區域新聞 T____T </h3>}
            { tripletType === 'lbs' && LBS.error && (LBS.error.code === 2 || LBS.error.code === 3) && <h3> 無法取得您的位置資訊 </h3>}
            { tripletType === 'lbs' && !LBS.error && !LBS.isLoading && !LBS.isLocationLoading && tripletObject.lbs.length === 0 && <h3>查無此區的相關新聞 ...</h3>}
            <div className={css(styles.seeMoreBlock)}>
              <Link className={css(styles.seeMoreLink)} to={tripletType}>
                看更多{seeMoreTextDefined[tripletType]}新聞
              </Link>
            </div>
          </Container>}
        <Container className='clearfix'>
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_1', [300, 250], 'div-gpt-ad-1498098181254-0']} />
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_2', [300, 250], 'div-gpt-ad-1498098246352-0']} />
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_3', [300, 250], 'div-gpt-ad-1498098293038-0']} />
        </Container>

        {!isLoading && videos.length > 0 &&
          <div id='home-video-block' className={css(styles.videoBlock)}>
            <Container className={css(styles.videoContaienr)}>
              <VideoBlock list={videos} />
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink, styles.white)} to={'/video/instant'}>
                  看更多影音
                </Link>
              </div>
            </Container>
          </div>}

        {!isLoading && specialTopics.length > 0 &&
          <Container className='clearfix'>
            <LeftSide>
              <div className={css(styles.specialChannelsTitle)}>
                <h2 className={css(styles.specialChannelsTitleText)}>熱門專題</h2>
                <hr className={css(styles.specialChannelsTitleLine)} />
              </div>
              <BlockTopicItems newsList={specialTopics.slice(0, 8)} />
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink)} to='topic'>看更多熱門專題</Link>
              </div>
            </LeftSide>
            <RightSide>
              <Margin10>
                <DFP opts={['/5799246/Nownews_home_300x600_RB_new2', [300, 600], 'div-gpt-ad-1496983253991-0']} />
              </Margin10>
              <Margin10>
                <DFP opts={['/5799246/Nownews_home_300x250_RB_new2', [300, 250], 'div-gpt-ad-1496983283211-0']} />
              </Margin10>
              <Margin10>
                <AppleStyle />
              </Margin10>
              <Margin10>
                <AndroidStyle />
              </Margin10>
            </RightSide>
          </Container>}
        <Container>
          <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
        </Container>
      </div>
    );
  };
};

const styles = StyleSheet.create({
  body: {
    height: 300
  },
  bg: {
    background: '#F3F4F5',
    backgroundSize: 5,
    padding: '35px 0 30px',
    marginBottom: 30
  },
  white: {
    borderColor: '#ffffff',
    color: '#ffffff'
  },
  seeMoreBlock: {
    textAlign: 'center',
    padding: '25px 0 30px'
  },
  seeMoreLink: {
    color: '#222',
    border: '1px solid #222',
    padding: '12px 55px',
    borderRadius: 30,
    fontSize: 26,
    textDecoration: 'none'
  },
  slideArea: {
    marginTop: 10
  },
  specialChannelsTitle: {
    position: 'relative'
  },
  specialChannelsTitleText: {
    fontSize: '40px',
    fontWeight: 'inherit'
  },
  specialChannelsTitleLine: {
    position: 'absolute',
    top: '32px',
    width: '480px',
    right: '15px'
  },
  tripletBlockTop: {
    position: 'relative',
    textAlign: 'center',
    paddingBottom: '10px'
  },
  tripletBlockTopIcon: {
    cursor: 'pointer',
    width: '90px',
    margin: '0 10px',
    ':hover': {
      opacity: 0.9
    }
  },
  videoBlock: {
    background: '#323334',
    height: 770,
    marginBottom: 30,
    marginTop: 70
  },
  videoContaienr: {
    position: 'relative',
    top: -40
  },
  mapTitle: {
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '90px',
    color: '#0080ff'
  },
  niceGame: {
    float: 'left',
    margin: '0 11.5px'
  }
});

HomeContainer.propTypes = {
  homePage: PropTypes.object.isRequired,
  interest: PropTypes.object.isRequired,
  LBS: PropTypes.object,
  loadInterest: PropTypes.func.isRequired,
  loadLBSList: PropTypes.func.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  switchTripletType: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
