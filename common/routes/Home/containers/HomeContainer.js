import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Header } from '../../../components/Header';
import { BlockItems9, BlockItems6, BlockItems8, SlideRight, VideoBlock } from '../components';
import { Container, RightSide, LeftSide, Loading, Margin10 } from '../../../components/Layout';
import { Slide } from '../../../components/News';
import { AppleStyle, AndroidStyle } from '../../../components/AppBlock';
import { CrazyAd, DFP, GrabBag } from '../../../components/Ad';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { selectInterest, loadInterest } from '../../../modules/interest';
import { selectHomePage, loadHomeList, switchTripletType } from '../module';
import { MicroDataSearch } from '../../../components/JSONLD';
import StaticContainer from 'react-static-container';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHomeList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  homePage: selectHomePage(state),
  interest: selectInterest(state),
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
    this.props.switchTripletType(type);
  }

  componentDidMount () {
    this.props.loadLBSList();
    this.props.loadInterest();
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
      interest: interest,
      lbs: LBS.newsList
    };

    return (
      <div>
        <Header adType='home' menus={menus} marquee={marquee} />
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
        {!isLoading && specialTopics.length > 0 &&
          <div className={css(styles.bg)}>
            <Container className='clearfix'>
              <LeftSide>
                <BlockItems6 newsList={specialTopics.slice(0, 6)} />
                <div className={css(styles.seeMoreBlock)}>
                  <Link className={css(styles.seeMoreLink)} to='topic'>看更多專題</Link>
                </div>
              </LeftSide>
              <RightSide>
                <GrabBag />
                <Margin10>
                  <DFP opts={['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']} />
                </Margin10>
                <Margin10>
                  <DFP opts={['/5799246/Nownews_home_300x250_M2_new2', [300, 250], 'div-gpt-ad-1496983198899-0']} />
                </Margin10>
                {ads.cthouse && ads.cthouse.img !== '' && <Margin10>
                  <a href={ads.cthouse.url}>
                    <img alt={ads.cthouse.title} src={ads.cthouse.img} width='300' height='250' />
                  </a>
                </Margin10>}
              </RightSide>
            </Container>
          </div>}

        {!isLoading && carousels.length > 0 &&
          <div className={css(styles.tripletBlock)}>
            <Container>
              <div className={css(styles.tripletBlockTop)}>
                { TripletIcons }
                { tripletType === 'lbs' && <span className={css(styles.mapTitle)}>{LBS.mapCity}</span>}
              </div>
              <BlockItems9
                ads={ads.health}
                hasAd={tripletType === 'instant'}
                newsList={tripletObject[tripletType].slice(0, 9)} />
              { tripletType === 'lbs' && !isLoading && LBS.location.length === 0 && <h3>尚未取得您的位置資訊</h3>}
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink)} to={tripletType}>
                  看更多{seeMoreTextDefined[tripletType]}新聞
                </Link>
              </div>
            </Container>
          </div>}
        <Container className='clearfix'>
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_1', [300, 250], 'div-gpt-ad-1498098181254-0']} />
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_2', [300, 250], 'div-gpt-ad-1498098246352-0']} />
          <DFP className={css(styles.niceGame)} opts={['/5799246/nicegame_300x250_3', [300, 250], 'div-gpt-ad-1498098293038-0']} />
        </Container>

        {!isLoading && videos.length > 0 &&
          <div className={css(styles.videoBlock)}>
            <Container className={css(styles.videoContaienr)}>
              <VideoBlock list={videos} />
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink, styles.white)} to={'/video/instant'}>
                  看更多影音
                </Link>
              </div>
            </Container>
          </div>}

        {!isLoading && specialChannels.length > 0 &&
          <div className={css(styles.specialChannelsBox)}>
            <Container className='clearfix'>
              <LeftSide>
                <div>
                  <div className={css(styles.specialChannelsTitle)}>
                    <h1 className={css(styles.specialChannelsTitleText)}>精選特輯</h1>
                    <hr className={css(styles.specialChannelsTitleLine)} />
                  </div>
                  <BlockItems8 channels={specialChannels.slice(0, 8)} />
                  <div className={css(styles.seeMoreBlock)}>
                    <Link className={css(styles.seeMoreLink)} to={`channel/${specialChannels[0].sn}`}>看更多特輯</Link>
                  </div>
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
            </Container>
          </div>}
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
    background: 'url(/bg/bg-home-dot.png)',
    backgroundSize: 5,
    marginTop: '-41px',
    paddingBottom: '100px'
  },
  white: {
    borderColor: '#ffffff',
    color: '#ffffff'
  },
  seeMoreBlock: {
    textAlign: 'center',
    padding: '25px 0'
  },
  seeMoreLink: {
    color: '#222',
    border: '1px solid #222',
    padding: '6px 17px',
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
  specialChannelsBox: {
    background: 'url(/bg/bg-home2.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'calc(((100% - 970px)/2) + 648px) 98%'
  },
  tripletBlock: {
    background: 'url(/bg/bg-home1.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 95%',
    backgroundPositionY: '45px',
    marginBottom: 60,
    marginTop: '-80px'
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
  interest: PropTypes.array.isRequired,
  LBS: PropTypes.object,
  loadInterest: PropTypes.func.isRequired,
  loadLBSList: PropTypes.func.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  switchTripletType: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
