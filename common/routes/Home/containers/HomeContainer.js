import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from '../../../components/Header';
import { BlockItems, BlockItems4, BlockItems8, SlideRight } from '../components';
import { Container, RightSide, LeftSide, Margin10 } from '../../../components/Layout';
import { Slide } from '../../../components/News';
import { AppleStyle, AndroidStyle } from '../../../components/AppBlock';
import { Ad300x250, Ad300x600 } from '../../../components/Ad';

import { loadMenus, selectMenus } from '../../../modules/menus';
import { selectHomePage, loadHomeList } from '../module';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHomeList()),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  homePage: selectHomePage(state),
  menus: selectMenus(state)
});

const HomePage = ({ menus, homePage }) => (
  <div>
    {homePage.isLoading &&
      <div>
        <h2>Loading ...</h2>
      </div>}
    {!homePage.isLoading && homePage.carousels.length === 0 &&
      <div>查無相關新聞 ... </div>}
    {!homePage.isLoading && homePage.carousels.length > 0 &&
      <div>
        <Container>
          <Header menus={menus} />
          <div className={`clearfix ${css(styles.slideArea)}`}>
            <Slide newsList={homePage.carousels.slice(0, 5)} />
            <SlideRight newsList={homePage.carousels.slice(0, 5)} />
          </div>
        </Container>
        <div className={css(styles.bg)}>
          <Container className='clearfix'>
            <LeftSide>
              <div className={css(styles.blockItem)}>
                <BlockItems4 newsList={homePage.specialTopics.slice(0, 4)} />
              </div>
              <div className={css(styles.seeMoreBlock)}>
                <span className={css(styles.seeMoreText)}>看更多專題</span>
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
        </div>
        <Container>
          <div className={css(styles.mainBlock)}>
            <div className={css(styles.mainBlockTop)}>
              <img className={css(styles.mainBlockTopIcon)} src='/icons/instant.png' />
              <img className={css(styles.mainBlockTopIcon)} src='/icons/favorite.png' />
              <img className={css(styles.mainBlockTopIcon)} src='/icons/lbs_active.png' />
              <span className={css(styles.mapTitle)}>台北市</span>
            </div>
            <div className={css(styles.blockItem)}>
              <BlockItems newsList={homePage.carousels.slice(0, 9)} />
            </div>
            <div className='clearfix' />
            <div className={css(styles.seeMoreBlock)}>
              <span className={css(styles.seeMoreText)}>看更多地區新聞</span>
            </div>
          </div>
        </Container>
        <Container className='clearfix'>
          <LeftSide>
            <div className={css(styles.specialChannelsBox)}>
              <div className={css(styles.specialChannelsTitle)}>
                <h1 className={css(styles.specialChannelsTitleText)}>精選特輯</h1>
                <hr className={css(styles.specialChannelsTitleLine)} />
              </div>
              <BlockItems8 newsList={homePage.specialChannels.slice(0, 8)} />
              <div className={css(styles.seeMoreBlock)}>
                <span className={css(styles.seeMoreText)}>看更多特輯</span>
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

const styles = StyleSheet.create({
  body: {
    height: 300
  },
  blockItem: {

  },
  bg: {
    background: 'url(/bg/bg-home.png)',
    backgroundSize: 7,
    marginTop: '-25px',
    paddingBottom: '100px'
  },
  seeMoreBlock: {
    textAlign: 'center',
    padding: '25px 0'
  },
  seeMoreText: {
    color: '#222',
    border: '1px solid #222',
    padding: '6px 17px',
    borderRadius: 30,
    fontSize: 26
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
    backgroundSize: '97% 98%'
  },
  mainBlock: {
    background: 'url(/bg/bg-home1.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 96%',
    backgroundPositionY: '35px',
    marginTop: '-60px'
  },
  mainBlockTop: {
    position: 'relative',
    textAlign: 'center',
    paddingBottom: '10px'
  },
  mainBlockTopIcon: {
    width: '90px',
    margin: '0 10px'
  },
  mapTitle: {
    position: 'absolute',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '90px',
    color: '#0080ff'
  }
});

HomePage.propTypes = {
  homePage: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(HomePage));
