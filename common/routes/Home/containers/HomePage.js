import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from '../../../components/Header';
import { BlockItems, SlideRight } from '../components';
import { Container, RightSide, LeftSide, ClearFix } from '../../../components/Layout';
import { Ad300x250, Ad300x600 } from '../../../components/Ad';
import { Slide } from '../../../components/News';

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
  <Container>
    <Header menus={menus} />
    <div className={css(styles.slideArea)}>
      <Slide newsList={homePage.data.slice(0, 5)} />
      <SlideRight newsList={homePage.data.slice(0, 5)} />
      <ClearFix />
    </div>
    <LeftSide>
      {homePage.isLoading &&
        <div>
          <h2>Loading ...</h2>
        </div>}
      {!homePage.isLoading && homePage.data.length === 0 &&
        <div>查無相關新聞 ... </div>}
      {!homePage.isLoading && homePage.data.length > 0 &&
        <div className={css(styles.blockItem)}>
          <BlockItems newsList={homePage.data.slice(0, 4)} />
        </div>
      }
      <div className={css(styles.seeMoreBlock)}>
        <span className={css(styles.seeMoreText)}>看更多專題</span>
      </div>
    </LeftSide>
    <RightSide>
      <Ad300x250 />
      <Ad300x250 />
    </RightSide>
    <ClearFix />
    <hr />
    {homePage.isLoading &&
      <div>
        <h2>Loading ...</h2>
      </div>}
    {!homePage.isLoading && homePage.data.length === 0 &&
      <div>查無相關新聞 ... </div>}
    {!homePage.isLoading && homePage.data.length > 0 &&
      <div className={css(styles.blockItem)}>
        <BlockItems newsList={homePage.data.slice(0, 3)} />
        <BlockItems newsList={homePage.data.slice(0, 3)} />
        <BlockItems newsList={homePage.data.slice(0, 3)} />
      </div>
    }
    <ClearFix />
    <div className={css(styles.seeMoreBlock)}>
      <span className={css(styles.seeMoreText)}>看更多地區新聞</span>
    </div>
    <div>影音區塊</div>
    <LeftSide>
      <hr />
      <BlockItems newsList={homePage.data.slice(0, 4)} />
      <BlockItems newsList={homePage.data.slice(0, 4)} />
      <div className={css(styles.seeMoreBlock)}>
        <span className={css(styles.seeMoreText)}>看更多專題</span>
      </div>
    </LeftSide>
    <RightSide>
      <Ad300x600 />
      <Ad300x250 />
    </RightSide>
    <ClearFix />
  </Container>
);

const styles = StyleSheet.create({
  body: {
    height: 300
  },
  blockItem: {

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
    fontSize: 22
  },
  slideArea: {
    marginTop: 10
  }
});

HomePage.propTypes = {
  homePage: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(HomePage));
