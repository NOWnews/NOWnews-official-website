import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { bindActionCreators } from 'redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Header } from '../../../components/Header';
import { BlockItems, BlockItems4, BlockItems8, SlideRight, VideoBlock } from '../components';
import { Container, RightSide, LeftSide, Loading, Margin10 } from '../../../components/Layout';
import { Slide } from '../../../components/News';
import { AppleStyle, AndroidStyle } from '../../../components/AppBlock';
import { Ad300x250, Ad300x600 } from '../../../components/Ad';

import { loadHeader, selectMenus } from '../../../modules/header';
import { selectHomePage, loadHomeList, switchTripletType } from '../module';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHomeList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  homePage: selectHomePage(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  switchTripletType
});

class HomeContainer extends Component {
  constructor (props) {
    super(props);
    this.switchTripletType = this.switchTripletType.bind(this);
  }

  switchTripletType (type) {
    this.props.switchTripletType(type);
  }

  render () {
    const { menus, homePage } = this.props;
    const {
      carousels, isLoading, specialChannels, specialTopics, tripletType,
      videos
    } = homePage;
    const seeMoreTextDefined = {
      instant: '即時',
      favorite: '個人',
      lbs: '地區'
    };
    const TripletIcons = ['instant', 'favorite', 'lbs'].map((value) => {
      let imgName = (tripletType === value) ? `${value}_active` : value;
      return (
        <img key={value} onClick={() => { this.switchTripletType(value); }}
          className={css(styles.tripletBlockTopIcon)} src={`/icons/${imgName}.png`} />
      );
    });

    return (
      <div>
        <Header menus={menus} />
        {isLoading && <Loading />}

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
                <BlockItems4 newsList={specialTopics.slice(0, 4)} />
                <div className={css(styles.seeMoreBlock)}>
                  <Link className={css(styles.seeMoreLink)} to='topic'>看更多專題</Link>
                </div>
              </LeftSide>
              <RightSide>
                <Margin10>
                  <Ad300x250 />
                </Margin10>
                <Margin10>
                  <Ad300x250 />
                </Margin10>
              </RightSide>
            </Container>
          </div>}

        {!isLoading && carousels.length > 0 &&
          <div className={css(styles.tripletBlock)}>
            <Container>
              <div className={css(styles.tripletBlockTop)}>
                { TripletIcons }
                { tripletType === 'lbs' && <span className={css(styles.mapTitle)}>台北市</span>}
              </div>
              <BlockItems newsList={carousels.slice(0, 9)} />
              <div className='clearfix' />
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink)} to={tripletType}>
                  看更多{seeMoreTextDefined[tripletType]}新聞
                </Link>
              </div>
            </Container>
          </div>}

        {!isLoading && videos.length > 0 &&
          <div className={css(styles.videoBlock)}>
            <Container className={css(styles.videoContaienr)}>
              <VideoBlock list={videos} />
              <div className={css(styles.seeMoreBlock)}>
                <Link className={css(styles.seeMoreLink, styles.white)} to={'/'}>
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
                  <Ad300x600 />
                </Margin10>
                <Margin10>
                  <Ad300x250 />
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
    marginBottom: 10,
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
  }
});

HomeContainer.propTypes = {
  homePage: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  switchTripletType: PropTypes.func.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
